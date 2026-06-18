export const quotes = [
  "✧ One percent better than yesterday.",
  "✨ Small steps matter, always.",
  "🫶 You are doing wonderful. Keep going.",
  "🧿 Protected energy. Take it one day at a time.",
  "♡ Progress over perfection.",
  "🌸 Small wins count. Every single one.",
  "☁️ Breathe in calm, breathe out doubt.",
  "🫧 Clean mind, cozy heart, strong body.",
  "🌷 Bloom at your own gentle pace.",
  "🧸 Rest is progress too. Be kind to yourself today.",
  "💃 Every choice you make is a step toward your goal.",
  "✧ One day at a time. No rushing, just growing."
];

export const getRandomQuote = () => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return quotes[dayOfYear % quotes.length];
};
