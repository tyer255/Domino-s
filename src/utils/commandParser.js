// CommandParser.js - Parse voice commands and execute actions

const commandPatterns = {
  call: {
    patterns: [
      /^call\s+(.+)$/i,
      /^phone\s+(.+)$/i,
      /^dial\s+(.+)$/i
    ],
    handler: (match) => ({
      action: 'call',
      target: match[1].trim(),
      execute: () => {
        const phoneNumber = extractPhoneNumber(match[1].trim());
        if (phoneNumber) {
          window.open(`tel:${phoneNumber}`, '_self');
          return `Calling ${phoneNumber}...`;
        }
        return `I heard you want to call ${match[1].trim()}, but I need a phone number. Please say "call" followed by a number.`;
      }
    })
  },
  whatsapp: {
    patterns: [
      /^open\s+whatsapp$/i,
      /^whatsapp$/i,
      /^launch\s+whatsapp$/i,
      /^start\s+whatsapp$/i
    ],
    handler: () => ({
      action: 'whatsapp',
      execute: () => {
        window.location.href = 'whatsapp://';
        return 'Opening WhatsApp...';
      }
    })
  },
  youtube: {
    patterns: [
      /^youtube\s+search\s+(.+)$/i,
      /^search\s+(.+)\s+on\s+youtube$/i,
      /^play\s+(.+?)\s+(?:song|video|music)$/i,
      /^play\s+(.+)$/i,
      /^open\s+youtube/i,
      /^youtube$/i
    ],
    handler: (match) => ({
      action: 'youtube',
      query: match ? match[1]?.trim() : null,
      execute: () => {
        if (match && match[1]) {
          const searchQuery = encodeURIComponent(match[1].trim());
          window.location.href = `vnd.youtube://results?search_query=${searchQuery}`;
          return `Searching YouTube for "${match[1].trim()}"...`;
        }
        window.location.href = 'vnd.youtube://';
        return 'Opening YouTube...';
      }
    })
  },
  time: {
    patterns: [
      /^what\s+time\s+is\s+it$/i,
      /^current\s+time$/i,
      /^tell\s+me\s+the\s+time$/i,
      /^time$/i
    ],
    handler: () => ({
      action: 'time',
      execute: () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return `The current time is ${timeString}`;
      }
    })
  },
  date: {
    patterns: [
      /^what\s+(?:is\s+)?today'?s?\s+date$/i,
      /^what\s+is\s+the\s+date$/i,
      /^today'?s?\s+date$/i,
      /^date$/i
    ],
    handler: () => ({
      action: 'date',
      execute: () => {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        return `Today is ${dateString}`;
      }
    })
  },
  google: {
    patterns: [
      /^google\s+(.+)$/i,
      /^search\s+(.+)$/i,
      /^look\s+up\s+(.+)$/i
    ],
    handler: (match) => ({
      action: 'google',
      query: match[1].trim(),
      execute: () => {
        const searchQuery = encodeURIComponent(match[1].trim());
        window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
        return `Searching Google for "${match[1].trim()}"`;
      }
    })
  },
  maps: {
    patterns: [
      /^open\s+maps$/i,
      /^maps$/i,
      /^navigate\s+to\s+(.+)$/i,
      /^directions\s+to\s+(.+)$/i
    ],
    handler: (match) => ({
      action: 'maps',
      query: match[1]?.trim(),
      execute: () => {
        if (match[1]) {
          const location = encodeURIComponent(match[1].trim());
          window.open(`https://www.google.com/maps/search/${location}`, '_blank');
          return `Opening maps for "${match[1].trim()}"`;
        }
        window.location.href = 'geo:';
        return 'Opening Maps...';
      }
    })
  }
};

function extractPhoneNumber(text) {
  // Try to extract phone number from text
  const phoneRegex = /[\d\s\-\+\(\)]{10,}/;
  const match = text.match(phoneRegex);

  if (match) {
    // Clean the number
    return match[0].replace(/[\s\-\(\)]/g, '');
  }

  // Check if it's just digits (user said numbers)
  const digitsOnly = text.replace(/\D/g, '');
  if (digitsOnly.length >= 10) {
    return digitsOnly;
  }

  return null;
}

export function parseCommand(transcript) {
  if (!transcript || typeof transcript !== 'string') {
    return null;
  }

  const cleanTranscript = transcript.trim().toLowerCase();

  // Check each command category
  for (const [category, config] of Object.entries(commandPatterns)) {
    for (const pattern of config.patterns) {
      const match = cleanTranscript.match(pattern);
      if (match) {
        return config.handler(match);
      }
    }
  }

  // No command matched
  return {
    action: 'unknown',
    transcript: transcript,
    execute: () => {
      return "I'm sorry, I can only perform basic device functions right now. Try saying 'call' with a number, 'open WhatsApp', 'YouTube search', or 'play' a song.";
    }
  };
}

export const getSupportedCommands = () => [
  { command: 'call [number]', example: 'call +919000000000' },
  { command: 'open WhatsApp', example: 'open WhatsApp' },
  { command: 'YouTube search [query]', example: 'YouTube search funny cats' },
  { command: 'play [song name]', example: 'play Believer song' },
  { command: 'what time is it', example: 'what time is it' },
  { command: 'today\'s date', example: 'today\'s date' },
  { command: 'google [query]', example: 'google weather today' },
];
