'use client'

import { Card, CardContent } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff } from 'lucide-react'
import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

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

interface Message {
  text: string;
  isUser: boolean;
}

const questions = [
  "Could you clarify who your target customer is? For example, are you selling to contractors, DIY homeowners, furniture makers, or a combination?",
  "Could you clarify what type of contractors? (e.g., general contractors, electricians, plumbers, roofers, etc.) and what product/service are you selling to them?",
  "Could you clarify what specific type of general contractors? Residential? Commercial? Specializing in a particular area (e.g., renovations, new construction)? Knowing this will help me understand their needs and create more effective content.",
  "Could you clarify what kind of residential business this is? For example, is it a real estate agency, a home builder, a property management company, or something else?",
  "Could you clarify which type of real estate agency? (e.g., residential, commercial, luxury, etc.) What is their target audience (e.g., first-time homebuyers, investors, families)? What is their unique selling proposition (USP)?",
  "Thank you! I have understood everything.",
];

const VoiceInput: React.FC = () => {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isInitialSubmit, setIsInitialSubmit] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')
        setText(transcript)
      }

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }
    } else {
      setError('Speech recognition is not supported in this browser.')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.start()
      } else {
        recognitionRef.current.stop()
      }
    }
  }, [isListening])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleListening = useCallback(() => {
    setIsListening(prevState => !prevState)
  }, [])

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = () => {
    if (text.trim()) {
      setMessages(prev => [...prev, { text: text.trim(), isUser: true }])
      setText('')
      setIsInitialSubmit(false)

      // Move to the next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        setMessages(prev => [...prev, { text: questions[currentQuestionIndex + 1], isUser: false }])
      } else {
        // All questions answered
        setMessages(prev => [...prev, { text: "Thank you for answering all the questions.", isUser: false }])
      }

      // Focus the textarea after submission
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-0">
      <CardContent className="p-0">
        {!isInitialSubmit && (
          <div className="max-h-screen overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="p-6">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={isInitialSubmit ? "Your speech will appear here..." : "Type a message..."}
              className="min-h-[100px] p-4 border border-[#50B5CC99]/[0.6] rounded-md resize-none pr-16 text-white"
            />
            <Button
              onClick={toggleListening}
              variant="outline"
              size="icon"
              className={`absolute bottom-5 right-4 rounded-full w-12 h-12 ${isListening ? 'bg-red-100 hover:bg-red-200' : 'bg-blue-100 hover:bg-blue-200'}`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6 text-red-500" />
              ) : (
                <Mic className="h-6 w-6 text-blue-500" />
              )}
              <span className="sr-only">{isListening ? 'Stop Listening' : 'Start Listening'}</span>
            </Button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

export default VoiceInput

