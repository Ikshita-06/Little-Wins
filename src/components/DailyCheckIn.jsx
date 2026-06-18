import React, { useState, useEffect } from 'react';
import {
  Smile,
  Heart,
  Droplet,
  Dumbbell,
  ChefHat,
  Save,
  Plus,
  Minus,
  Check,
  Calendar,
  Sparkles,
  Coffee
} from 'lucide-react';

export default function DailyCheckIn({
  profile,
  setProfile,
  periods,
  setPeriods,
  simulatedDate,
  dailyCheckIns,
  setDailyCheckIns,
  waterLog,
  setWaterLog,
  workoutLog,
  setWorkoutLog,
  nutritionLog,
  setNutritionLog,
  isEditable
}) {
  // Local states for the current form inputs
  const [selectedMood, setSelectedMood] = useState('');
  const [energy, setEnergy] = useState(5);
  const [appetite, setAppetite] = useState(5);
  const [isOnPeriod, setIsOnPeriod] = useState(false);
  const [notes, setNotes] = useState('');

  // Local state drafts for the water, workouts, and nutrition logs
  const [draftWater, setDraftWater] = useState(0);
  const [draftWorkout, setDraftWorkout] = useState({ completed: false });
  const [draftMeals, setDraftMeals] = useState({ breakfast: false, lunch: false, snack: false, dinner: false });

  // Notification states
  const [savedMessage, setSavedMessage] = useState('');

  // Emojis and descriptions for mood choices
  const moodOptions = [
    { emoji: '🧸', label: 'Cozy', desc: 'Warm & comfortable', activeColor: 'bg-[#F5EBD0] border-[#deb278] ring-[#F5EBD0]/35' },
    { emoji: '✨', label: 'Energetic', desc: 'Ready for anything!', activeColor: 'bg-[#E8C5C8] border-[#dfb0b4] ring-[#E8C5C8]/35' },
    { emoji: '🥰', label: 'Calm', desc: 'At peace & content', activeColor: 'bg-[#B5C9C0] border-[#9ab3a7] ring-[#B5C9C0]/35' },
    { emoji: '🥺', label: 'Sensitive', desc: 'A bit tender or soft', activeColor: 'bg-[#E8C08A] border-[#deb278] ring-[#E8C08A]/35' },
    { emoji: '😭', label: 'Tired', desc: 'Low energy today', activeColor: 'bg-[#c3bbb2] border-[#b0a79d] ring-[#c3bbb2]/30' }
  ];

  // Load existing check-in data when simulated date changes
  useEffect(() => {
    const todayCheckIn = dailyCheckIns[simulatedDate] || {};
    setSelectedMood(todayCheckIn.mood || '');
    setEnergy(todayCheckIn.energy || 5);
    setAppetite(todayCheckIn.appetite || 5);
    setIsOnPeriod(!!periods[simulatedDate]);
    setNotes(todayCheckIn.notes || '');

    // Load logs into drafts
    setDraftWater(waterLog[simulatedDate] || 0);
    setDraftWorkout(workoutLog[simulatedDate] || { completed: false });
    setDraftMeals(nutritionLog[simulatedDate] || { breakfast: false, lunch: false, snack: false, dinner: false });
  }, [simulatedDate, dailyCheckIns, periods, waterLog, workoutLog, nutritionLog]);

  // Handle saving the check-in details
  const handleSaveCheckIn = (e) => {
    e.preventDefault();
    if (!isEditable) return;

    // 1. Update dailyCheckIns state
    setDailyCheckIns({
      ...dailyCheckIns,
      [simulatedDate]: {
        mood: selectedMood,
        energy: parseInt(energy),
        appetite: parseInt(appetite),
        period: isOnPeriod,
        notes: notes
      }
    });

    // 2. Update periods state based on isOnPeriod toggle
    const updatedPeriods = { ...periods };
    if (isOnPeriod) {
      updatedPeriods[simulatedDate] = true;
    } else {
      delete updatedPeriods[simulatedDate];
    }
    setPeriods(updatedPeriods);

    // 3. Update global waterLog state
    setWaterLog({
      ...waterLog,
      [simulatedDate]: draftWater
    });

    // 4. Update global workoutLog state and update workout streak
    const wasWorkoutCompleted = workoutLog[simulatedDate]?.completed || false;
    const isWorkoutCompleted = draftWorkout.completed;

    setWorkoutLog({
      ...workoutLog,
      [simulatedDate]: draftWorkout
    });

    if (isWorkoutCompleted && !wasWorkoutCompleted) {
      // Increments streak if newly completed
      setProfile(prev => ({
        ...prev,
        workoutStreak: prev.workoutStreak + 1
      }));
    } else if (!isWorkoutCompleted && wasWorkoutCompleted) {
      setProfile(prev => ({
        ...prev,
        workoutStreak: Math.max(0, prev.workoutStreak - 1)
      }));
    }

    // 5. Update global nutritionLog state
    setNutritionLog({
      ...nutritionLog,
      [simulatedDate]: draftMeals
    });

    // Show a cozy confirmation message
    setSavedMessage('Journal page saved successfully! 🌸✨');
    setTimeout(() => {
      setSavedMessage('');
    }, 3500);
  };

  // Handle clearing/undoing the check-in details
  const handleClearCheckIn = () => {
    if (!isEditable) return;
    // 1. Reset local form and draft states
    setSelectedMood('');
    setEnergy(5);
    setAppetite(5);
    setIsOnPeriod(false);
    setNotes('');
    setDraftWater(0);
    setDraftWorkout({ completed: false });
    setDraftMeals({ breakfast: false, lunch: false, snack: false, dinner: false });

    // 2. Clear from global check-ins
    const updatedCheckIns = { ...dailyCheckIns };
    delete updatedCheckIns[simulatedDate];
    setDailyCheckIns(updatedCheckIns);

    // 3. Clear from global periods
    const updatedPeriods = { ...periods };
    delete updatedPeriods[simulatedDate];
    setPeriods(updatedPeriods);

    // 4. Clear from global water log
    const updatedWater = { ...waterLog };
    delete updatedWater[simulatedDate];
    setWaterLog(updatedWater);

    // 5. Clear from global workout log
    const updatedWorkouts = { ...workoutLog };
    if (workoutLog[simulatedDate]?.completed) {
      setProfile(prev => ({
        ...prev,
        workoutStreak: Math.max(0, prev.workoutStreak - 1)
      }));
    }
    delete updatedWorkouts[simulatedDate];
    setWorkoutLog(updatedWorkouts);

    // 6. Clear from global nutrition log
    const updatedNutrition = { ...nutritionLog };
    delete updatedNutrition[simulatedDate];
    setNutritionLog(updatedNutrition);

    // Show a cozy confirmation message
    setSavedMessage('Daily page cleared! 🤍');
    setTimeout(() => {
      setSavedMessage('');
    }, 3500);
  };

  // Water click handler
  const handleWaterBubbleClick = (index) => {
    const clickedVal = index + 1;
    // Toggle back by 1 if clicking the current filled one
    const nextVal = draftWater === clickedVal ? clickedVal - 1 : clickedVal;
    setDraftWater(nextVal);
  };

  const getWaterDisplayString = (count) => {
    if (count === 0) return '0L';
    if (count === 1) return '500ml';
    return `${count / 2}L`;
  };

  // Workout toggle handler
  const handleWorkoutToggle = () => {
    setDraftWorkout({
      ...draftWorkout,
      completed: !draftWorkout.completed,
      type: draftWorkout.type || 'Daily Routine'
    });
  };

  // Meal toggle handler
  const handleMealToggle = (mealKey) => {
    setDraftMeals({
      ...draftMeals,
      [mealKey]: !draftMeals[mealKey]
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 select-none">

      {/* Warm Header Block */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1.5deg] opacity-75"></div>
        <div className="flex-1 space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose/15 text-charcoal text-xs font-semibold border border-rose/10">
            <Heart className="w-3.5 h-3.5 text-rose fill-rose/25" />
            <span>Reflect & Nourish Today 🤍</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
            Daily Journal Check-In
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 font-sans max-w-2xl">
            A quiet, personal corner to align with your body. Check off small wins, note down physical sensations, and write what you are grateful for today.
          </p>
        </div>
        <div className="flex-shrink-0 bg-buttercream/40 px-4 py-3 rounded-2xl border border-beige/40 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-charcoal/50" />
          <span className="font-serif text-sm font-bold text-charcoal">{simulatedDate}</span>
        </div>
      </div>

      {/* Floating Save success popup alert */}
      {savedMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cream border border-sage rounded-2xl p-4 shadow-lg flex items-center gap-3 animate-bounce-soft">
          <div className="w-2.5 h-full absolute left-0 top-0 bottom-0 bg-sage rounded-l-2xl"></div>
          <span className="text-xl">🌸</span>
          <span className="text-xs font-medium text-charcoal font-sans">{savedMessage}</span>
        </div>
      )}

      {/* Main Grid: Form Left, Quick Logs Right */}
      <form onSubmit={handleSaveCheckIn} className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left Column (3 cols): Vibe, Mood, energy, notes */}
        <div className="lg:col-span-3 space-y-6">

          {/* Mood Section */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] left-8 w-16 h-4 rotate-[1deg] opacity-60"></div>
            <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
              <span>How is your mood today?</span>
              <span className="text-sm">🤍</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {moodOptions.map((opt) => {
                const isActive = selectedMood === opt.emoji;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => isEditable && setSelectedMood(opt.emoji)}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all ${
                      !isEditable
                        ? 'bg-cream/40 border-beige/30 text-charcoal/40 cursor-not-allowed select-none'
                        : isActive
                          ? `${opt.activeColor} text-charcoal scale-102 ring-2 font-bold shadow-xs`
                          : 'bg-[#FAF8F5]/60 hover:bg-[#F5EBD0]/30 border-beige/40 text-charcoal/80'
                      }`}
                  >
                    <span className="text-3.5xl mb-1.5 filter drop-shadow-xs transition-transform hover:scale-115 duration-300">
                      {opt.emoji}
                    </span>
                    <span className="text-[11px] font-bold tracking-tight">{opt.label}</span>
                    <span className="text-[9px] text-charcoal/50 leading-tight mt-0.5 line-clamp-1">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Levels Section */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] right-8 w-16 h-4 rotate-[-1.5deg] opacity-60"></div>
            <h3 className="text-lg font-serif mb-5 flex items-center gap-2">
              <span>Energy & Appetite Levels</span>
              <Coffee className="w-4 h-4 text-honey" />
            </h3>

            <div className="space-y-6">
              {/* Energy Level Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-charcoal/70 uppercase tracking-wider">⚡ Energy Level</span>
                  <span className="font-bold text-sm bg-sage/20 text-charcoal px-2.5 py-0.5 rounded-full">
                    {energy} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  disabled={!isEditable}
                  onChange={(e) => setEnergy(e.target.value)}
                  className={`w-full accent-sage h-1.5 rounded-lg ${!isEditable ? 'cursor-not-allowed opacity-50 bg-cream' : 'cursor-pointer bg-cream'}`}
                />
                <div className="flex justify-between text-[10px] text-charcoal/40 italic">
                  <span>Tired / Exhausted</span>
                  <span>Ready to glow</span>
                </div>
              </div>

              {/* Appetite Level Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-charcoal/70 uppercase tracking-wider">🥛 Appetite Level</span>
                  <span className="font-bold text-sm bg-rose/20 text-charcoal px-2.5 py-0.5 rounded-full">
                    {appetite} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={appetite}
                  disabled={!isEditable}
                  onChange={(e) => setAppetite(e.target.value)}
                  className={`w-full accent-rose h-1.5 rounded-lg ${!isEditable ? 'cursor-not-allowed opacity-50 bg-cream' : 'cursor-pointer bg-cream'}`}
                />
                <div className="flex justify-between text-[10px] text-charcoal/40 italic">
                  <span>Low appetite</span>
                  <span>Very hungry</span>
                </div>
              </div>
            </div>
          </div>

          {/* Period Tracker & Notes */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] left-12 w-20 h-4 rotate-[-1deg] opacity-60"></div>

            <div className="flex items-center justify-between pb-4 border-b border-beige/40 mb-4">
              <div className="space-y-0.5">
                <h4 className="text-md font-serif font-bold text-charcoal flex items-center gap-1.5">
                  <span>Log Period Day</span>
                  <span className="text-rose">🩸</span>
                </h4>
                <p className="text-[10px] text-charcoal/50">Note down if you are on your menstruation cycles</p>
              </div>
              <button
                type="button"
                onClick={() => isEditable && setIsOnPeriod(!isOnPeriod)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  !isEditable
                    ? 'bg-cream/40 border-beige/30 text-charcoal/40 cursor-not-allowed'
                    : isOnPeriod
                      ? 'bg-rose/20 border-rose text-charcoal shadow-2xs font-bold'
                      : 'bg-white border-beige/40 text-charcoal/60 hover:border-rose/30'
                  }`}
              >
                <span>{isOnPeriod ? 'On Period 🧸' : 'Off Period ☁️'}</span>
              </button>
            </div>

            {/* Daily Reflections Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                📝 Today's Reflections & Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={!isEditable}
                placeholder={isEditable ? "Write down a happy moment, physical symptoms, gratitude, or a letter to yourself..." : "No daily reflections were recorded."}
                rows="4"
                className={`w-full bg-cream/30 border border-beige/40 rounded-2xl p-4 text-sm outline-hidden focus:ring-1 focus:ring-sage/20 placeholder-charcoal/30 font-cursive text-lg leading-relaxed ${
                  !isEditable ? 'cursor-not-allowed text-charcoal/60' : 'focus:border-sage'
                }`}
              />
            </div>
          </div>

        </div>

        {/* Right Column (2 cols): Water quick logs, workouts, and nutrition logs */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Water Tracker Card */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] left-10 w-16 h-4 rotate-[1.5deg] opacity-60 bg-blue-100"></div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-serif font-bold text-charcoal flex items-center gap-1.5">
                <span>Quick Hydration</span>
                <Droplet className="w-4 h-4 text-blue-400 fill-blue-50" />
              </h4>
              <span className="text-xs bg-blue-50 text-blue-500 font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
                {getWaterDisplayString(draftWater)} Met
              </span>
            </div>

            {/* Droplets list */}
            <div className="flex flex-wrap gap-3.5 justify-center py-2.5">
              {[...Array(6)].map((_, i) => {
                const filled = i < draftWater;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => isEditable && handleWaterBubbleClick(i)}
                    className={`text-3xl select-none focus:outline-hidden ${
                      isEditable ? 'hover:scale-120 active:scale-95 transition-transform cursor-pointer' : 'cursor-not-allowed opacity-60'
                    }`}
                  >
                    {filled ? '💧' : '🫧'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Workout Tracker Card */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] right-10 w-16 h-4 rotate-[-1deg] opacity-60 bg-sage/40"></div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-serif font-bold text-charcoal flex items-center gap-1.5">
                <span>Workout Logs</span>
                <Dumbbell className="w-4 h-4 text-sage" />
              </h4>
            </div>

            <button
              type="button"
              onClick={() => isEditable && handleWorkoutToggle()}
              className={`w-full py-4 px-5 rounded-2.5xl border transition-all text-left flex items-center justify-between ${
                !isEditable
                  ? 'bg-cream/40 border-beige/30 text-charcoal/40 cursor-not-allowed'
                  : draftWorkout.completed
                    ? 'bg-sage/25 border-sage text-charcoal shadow-2xs font-semibold'
                    : 'bg-white border-beige/40 text-charcoal/60 hover:border-sage/40'
                }`}
            >
              <div className="space-y-0.5">
                <div className="text-sm font-bold">
                  {draftWorkout.completed ? 'Workout Done! 🧘‍♀️' : 'No workout logged yet'}
                </div>
                <div className="text-[10px] opacity-75">
                  {draftWorkout.completed ? 'Click to undo and remove streak' : 'Click to complete today\'s routine'}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${draftWorkout.completed
                  ? 'bg-sage border-sage text-white'
                  : 'border-beige hover:border-sage bg-white'
                }`}>
                {draftWorkout.completed && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          </div>

          {/* Quick Meal Tracker Card */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-20 h-4 rotate-[1deg] opacity-60 bg-[#E8C08A]/30"></div>
            <h4 className="text-md font-serif font-bold text-charcoal flex items-center gap-1.5 mb-4">
              <span>Nutrition Intake</span>
              <ChefHat className="w-4 h-4 text-honey" />
            </h4>

            <div className="space-y-2.5">
              {[
                { key: 'breakfast', label: 'Breakfast Logged' },
                { key: 'lunch', label: 'Lunch Logged' },
                { key: 'snack', label: 'Snack Logged' },
                { key: 'dinner', label: 'Dinner Logged' }
              ].map((meal) => {
                const checked = draftMeals[meal.key];
                return (
                  <button
                    key={meal.key}
                    type="button"
                    onClick={() => isEditable && handleMealToggle(meal.key)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      !isEditable
                        ? 'bg-cream/40 border-beige/30 text-charcoal/40 cursor-not-allowed'
                        : checked
                          ? 'bg-[#E8C08A]/20 border-honey text-charcoal shadow-2xs font-medium'
                          : 'bg-white border-beige/30 text-charcoal/60 hover:border-honey/30'
                      }`}
                  >
                    <span className="text-xs font-semibold">{meal.label}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${checked
                        ? 'bg-honey border-honey text-white'
                        : 'border-beige hover:border-honey bg-white'
                      }`}>
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3 w-full">
            <button
              type="button"
              onClick={handleClearCheckIn}
              disabled={!isEditable}
              className={`flex-1 py-4 font-serif font-bold rounded-2.5xl flex items-center justify-center gap-2 border transition-all ${
                !isEditable
                  ? 'bg-cream text-charcoal/40 border-beige/40 cursor-not-allowed'
                  : 'bg-white hover:bg-cream text-charcoal border-beige/60 shadow-xs hover:shadow-sm transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <span>Clear Page ☁️</span>
            </button>
            <button
              type="submit"
              disabled={!isEditable}
              className={`flex-[2] py-4 font-serif font-bold rounded-2.5xl flex items-center justify-center gap-2 border transition-all ${
                !isEditable
                  ? 'bg-cream text-charcoal/40 border-beige/40 cursor-not-allowed'
                  : 'bg-rose hover:bg-[#E8C5C8]/90 text-charcoal border-rose/30 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <Save className="w-5 h-5" />
              <span>Save Daily Page 🌸</span>
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
