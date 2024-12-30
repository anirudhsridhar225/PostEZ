'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = any;
type SpeechRecognitionEvent = {
  results: {
    isFinal: boolean;
    [key: number]: {
      transcript: string;
    };
  }[];
};
type SpeechRecognitionErrorEvent = {
  error: string;
};

const VoiceInput: React.FC = () => {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  let recognition: SpeechRecognition | null = null

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')
        setText(prevText => prevText + ' ' + transcript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }

      if (isListening) {
        recognition.start()
      } else {
        recognition.stop()
      }
    } else {
      setError('Speech recognition is not supported in this browser.')
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [isListening])

  const toggleListening = useCallback(() => {
    setIsListening(prevState => !prevState)
  }, [])

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', text)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-0">
      <CardContent>
        <div className="relative space-y-4">
          <div className="relative">
            <Textarea
              value={text}
              readOnly
              placeholder="Your speech will appear here..."
              className="min-h-[100px] p-4 border border-[#50B5CC99]/[0.6] rounded-md resize-none pr-16"
            />
            <Button
              onClick={toggleListening}
              variant="outline"
              size="icon"
              className={`absolute bottom-5 right-4 rounded-full w-16 h-16 ${isListening ? 'bg-red-100 hover:bg-red-200' : 'bg-blue-100 hover:bg-blue-200'}`}
            >
              {isListening ? (
                <MicOff className="h-8 w-8 text-red-500" />
              ) : (
                <Mic className="h-8 w-8 text-blue-500" />
              )}
              <span className="sr-only">{isListening ? 'Stop Listening' : 'Start Listening'}</span>
            </Button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-center">
            <Button onClick={handleSubmit} className="mt-4 border border-white/[0.5]">
              Submit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VoiceInput

