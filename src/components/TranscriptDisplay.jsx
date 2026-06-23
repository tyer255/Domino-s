import { memo } from 'react';

const TranscriptDisplay = memo(function TranscriptDisplay({ interimTranscript, isListening }) {
  if (!interimTranscript && !isListening) return null;

  return (
    <div className="glass rounded-2xl px-4 py-3 mb-4 slide-up">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
          Hearing
        </span>
      </div>
      <p className="text-sm text-white/90 min-h-[20px]">
        {interimTranscript || 'Listening...'}
      </p>
    </div>
  );
});

export default TranscriptDisplay;
