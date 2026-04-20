/// <reference lib="dom" />
import { useState, useEffect, useRef, useCallback } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySpeechRecognition = any

export type VoiceError =
  | { code: 'NOT_SUPPORTED'; message: string }
  | { code: 'PERMISSION_DENIED'; message: string }
  | { code: 'RECOGNITION_ERROR'; message: string }

export interface UseVoiceInterviewReturn {
  isSupported: boolean
  ttsSupported: boolean
  sttSupported: boolean
  isSpeaking: boolean
  isRecording: boolean
  transcript: string
  error: VoiceError | null
  speakQuestion: (text: string) => void
  stopSpeaking: () => void
  startRecording: () => void
  stopRecording: () => void
  clearTranscript: () => void
  setTranscript: (t: string) => void
}

declare global {
  interface Window {
    SpeechRecognition: new () => AnySpeechRecognition
    webkitSpeechRecognition: new () => AnySpeechRecognition
  }
}

export function useVoiceInterview(): UseVoiceInterviewReturn {
  const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const sttSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  const isSupported = ttsSupported || sttSupported

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscriptState] = useState('')
  const [error, setError] = useState<VoiceError | null>(null)

  const recognitionRef = useRef<AnySpeechRecognition | null>(null)
  const transcriptRef = useRef('')

  useEffect(() => {
    return () => {
      if (ttsSupported) window.speechSynthesis.cancel()
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch { /* ignore */ }
      }
    }
  }, [])

  const speakQuestion = useCallback((text: string) => {
    if (!ttsSupported) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.lang = 'en-US'

    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const preferred = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
        ?? voices.find(v => v.lang === 'en-US')
        ?? voices[0]
      if (preferred) utterance.voice = preferred
    }

    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice()
    } else {
      window.speechSynthesis.onvoiceschanged = () => { setVoice(); window.speechSynthesis.onvoiceschanged = null }
    }

    utterance.onstart = () => { setIsSpeaking(true); setError(null) }
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (e) => {
      setIsSpeaking(false)
      if (e.error !== 'interrupted') {
        setError({ code: 'RECOGNITION_ERROR', message: `Speech synthesis error: ${e.error}` })
      }
    }

    window.speechSynthesis.speak(utterance)
  }, [ttsSupported])

  const stopSpeaking = useCallback(() => {
    if (!ttsSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [ttsSupported])

  const startRecording = useCallback(() => {
    if (!sttSupported) {
      setError({ code: 'NOT_SUPPORTED', message: 'Speech recognition is not supported in this browser. Please use Chrome or Edge.' })
      return
    }
    if (isRecording) return

    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition
    const recognition = new SpeechRecognitionCtor()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    transcriptRef.current = ''
    setTranscriptState('')

    recognition.onstart = () => {
      setIsRecording(true)
      setError(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let final = ''
      let interim = ''
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          final += result[0].transcript + ' '
        } else {
          interim += result[0].transcript
        }
      }
      const combined = (final + interim).trim()
      transcriptRef.current = combined
      setTranscriptState(combined)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      setIsRecording(false)
      if (event.error === 'not-allowed') {
        setError({ code: 'PERMISSION_DENIED', message: 'Microphone permission denied. Please allow microphone access.' })
      } else if (event.error !== 'aborted') {
        setError({ code: 'RECOGNITION_ERROR', message: `Recognition error: ${event.error}` })
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
    } catch {
      setError({ code: 'RECOGNITION_ERROR', message: 'Failed to start recording. Please try again.' })
    }
  }, [sttSupported, isRecording])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch { /* ignore */ }
      recognitionRef.current = null
    }
    setIsRecording(false)
  }, [])

  const clearTranscript = useCallback(() => {
    transcriptRef.current = ''
    setTranscriptState('')
  }, [])

  const setTranscript = useCallback((t: string) => {
    transcriptRef.current = t
    setTranscriptState(t)
  }, [])

  return {
    isSupported,
    ttsSupported,
    sttSupported,
    isSpeaking,
    isRecording,
    transcript,
    error,
    speakQuestion,
    stopSpeaking,
    startRecording,
    stopRecording,
    clearTranscript,
    setTranscript,
  }
}
