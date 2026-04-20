import { HfInference } from '@huggingface/inference'

export interface EmbeddingResult {
  embedding: number[]
  cosineSimilarity: (other: number[]) => number
}

export interface CrossEncoderResult {
  score: number
  label: string
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dot / (magA * magB)
}

export class HFAdapter {
  private hf: HfInference

  constructor(token: string) {
    this.hf = new HfInference(token)
  }

  async embedText(text: string): Promise<number[]> {
    const result = await this.hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    })
    return result as number[]
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    const result = await this.hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: texts,
    })
    return result as number[][]
  }

  async scoreAnswerRelevance(question: string, answer: string): Promise<number> {
    try {
      const result = await this.hf.textClassification({
        model: 'cross-encoder/ms-marco-MiniLM-L-6-v2',
        inputs: `${question} [SEP] ${answer}`,
      })
      const topResult = result[0]
      // Normalize score to 0–10 range
      const rawScore = topResult?.score ?? 0.5
      return Math.round(rawScore * 10 * 10) / 10
    } catch {
      // Fallback: use embedding similarity
      const [qEmb, aEmb] = await this.embedBatch([question, answer])
      const sim = cosineSimilarity(qEmb, aEmb)
      return Math.round((sim + 1) / 2 * 10 * 10) / 10
    }
  }

  async findMostRelevantSkills(resumeText: string, requiredSkills: string[]): Promise<Array<{skill: string; similarity: number}>> {
    const resumeEmb = await this.embedText(resumeText)
    const skillEmbs = await this.embedBatch(requiredSkills)

    return requiredSkills
      .map((skill, i) => ({
        skill,
        similarity: cosineSimilarity(resumeEmb, skillEmbs[i]),
      }))
      .sort((a, b) => b.similarity - a.similarity)
  }
}

let _hfAdapter: HFAdapter | null = null

export function getHFAdapter(): HFAdapter | null {
  const token = import.meta.env.VITE_HF_TOKEN
  if (!token) return null
  if (!_hfAdapter) _hfAdapter = new HFAdapter(token)
  return _hfAdapter
}
