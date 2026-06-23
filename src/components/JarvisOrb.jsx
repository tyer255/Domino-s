import { memo, useMemo } from 'react';

const JarvisOrb = memo(function JarvisOrb({ isListening, isProcessing, isSpeaking }) {
  const orbState = useMemo(() => {
    if (isProcessing) return 'processing';
    if (isSpeaking) return 'speaking';
    if (isListening) return 'listening';
    return 'idle';
  }, [isListening, isProcessing, isSpeaking]);

  return (
    <div className="relative flex items-center justify-center w-full max-w-xs mx-auto">
      {/* Outer glow layers */}
      <div
        className={`
          absolute inset-0 rounded-full blur-3xl transition-all duration-500
          ${orbState === 'listening' ? 'bg-cyan-400/40 scale-125' : ''}
          ${orbState === 'speaking' ? 'bg-emerald-400/40 scale-120' : ''}
          ${orbState === 'processing' ? 'bg-amber-400/40 scale-125' : ''}
          ${orbState === 'idle' ? 'bg-cyan-400/20 scale-100' : ''}
        `}
      />

      {/* Ripple effects when listening */}
      {isListening && (
        <>
          <div
            className="absolute inset-[-20%] rounded-full border-2 border-cyan-400/30 animate-ping"
            style={{ animationDuration: '1.5s' }}
          />
          <div
            className="absolute inset-[-30%] rounded-full border border-cyan-400/20 animate-ping"
            style={{ animationDuration: '2s', animationDelay: '0.5s' }}
          />
        </>
      )}

      {/* Main orb container */}
      <div
        className={`
          relative w-48 h-48 rounded-full
          transition-all duration-300 ease-out
          ${isListening ? 'scale-105' : 'scale-100'}
        `}
      >
        {/* Orb background gradient */}
        <div
          className={`
            absolute inset-0 rounded-full
            bg-gradient-to-br from-cyan-400/80 via-blue-500/60 to-purple-600/40
            transition-all duration-500
            ${isListening ? 'animate-pulse' : ''}
          `}
          style={{
            animationDuration: isListening ? '0.8s' : '3s',
          }}
        />

        {/* Inner glass layer */}
        <div
          className="
            absolute inset-2 rounded-full
            bg-gradient-to-br from-white/10 to-transparent
            backdrop-blur-sm
          "
        />

        {/* Core gradient */}
        <div
          className={`
            absolute inset-6 rounded-full
            bg-gradient-radial from-cyan-300/90 via-cyan-400/60 to-blue-600/30
            transition-all duration-300
            ${isProcessing ? 'animate-spin' : ''}
          `}
          style={{
            animationDuration: '2s',
          }}
        />

        {/* Highlight ring */}
        <div className="absolute inset-8 rounded-full border border-white/20" />

        {/* Inner pulse core */}
        <div
          className={`
            absolute inset-16 rounded-full
            transition-all duration-200
            ${isListening ? 'bg-white/40 scale-110' : 'bg-white/20 scale-100'}
          `}
        />

        {/* Center dot */}
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-4 h-4 rounded-full
            transition-all duration-300
            ${isListening ? 'bg-white scale-125 shadow-[0_0_20px_#00d4ff]' : 'bg-cyan-200/80 scale-100'}
          `}
        />

        {/* Sound wave bars when listening */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-12 bg-gradient-to-t from-cyan-400/80 to-white/60 rounded-full wave-bar"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Processing spinner */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Status indicator below orb */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <div
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${orbState === 'listening' ? 'bg-cyan-400 shadow-[0_0_10px_#00d4ff]' : ''}
              ${orbState === 'speaking' ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : ''}
              ${orbState === 'processing' ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse' : ''}
              ${orbState === 'idle' ? 'bg-gray-400' : ''}
            `}
          />
          <span className="text-xs font-medium text-white/80 capitalize">
            {orbState === 'idle' && 'Ready'}
            {orbState === 'listening' && 'Listening...'}
            {orbState === 'processing' && 'Processing...'}
            {orbState === 'speaking' && 'Speaking...'}
          </span>
        </div>
      </div>
    </div>
  );
});

export default JarvisOrb;
