import { useVoiceInterview } from '@/hooks/useVoiceInterview'
import { Button } from '@/components/ui/Button'
import { Play, Square, Mic, MicOff, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

interface VoiceControlsProps {
  questionText: string
  onTranscriptChange: (text: string) => void
}

export function VoiceControls({ questionText, onTranscriptChange }: VoiceControlsProps) {
  const {
    ttsSupported, sttSupported,
    isSpeaking, isRecording,
    transcript, error,
    speakQuestion, stopSpeaking,
    startRecording, stopRecording,
    setTranscript,
  } = useVoiceInterview()

  function handleTranscriptEdit(text: string) {
    setTranscript(text)
    onTranscriptChange(text)
  }

  if (!ttsSupported && !sttSupported) {
    return (
      <div className="flex items-center gap-2 p-3 bg-brand-amber/10 border border-brand-amber/20 rounded-lg text-xs text-brand-amber">
        <AlertCircle size={14} />
        Voice features not supported in this browser. Please use Chrome or Edge, or type your answer below.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Controls row */}
      <div className="flex items-center gap-2 flex-wrap">
        {ttsSupported && (
          isSpeaking ? (
            <Button variant="secondary" size="sm" onClick={stopSpeaking}>
              <Square size={14} />
              Stop
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => speakQuestion(questionText)}>
              <Play size={14} />
              Play Question
            </Button>
          )
        )}

        {sttSupported && (
          isRecording ? (
            <Button
              variant="danger"
              size="sm"
              onClick={stopRecording}
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-rose rounded-full animate-pulse-dot" />
              <MicOff size={14} />
              Stop Recording
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={startRecording}>
              <Mic size={14} />
              Record Answer
            </Button>
          )
        )}

        {isRecording && (
          <div className="flex items-center gap-1.5 text-xs text-brand-rose">
            <div className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
            Recording…
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-2 bg-brand-rose/10 border border-brand-rose/20 rounded-lg text-xs text-brand-rose">
          <AlertCircle size={12} />
          {error.message}
        </div>
      )}

      {/* Transcript */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-slate-400">
            {sttSupported ? 'Transcript (auto-filled from voice, editable)' : 'Your Answer'}
          </label>
          {transcript && (
            <button
              onClick={() => handleTranscriptEdit('')}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>
        <textarea
          value={transcript}
          onChange={(e) => handleTranscriptEdit(e.target.value)}
          rows={5}
          placeholder={
            sttSupported
              ? 'Click "Record Answer" to speak, or type your answer here…'
              : 'Type your answer here…'
          }
          className={clsx(
            'w-full bg-surface-elevated border rounded-lg px-3 py-2 text-sm text-white',
            'focus:outline-none focus:border-accent placeholder:text-slate-600 resize-none',
            isRecording ? 'border-brand-rose/50' : 'border-surface-border'
          )}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-600">
            {transcript.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
      </div>
    </div>
  )
}
