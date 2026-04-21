import type { AIAdapter } from './aiAdapter'
import { GeminiAdapter } from './geminiAdapter'
import { GroqAdapter } from './groqAdapter'
import { MockEngine } from './mockEngine'

export type AdapterMode = 'live' | 'demo'

let _adapter: AIAdapter | null = null
let _mode: AdapterMode = 'demo'

export function getAdapter(): AIAdapter {
  if (_adapter) return _adapter

  const groqKey = import.meta.env.VITE_GROQ_API_KEY
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (groqKey) {
    _mode = 'live'
    _adapter = new GroqAdapter(groqKey)
  } else if (geminiKey) {
    _mode = 'live'
    _adapter = new GeminiAdapter(geminiKey)
  } else {
    _mode = 'demo'
    _adapter = new MockEngine()
  }

  return _adapter
}

export function getAdapterMode(): AdapterMode {
  getAdapter()
  return _mode
}
