import { memo } from 'react';

const VoiceButton = memo(function VoiceButton({
  isListening,
  isProcessing,
  isSpeaking,
  disabled,
  onClick
}) {
  const isActive = isListening;
  const isDisabled = disabled || isProcessing || isSpeaking;

  return (
    <div className="relative">
      {/* Outer ripple effects when active */}
      {isActive && (
        <>
          <div
            className="absolute inset-0 -m-4 rounded-full bg-cyan-400/20 animate-ping"
            style={{ animationDuration: '1.5s' }}
          />
          <div
            className="absolute inset-0 -m-8 rounded-full bg-cyan-400/10 animate-ping"
            style={{ animationDuration: '2s', animationDelay: '0.3s' }}
          />
        </>
      )}

      {/* Main button */}
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`
          relative w-20 h-20 rounded-full
          flex items-center justify-center
          transition-all duration-300 ease-out
          btn-press
          ${isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:scale-105 active:scale-95'
          }
          ${isActive
            ? 'glass-strong shadow-[0_0_40px_rgba(0,212,255,0.5)]'
            : 'glass shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]'
          }
        `}
        aria-label={isActive ? 'Stop listening' : 'Start listening'}
      >
        {/* Gradient background when active */}
        <div
          className={`
            absolute inset-1 rounded-full
            transition-opacity duration-300
            ${isActive
              ? 'bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-purple-600/20 opacity-100'
              : 'opacity-0'
            }
          `}
        />

        {/* Icon */}
        <svg
          className={`
            w-8 h-8 relative z-10
            transition-all duration-300
            ${isActive ? 'text-cyan-400 scale-110' : 'text-white/80'}
          `}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {isProcessing ? (
            // Processing spinner
            <circle
              className="animate-spin origin-center"
              style={{ animationDuration: '1s' }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="31.4 31.4"
              strokeLinecap="round"
            />
          ) : isSpeaking ? (
            // Speaking icon (sound waves)
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          ) : isActive ? (
            // Stop icon when listening
            <rect x="6" y="6" width="12" height="12" rx="1" />
          ) : (
            // Microphone icon
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          )}
        </svg>
      </button>

      {/* Label */}
      <p className={`
        text-center mt-3 text-sm font-medium
        transition-colors duration-300
        ${isActive ? 'text-cyan-400' : 'text-white/60'}
      `}>
        {isProcessing ? 'Processing...' : isSpeaking ? 'Speaking...' : isActive ? 'Listening...' : 'Tap to Speak'}
      </p>
    </div>
  );
});

export default VoiceButton;
