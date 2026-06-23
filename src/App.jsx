import { useState, useEffect, useCallback } from 'react';
import JarvisOrb from './components/JarvisOrb';
import ChatHistory from './components/ChatHistory';
import VoiceButton from './components/VoiceButton';
import TranscriptDisplay from './components/TranscriptDisplay';
import voiceEngine from './utils/voiceEngine';
import { parseCommand } from './utils/commandParser';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSupported, setIsSupported] = useState(true);
  const [showCommands, setShowCommands] = useState(false);

  // Initialize voice engine callbacks
  useEffect(() => {
    if (!voiceEngine.isSupported()) {
      setIsSupported(false);
      return;
    }

    voiceEngine.onStart = () => {
      setIsListening(true);
      setInterimTranscript('');
    };

    voiceEngine.onSpeechStart = () => {
      // Speech detected
    };

    voiceEngine.onResult = (result) => {
      setInterimTranscript(result.interim);

      if (result.isComplete && result.final) {
        handleCommand(result.final);
      }
    };

    voiceEngine.onError = (error) => {
      console.error('Voice error:', error);
      setIsListening(false);
      setIsProcessing(false);

      let errorMessage = 'Something went wrong. Please try again.';
      if (error === 'not-allowed') {
        errorMessage = 'Microphone access denied. Please allow microphone permissions.';
      } else if (error === 'no-speech') {
        errorMessage = 'No speech detected. Please try again.';
      } else if (error === 'network') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error === 'not-supported') {
        errorMessage = 'Speech recognition is not supported in this browser.';
        setIsSupported(false);
      }

      setMessages(prev => [...prev, { text: errorMessage, isUser: false }]);
    };

    voiceEngine.onEnd = () => {
      setIsListening(false);
    };

    // Preload voices
    if (voiceEngine.synthesisSupported()) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleCommand = useCallback(async (transcript) => {
    setIsListening(false);
    setIsProcessing(true);
    setInterimTranscript('');

    // Add user message
    setMessages(prev => [...prev, { text: transcript, isUser: true }]);

    // Parse and execute command
    const command = parseCommand(transcript);
    const response = command.execute();

    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Add assistant response
    setMessages(prev => [...prev, { text: response, isUser: false }]);

    setIsProcessing(false);

    // Speak the response
    if (voiceEngine.synthesisSupported()) {
      setIsSpeaking(true);
      try {
        await voiceEngine.speak(response);
      } catch (e) {
        console.error('Speech synthesis error:', e);
      }
      setIsSpeaking(false);
    }
  }, []);

  const handleVoiceButtonClick = useCallback(() => {
    if (isProcessing || isSpeaking) return;

    if (isListening) {
      voiceEngine.stopListening();
    } else {
      voiceEngine.startListening();
    }
  }, [isListening, isProcessing, isSpeaking]);

  const commandsList = [
    { cmd: 'call [number]', desc: 'Make a phone call' },
    { cmd: 'open WhatsApp', desc: 'Launch WhatsApp' },
    { cmd: 'YouTube search [query]', desc: 'Search on YouTube' },
    { cmd: 'play [song]', desc: 'Play a song on YouTube' },
    { cmd: 'what time is it', desc: 'Get current time' },
    { cmd: 'today\'s date', desc: 'Get current date' },
    { cmd: 'google [query]', desc: 'Search on Google' },
    { cmd: 'navigate to [place]', desc: 'Open maps navigation' },
  ];

  return (
    <div className="h-full flex flex-col animated-bg overflow-hidden">
      {/* Header */}
      <header className="glass-strong px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
            <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.15 5 4.01 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <h1 className="font-orbitron text-lg font-semibold text-white tracking-wider">
              JARVIS
            </h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">
              AI Voice Assistant
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCommands(!showCommands)}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Show commands"
        >
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Commands overlay */}
        {showCommands && (
          <div className="absolute inset-0 z-20 glass-strong slide-up">
            <div className="h-full flex flex-col p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-orbitron text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                  Voice Commands
                </h2>
                <button
                  onClick={() => setShowCommands(false)}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pb-4">
                {commandsList.map((item, index) => (
                  <div key={index} className="glass rounded-xl p-3">
                    <p className="font-mono text-sm text-cyan-400 mb-1">
                      "{item.cmd}"
                    </p>
                    <p className="text-xs text-white/50">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orb section */}
        <div className="flex-shrink-0 pt-8 pb-16">
          <JarvisOrb
            isListening={isListening}
            isProcessing={isProcessing}
            isSpeaking={isSpeaking}
          />
        </div>

        {/* Transcript display */}
        <div className="flex-shrink-0 px-4">
          <TranscriptDisplay
            interimTranscript={interimTranscript}
            isListening={isListening}
          />
        </div>

        {/* Chat history */}
        <div className="flex-1 min-h-0 px-2 pb-2">
          <div className="h-full glass rounded-2xl overflow-hidden">
            <ChatHistory messages={messages} />
          </div>
        </div>
      </div>

      {/* Bottom voice control */}
      <div className="flex-shrink-0 glass-strong p-4 pb-safe">
        <div className="flex flex-col items-center">
          {!isSupported && (
            <p className="text-xs text-red-400 mb-2">
              Speech recognition not supported. Use Chrome on Android/iOS.
            </p>
          )}
          <VoiceButton
            isListening={isListening}
            isProcessing={isProcessing}
            isSpeaking={isSpeaking}
            disabled={!isSupported}
            onClick={handleVoiceButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
