import React, { useState } from 'react';
import { Sparkles, Flame, Droplet, Dumbbell, Calendar, Heart, Award, ArrowRight } from 'lucide-react';
import { getRandomQuote } from '../data/quotes';

const COZY_STICKY_NOTES = [
  "You are doing so well, lovely! Remember to take a deep breath and sip some water. You've got this! 🌸✨",
  "Small steps still take you forward. Be proud of yourself for showing up today. You are worthy of love and rest! 🧸🤍",
  "A little progress is still progress! Be gentle with your heart today, you're doing the best you can. ☁️🌷",
  "Don't forget to stretch your arms, look out the window, and smile! You are an absolute star! 🌟🧸",
  "You deserve a cozy break today. Snuggle up, drink some warm tea, and celebrate your little wins! 🍵🌸",
  "Remember to be kind to your mind today. You don't have to be perfect to be amazing. 🫧🤍"
];

const getStickyNoteForDate = (dateStr) => {
  if (!dateStr) return COZY_STICKY_NOTES[0];
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COZY_STICKY_NOTES.length;
  return COZY_STICKY_NOTES[index];
};

export default function Dashboard({
  profile,
  setProfile,
  simulatedDate,
  currentDayName,
  waterLog,
  setWaterLog,
  nutritionLog,
  workoutLog,
  dailyCheckIns,
  setCurrentTab
}) {
  const [quote] = useState(getRandomQuote());
  const stickyNote = getStickyNoteForDate(simulatedDate);

  // Get data for today
  const todayWater = waterLog[simulatedDate] || 0;
  const todayCheckIn = dailyCheckIns[simulatedDate] || null;
  const todayWorkout = workoutLog[simulatedDate] || { completed: false };
  const todayNutrition = nutritionLog[simulatedDate] || { breakfast: false, lunch: false, snack: false, dinner: false };

  // Calculate small wins count
  let completedWins = 0;
  if (todayWater >= 6) completedWins++;
  if (todayWorkout.completed) completedWins++;
  if (todayCheckIn) completedWins++;
  if (todayNutrition.breakfast && todayNutrition.lunch && todayNutrition.dinner) completedWins++;

  // Mock list of today's quick goals
  const todayTasks = [
    { id: 'water', label: 'Stay hydrated (6 drops/3L)', completed: todayWater >= 6, icon: Droplet, color: 'text-blue-400 bg-blue-50' },
    { id: 'workout', label: `Workout: ${currentDayName} Routine`, completed: todayWorkout.completed, icon: Dumbbell, color: 'text-sage bg-sage/10' },
    { id: 'checkin', label: 'Daily mood & energy check-in', completed: !!todayCheckIn, icon: Heart, color: 'text-rose bg-rose/10' },
    { id: 'meals', label: 'Log three major meals', completed: todayNutrition.breakfast && todayNutrition.lunch && todayNutrition.dinner, icon: Sparkles, color: 'text-honey bg-honey/10' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">

      {/* Top Banner & Warm Greeting */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Banner Washi Tape Decoration */}
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1deg] opacity-75"></div>

        <div className="flex-1 space-y-3 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose/15 text-charcoal text-xs font-semibold border border-rose/10">
            <Sparkles className="w-3.5 h-3.5 text-rose animate-sparkle" />
            <span>Cozy space for self-love 🤍</span>
          </div>
          <h2 className="text-3.5xl md:text-4.5xl font-serif text-charcoal leading-tight">
            Hello, <span className="italic">Lovely</span> 🧸
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans max-w-md">
            {quote}
          </p>
          <div className="font-cursive text-2xl text-rose/85 pt-1">
            ~ you're doing so wonderful today! 🫧
          </div>
        </div>

        {/* Custom Watercolor Illustration Banner Image */}
        <div className="relative w-full md:w-56 h-36 rounded-2xl overflow-hidden border border-beige/40 shadow-xs flex-shrink-0">
          <img
            src="/cozy_wellness_banner.png"
            alt="Cozy Watercolor Illustration"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Grid of Main Dashboard Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Today's Vibe Card */}
        <button
          onClick={() => setCurrentTab('checkin')}
          className="relative glass-card p-6 rounded-2xl flex flex-col justify-between h-40 hover:-translate-y-0.5 transition-all duration-300 text-left w-full cursor-pointer group"
        >
          {/* Washi Tape */}
          <div className="washi-tape absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-16 h-4 rotate-[-1deg] opacity-60"></div>

          <div className="flex items-center justify-between text-charcoal/60 w-full">
            <span className="text-xs uppercase font-semibold tracking-wider group-hover:text-rose transition-colors">Today's Vibe</span>
            <span className="text-sm">☁️</span>
          </div>

          <div className="my-2 w-full">
            {todayCheckIn ? (
              <div className="space-y-1">
                <div className="text-3xl font-serif text-charcoal flex items-center gap-2">
                  <span className="text-4xl leading-none">{todayCheckIn.mood || "🙂"}</span>
                  <span className="text-xs bg-rose/25 text-charcoal px-2 py-0.5 rounded-full font-medium">
                    Energy: {todayCheckIn.energy}/10
                  </span>
                </div>
                <div className="text-[10px] text-charcoal/60 font-semibold uppercase tracking-wider">
                  Appetite: {todayCheckIn.appetite}/10 {todayCheckIn.period && "• Period 🧸"}
                </div>
              </div>
            ) : (
              <div className="select-none">
                <div className="text-lg font-serif text-charcoal leading-snug group-hover:text-rose font-bold">
                  Log mood & vibe 🫶
                </div>
                <div className="text-[10px] text-charcoal/50 mt-0.5">
                  Tap to check-in for today
                </div>
              </div>
            )}
          </div>

          <span className="text-[10px] text-rose font-medium italic group-hover:underline">
            {todayCheckIn ? "✦ Tap to edit check-in" : "✦ Mind-body harmony"}
          </span>
        </button>

        {/* Workout Streak Card */}
        <div className="relative glass-card p-6 rounded-2xl flex flex-col justify-between h-40 hover:-translate-y-0.5 transition-all duration-300">
          {/* Washi Tape */}
          <div className="washi-tape absolute top-[-6px] right-6 w-16 h-4 rotate-[1.5deg] opacity-60"></div>

          <div className="flex items-center justify-between text-charcoal/60">
            <span className="text-xs uppercase font-semibold tracking-wider">Day Streak</span>
            <Flame className="w-5 h-5 text-rose fill-rose/25 animate-pulse-slow" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-serif text-charcoal">
              {profile.workoutStreak} Days
            </div>
            <div className="text-xs text-charcoal/60 font-medium">
              Daily Wins Streak
            </div>
          </div>
          <span className="text-[10px] text-rose font-medium italic">
            🔥 Keep it glowing, one percent more!
          </span>
        </div>

        {/* Weight Journey Card */}
        <div className="relative glass-card p-6 rounded-2xl flex flex-col justify-between h-40 hover:-translate-y-0.5 transition-all duration-300">
          {/* Washi Tape */}
          <div className="washi-tape absolute top-[-6px] left-6 w-16 h-4 rotate-[-1.5deg] opacity-60"></div>

          <div className="flex items-center justify-between text-charcoal/60">
            <span className="text-xs uppercase font-semibold tracking-wider">Weight Goal</span>
            <span className="text-xl">🥛</span>
          </div>
          <div className="my-2">
            <div className="text-2.5xl font-serif text-charcoal leading-none">
              {profile.weight}kg → {profile.goalWeight}kg
            </div>
            <div className="text-xs text-charcoal/60 mt-1">
              Remaining: <span className="font-semibold text-charcoal">{(profile.goalWeight - profile.weight).toFixed(1)}kg</span>
            </div>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-rose h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, ((profile.weight - (profile.startingWeight || 40)) / (profile.goalWeight - (profile.startingWeight || 40))) * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* Today's Small Wins Completed */}
        <div className="relative glass-card p-6 rounded-2xl flex flex-col justify-between h-40 hover:-translate-y-0.5 transition-all duration-300">
          {/* Washi Tape */}
          <div className="washi-tape absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-16 h-4 rotate-[1deg] opacity-60"></div>

          <div className="flex items-center justify-between text-charcoal/60">
            <span className="text-xs uppercase font-semibold tracking-wider">Small Wins</span>
            <Award className="w-5 h-5 text-honey fill-honey/20" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-serif text-charcoal">
              {completedWins} / 4
            </div>
            <div className="text-xs text-charcoal/60 font-medium">
              Completed today
            </div>
          </div>
          <span className="text-[17px] text-rose font-medium font-cursive">
            {completedWins === 4 ? "A perfect day! 🌷" : "Slow progress is progress!"}
          </span>
        </div>
      </div>

      {/* Main Grid: Checklist & Cozy Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Column: Today's Wins Checklist (Notebook Style) */}
        <div className="md:col-span-2 glass-card rounded-3xl p-6 md:p-8 relative">

          {/* Notebook Spiral loops inside card */}
          <div className="absolute left-[-10px] top-6 bottom-6 w-5 flex flex-col justify-between pointer-events-none z-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-2 rounded-full binder-ring opacity-80"></div>
            ))}
          </div>

          <div className="pl-4">
            <h3 className="text-2xl font-serif mb-1 flex items-center gap-2">
              <span>Today's Little Checklist</span>
              <span className="text-lg">☁️</span>
            </h3>
            <p className="text-xs text-charcoal/60 mb-6 italic">
              Don't stress, just small steps. Mark what feels right.
            </p>

            <div className="space-y-4">
              {todayTasks.map((task) => {
                const Icon = task.icon;
                return (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${task.completed
                      ? 'bg-cream/40 border-beige/40 opacity-80'
                      : 'bg-white border-beige/30 hover:border-rose/30 shadow-2xs'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${task.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm ${task.completed ? 'line-through text-charcoal/50 font-normal' : 'font-medium text-charcoal'}`}>
                        {task.label}
                      </span>
                    </div>

                    {/* Cute check circular dot */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${task.completed
                      ? 'bg-rose border-rose text-white'
                      : 'border-beige hover:border-rose bg-white'
                      }`}>
                      {task.completed && <span className="text-[10px] leading-none">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Water Quick Tracker & Posture Sticky Note */}
        <div className="flex flex-col gap-6">

          {/* Mini Water Glass Tracker (Read-only on Dashboard) */}
          <div className="glass-card rounded-3xl p-6 relative flex-1">
            <div className="washi-tape absolute top-[-6px] left-10 w-16 h-4 rotate-[-2deg] opacity-60"></div>
            <h4 className="text-lg font-serif mb-1 flex items-center gap-1.5">
              <span>Hydration Status</span>
              <Droplet className="w-4 h-4 text-blue-400 fill-blue-50" />
            </h4>
            <p className="text-xs text-charcoal/50 mb-3 font-cursive text-sm">
              Daily goal: 3 Litres
            </p>

            <div className="flex flex-wrap gap-2.5 my-3.5 justify-center">
              {[...Array(6)].map((_, i) => {
                const isFilled = i < todayWater;
                return (
                  <span
                    key={i}
                    className="text-3xl select-none transition-transform duration-300 hover:scale-115"
                  >
                    {isFilled ? '💧' : '🫧'}
                  </span>
                );
              })}
            </div>

            <div className="text-center mt-2.5">
              <span className="text-2xl font-serif font-semibold text-charcoal">
                {((todayWater * 500) / 1000).toFixed(1)}L
              </span>
              <span className="text-xs text-charcoal/60 ml-1">/ 3.0L Met</span>
            </div>

            <button
              onClick={() => setCurrentTab('checkin')}
              className="text-[11px] text-rose font-medium font-cursive hover:underline mt-3 text-center w-full block select-none focus:outline-hidden"
            >
              Go to Check-In to log water 🫧
            </button>
          </div>

          {/* Sticky Note Posture Reminder */}
          <div className="bg-rose/35 rounded-3xl p-6 border border-rose/25 shadow-xs relative flex flex-col justify-between hover:shadow-sm transition-all duration-300">
            <div className="washi-tape absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-20 h-5 rotate-[1deg] opacity-70 bg-rose/40"></div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif italic text-charcoal flex items-center gap-1.5">
                <span>Sticky Note</span>
                <span className="text-sm">🧸</span>
              </h4>
              <p className="text-[19px] font-cursive text-charcoal/80 leading-relaxed pt-1">
                "{stickyNote}"
              </p>
            </div>

            <div className="font-cursive text-right text-sm text-charcoal/50 mt-4">
              ~ your wellness buddy
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
