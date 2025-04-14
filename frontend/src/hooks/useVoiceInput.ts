import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface VoiceInputOptions {
  onResult: (transcript: string) => void;
  onSilentTimeout?: () => void;
  onError: () => void;
  silentTimeout?: number;
}

export function useVoiceInput({ onResult, onSilentTimeout, onError, silentTimeout = 10000 }: VoiceInputOptions) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigator = useNavigate();
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      
      navigator("/battle-map")
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  
    recognition.onstart = () => {
      console.log('🎤 Recognition started');
      setListening(true);
    };
  
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      stopListening();
    };
  
    recognition.onerror = () => {
      console.warn('❌ Recognition error');
      onError();
      stopListening();
    };
  
    recognition.onend = () => {
      console.log('🛑 Recognition ended');
      setListening(false);
    };
  
    recognitionRef.current = recognition;
  }, [onResult]);
  

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
      setListening(true);

      silentTimerRef.current = setTimeout(() => {
        stopListening();
        onSilentTimeout?.();
      }, silentTimeout);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
    }
    if (silentTimerRef.current) {
      clearTimeout(silentTimerRef.current);
    }
    setListening(false);
  };

  return { listening, startListening, stopListening };
}
