import React, { useState, useEffect } from 'react';
import { Check, Settings, Sparkles, Edit3 } from 'lucide-react';

function ProgressCircle({ value, target, colorClass, strokeColor, unit, label }) {
  const percentage = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-cream/40 border border-beige/35 rounded-2xl relative select-none flex-1 min-w-[140px]">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-beige/20"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            className={`transition-all duration-500 ease-out`}
            stroke={strokeColor}
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-bold font-serif text-charcoal">{value}</span>
          <span className="text-[10px] text-charcoal/50 font-medium">/ {target} {unit}</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">{label}</span>
        <span className="text-[10px] block text-rose font-semibold mt-0.5">{percentage}% Met</span>
      </div>
    </div>
  );
}

export default function Nutrition({
  profile,
  setProfile,
  simulatedDate,
  nutritionLog,
  setNutritionLog,
  isEditable
}) {
  const targetCalories = profile.targetCalories || 1900;
  const targetProtein = profile.targetProtein || 60;

  const [showSettings, setShowSettings] = useState(false);
  const [tempCalories, setTempCalories] = useState(targetCalories);
  const [tempProtein, setTempProtein] = useState(targetProtein);

  // Sync state with selectedDate change
  const activeLog = nutritionLog[simulatedDate] || {
    breakfast: false,
    breakfastCalories: 0,
    breakfastProtein: 0,
    lunch: false,
    lunchCalories: 0,
    lunchProtein: 0,
    snack: false,
    snackCalories: 0,
    snackProtein: 0,
    dinner: false,
    dinnerCalories: 0,
    dinnerProtein: 0,
    notes: ""
  };

  useEffect(() => {
    setTempCalories(targetCalories);
    setTempProtein(targetProtein);
  }, [targetCalories, targetProtein]);

  const updateLogField = (field, value) => {
    if (!isEditable) return;
    const dayLog = nutritionLog[simulatedDate] || {
      breakfast: false,
      breakfastCalories: 0,
      breakfastProtein: 0,
      lunch: false,
      lunchCalories: 0,
      lunchProtein: 0,
      snack: false,
      snackCalories: 0,
      snackProtein: 0,
      dinner: false,
      dinnerCalories: 0,
      dinnerProtein: 0,
      notes: ""
    };

    const updatedLog = {
      ...dayLog,
      [field]: value
    };

    // Auto-check/uncheck based on inputs if toggling number fields
    if (field === 'breakfastCalories' || field === 'breakfastProtein') {
      const c = field === 'breakfastCalories' ? Number(value) : Number(dayLog.breakfastCalories);
      const p = field === 'breakfastProtein' ? Number(value) : Number(dayLog.breakfastProtein);
      updatedLog.breakfast = c > 0 || p > 0;
    }
    if (field === 'lunchCalories' || field === 'lunchProtein') {
      const c = field === 'lunchCalories' ? Number(value) : Number(dayLog.lunchCalories);
      const p = field === 'lunchProtein' ? Number(value) : Number(dayLog.lunchProtein);
      updatedLog.lunch = c > 0 || p > 0;
    }
    if (field === 'snackCalories' || field === 'snackProtein') {
      const c = field === 'snackCalories' ? Number(value) : Number(dayLog.snackCalories);
      const p = field === 'snackProtein' ? Number(value) : Number(dayLog.snackProtein);
      updatedLog.snack = c > 0 || p > 0;
    }
    if (field === 'dinnerCalories' || field === 'dinnerProtein') {
      const c = field === 'dinnerCalories' ? Number(value) : Number(dayLog.dinnerCalories);
      const p = field === 'dinnerProtein' ? Number(value) : Number(dayLog.dinnerProtein);
      updatedLog.dinner = c > 0 || p > 0;
    }

    setNutritionLog({
      ...nutritionLog,
      [simulatedDate]: updatedLog
    });
  };

  const handleToggleMeal = (mealKey) => {
    if (!isEditable) return;
    const dayLog = nutritionLog[simulatedDate] || {
      breakfast: false,
      breakfastCalories: 0,
      breakfastProtein: 0,
      lunch: false,
      lunchCalories: 0,
      lunchProtein: 0,
      snack: false,
      snackCalories: 0,
      snackProtein: 0,
      dinner: false,
      dinnerCalories: 0,
      dinnerProtein: 0,
      notes: ""
    };

    const nextState = !dayLog[mealKey];
    const updatedLog = {
      ...dayLog,
      [mealKey]: nextState
    };

    // If unchecking, keep values but exclude them from active calculations by state rules
    // If checking and values are empty/0, let them type
    setNutritionLog({
      ...nutritionLog,
      [simulatedDate]: updatedLog
    });
  };

  const saveTargets = (e) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      targetCalories: Number(tempCalories) || 1900,
      targetProtein: Number(tempProtein) || 60
    }));
    setShowSettings(false);
  };

  const currentCalories = 
    (activeLog.breakfast ? Number(activeLog.breakfastCalories || 0) : 0) +
    (activeLog.lunch ? Number(activeLog.lunchCalories || 0) : 0) +
    (activeLog.snack ? Number(activeLog.snackCalories || 0) : 0) +
    (activeLog.dinner ? Number(activeLog.dinnerCalories || 0) : 0);

  const currentProtein = 
    (activeLog.breakfast ? Number(activeLog.breakfastProtein || 0) : 0) +
    (activeLog.lunch ? Number(activeLog.lunchProtein || 0) : 0) +
    (activeLog.snack ? Number(activeLog.snackProtein || 0) : 0) +
    (activeLog.dinner ? Number(activeLog.dinnerProtein || 0) : 0);

  const isCalorieGoalMet = currentCalories >= targetCalories;
  const isProteinGoalMet = currentProtein >= targetProtein;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 select-none">
      
      {/* Top Banner and Cozy Intro */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1.5deg] opacity-75"></div>
        <div className="flex-1 space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose/15 text-charcoal text-xs font-semibold border border-rose/10">
            <Sparkles className="w-3.5 h-3.5 text-rose animate-sparkle" />
            <span>Cozy Nutrition Space</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
            Nourishment & Meal Log
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 font-sans max-w-xl">
            A gentle workspace to log your meals, track protein intake, and customize daily calorie goals without pressure.
          </p>
        </div>
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-beige/40 shadow-xs flex-shrink-0">
          <img 
            src="/nutrition_aesthetic.png" 
            alt="Nutrition aesthetic watercolor" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=60";
            }}
          />
        </div>
      </div>

      {/* Progress Circles Dashboard */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative">
        <div className="washi-tape absolute top-[-6px] left-12 w-16 h-4 rotate-[1.5deg] opacity-60"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6 justify-center w-full md:w-auto flex-1">
            <ProgressCircle 
              value={currentCalories} 
              target={targetCalories} 
              strokeColor="#E8C5C8" 
              unit="kcal" 
              label="Calories Consumed" 
            />
            <ProgressCircle 
              value={currentProtein} 
              target={targetProtein} 
              strokeColor="#B5C9C0" 
              unit="g" 
              label="Protein Goal" 
            />
          </div>

          <div className="text-center md:text-right space-y-2 max-w-xs">
            <h3 className="text-lg font-serif text-charcoal">Daily Target Goals</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Consistently nourishing your body with balanced portions helps you feel energetic and strong.
            </p>
            <div className="pt-2 flex justify-center md:justify-end gap-2">
              {isCalorieGoalMet && isProteinGoalMet && (
                <span className="text-xs bg-rose/25 text-charcoal px-2.5 py-1 rounded-full font-semibold">
                  All Goals Met! 🎉
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs bg-cream hover:bg-beige/25 border border-beige text-charcoal/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Adjust Targets</span>
              </button>
            </div>
          </div>
        </div>

        {/* Targets Adjustment Inline Form */}
        {showSettings && (
          <form onSubmit={saveTargets} className="mt-6 p-5 border border-beige/40 bg-cream/35 rounded-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal/70">Daily Calorie Target (kcal)</label>
                <input
                  type="number"
                  value={tempCalories}
                  onChange={(e) => setTempCalories(e.target.value)}
                  className="w-full bg-white border border-beige/65 rounded-xl px-3 py-2 text-sm text-charcoal focus:border-rose outline-hidden font-mono"
                  min="500"
                  max="5000"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal/70">Daily Protein Target (g)</label>
                <input
                  type="number"
                  value={tempProtein}
                  onChange={(e) => setTempProtein(e.target.value)}
                  className="w-full bg-white border border-beige/65 rounded-xl px-3 py-2 text-sm text-charcoal focus:border-rose outline-hidden font-mono"
                  min="10"
                  max="300"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-xs bg-white text-charcoal/60 px-4 py-2 rounded-xl border border-beige/40"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs bg-rose hover:bg-rose/90 text-charcoal font-semibold px-4 py-2 rounded-xl border border-rose/30"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Meal Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-6 md:p-8 relative">
            {/* Binder decoration */}
            <div className="absolute left-[-10px] top-8 bottom-8 w-5 flex flex-col justify-between pointer-events-none z-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-2 rounded-full binder-ring opacity-80"></div>
              ))}
            </div>

            <div className="pl-4 space-y-6">
              <div className="border-b border-beige/40 pb-3">
                <h3 className="text-xl font-serif text-charcoal">Log Your Daily Intake</h3>
                <p className="text-xs text-charcoal/50 italic">Entering values automatically marks the meal as logged.</p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'breakfast', label: 'Breakfast', icon: '🥐' },
                  { key: 'lunch', label: 'Lunch', icon: '🥗' },
                  { key: 'snack', label: 'Snack / Tea', icon: '🍵' },
                  { key: 'dinner', label: 'Dinner', icon: '🍲' }
                ].map((meal) => {
                  const isChecked = !!activeLog[meal.key];
                  const caloriesValue = activeLog[`${meal.key}Calories`] || '';
                  const proteinValue = activeLog[`${meal.key}Protein`] || '';

                  return (
                    <div
                      key={meal.key}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isChecked 
                          ? 'bg-cream/40 border-beige/45' 
                          : 'bg-white border-beige/30 hover:border-rose/30 shadow-2xs'
                      }`}
                    >
                      {/* Left: Check & Label */}
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => isEditable && handleToggleMeal(meal.key)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isChecked 
                              ? 'bg-sage border-sage text-white' 
                              : !isEditable
                                ? 'border-beige/40 bg-cream/10 cursor-not-allowed'
                                : 'border-beige hover:border-rose bg-white cursor-pointer'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-base font-medium text-charcoal flex items-center gap-2">
                          <span className="text-lg">{meal.icon}</span>
                          <span>{meal.label}</span>
                        </span>
                      </div>

                      {/* Right: Inputs */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                          <input
                            type="number"
                            placeholder="0"
                            value={caloriesValue}
                            onChange={(e) => updateLogField(`${meal.key}Calories`, e.target.value)}
                            disabled={!isEditable}
                            className={`w-16 sm:w-20 border rounded-lg px-2 py-1 text-xs text-charcoal text-center outline-hidden font-mono ${
                              !isEditable 
                                ? 'bg-cream/40 border-beige/30 text-charcoal/40 cursor-not-allowed' 
                                : 'bg-white border-beige/65 focus:border-rose'
                            }`}
                            min="0"
                          />
                          <span className="text-[10px] text-charcoal/50 font-medium">kcal</span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                          <input
                            type="number"
                            placeholder="0"
                            value={proteinValue}
                            onChange={(e) => updateLogField(`${meal.key}Protein`, e.target.value)}
                            disabled={!isEditable}
                            className={`w-16 sm:w-20 border rounded-lg px-2 py-1 text-xs text-charcoal text-center outline-hidden font-mono ${
                              !isEditable 
                                ? 'bg-cream/40 border-beige/30 text-charcoal/40 cursor-not-allowed' 
                                : 'bg-white border-beige/65 focus:border-rose'
                            }`}
                            min="0"
                          />
                          <span className="text-[10px] text-charcoal/50 font-medium">g protein</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Notes */}
        <div className="space-y-6">
          
          {/* Notes Sticky Note Pad */}
          <div className="bg-rose/30 rounded-3xl p-6 border border-rose/25 shadow-xs relative flex flex-col justify-between hover:shadow-sm transition-all duration-300">
            <div className="washi-tape absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-20 h-5 rotate-[1.2deg] opacity-70 bg-rose/40"></div>
            
            <div className="space-y-3">
              <h4 className="text-lg font-serif italic text-charcoal flex items-center gap-1.5">
                <span>Daily Food Thoughts</span>
                <Edit3 className="w-3.5 h-3.5 text-charcoal/60" />
              </h4>
              <textarea
                value={activeLog.notes || ''}
                onChange={(e) => updateLogField('notes', e.target.value)}
                disabled={!isEditable}
                placeholder={isEditable ? "How did you feel after eating? Any cravings, recipes, or simple self-love thoughts..." : "No food diary notes were recorded."}
                className={`w-full bg-transparent border-0 outline-hidden font-cursive text-[18px] text-charcoal/85 leading-relaxed resize-none min-h-[160px] placeholder-charcoal/40 ${
                  !isEditable ? 'cursor-not-allowed text-charcoal/60' : ''
                }`}
              />
            </div>

            <div className="font-cursive text-right text-xs text-charcoal/50 mt-4 select-none">
              ~ your nourishment diary
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
