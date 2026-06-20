export const quotes = [
  "✧ One percent better than yesterday.",
  "✨ Small steps matter, always.",
  "🤍 You are doing wonderful. Keep going.",
  "✨ Protected energy. Take it one day at a time.",
  "♡ Progress over perfection.",
  "🌸 Small wins count. Every single one.",
  "☁️ Breathe in calm, breathe out doubt.",
  "🌸 Clean mind, cozy heart, strong body.",
  "🌷 Bloom at your own gentle pace.",
  "🧸 Rest is progress too. Be kind to yourself today.",
  "💃 Every choice you make is a step toward your goal.",
  "✧ One day at a time. No rushing, just growing."
];

export const lateNightQuotes = [
  "🌙 Rest is a form of nourishment too. Close your eyes, dear. 🧸",
  "✨ Under the quiet stars, let go of today's worries. 💤",
  "🌸 You did enough today. Let your cozy heart rest. 🍵",
  "🍵 Sleep is the best self-love. Goodnight, lovely. 🌸",
  "💤 Tomorrow is a fresh page to write your little wins. ☁️",
  "🧸 Time to unplug, wrap yourself in warmth, and dream. ✨",
  "☁️ Peaceful mind, cozy dreams, starry night. 🧸"
];

export const getRandomQuote = (isDarkMode = false) => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const activeQuotes = isDarkMode ? lateNightQuotes : quotes;
  return activeQuotes[dayOfYear % activeQuotes.length];
};
