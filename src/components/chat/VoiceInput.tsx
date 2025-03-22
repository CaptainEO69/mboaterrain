
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface VoiceInputProps {
  onTextCaptured: (text: string) => void;
  isDisabled?: boolean;
}

export function VoiceInput({ onTextCaptured, isDisabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fr-FR'; // Set to French language
      
      // Set up event handlers
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTextCaptured(transcript);
          toast.success("Message vocal capturé");
        }
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        toast.error("Erreur de reconnaissance vocale");
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
    
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors when stopping non-started recognition
        }
      }
    };
  }, [onTextCaptured]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast.info("Parlez maintenant...");
    }
  };

  if (!isSupported) {
    return null; // Don't render anything if speech recognition is not supported
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleListening}
      disabled={isDisabled}
      className={`rounded-full ${isListening ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
      aria-label={isListening ? "Arrêter l'enregistrement" : "Enregistrer un message vocal"}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </Button>
  );
}
