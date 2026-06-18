import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Check, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Heart, 
  Zap, 
  Activity,
  Maximize2
} from 'lucide-react';
import { baseWorkouts, postureRoutine, getScaledWorkout, getScaledExercise } from '../data/workoutData';

export default function Workouts({
  profile,
  setProfile,
  periods,
  setPeriods,
  simulatedDate,
  currentDayName,
  workoutLog,
  setWorkoutLog,
  isEditable
}) {
  // Navigation: state to track which day is currently being viewed/selected
  const [selectedDay, setSelectedDay] = useState(currentDayName);
  const [postureExpanded, setPostureExpanded] = useState(false);

  // Sync selectedDay with simulatedDate changes (so it defaults to today's schedule)
  useEffect(() => {
    setSelectedDay(currentDayName);
  }, [currentDayName, simulatedDate]);

  // Load scaled workout for the selected day based on user's current phase
  const scaledWorkout = getScaledWorkout(selectedDay, profile.phase);
  
  // Get workout data for the actual simulated day (to handle completed states)
  const simulatedWorkout = getScaledWorkout(currentDayName, profile.phase);
  const activeLog = workoutLog[simulatedDate] || { completed: false, completedExercises: {}, completedPosture: {} };
  const completedExercises = activeLog.completedExercises || {};
  const completedPosture = activeLog.completedPosture || {};

  // Check if the day being viewed matches the active simulated day
  const isActiveDay = selectedDay === currentDayName;

  // Calculate statistics for the active day's workout
  const totalExercisesCount = simulatedWorkout?.exercises?.length || 0;
  const completedCount = simulatedWorkout?.exercises?.filter(ex => completedExercises[ex.name]).length || 0;
  const progressPercent = totalExercisesCount > 0 ? Math.round((completedCount / totalExercisesCount) * 100) : 0;

  // Handle changing global phase
  const handlePhaseChange = (phaseNum) => {
    setProfile(prev => ({
      ...prev,
      phase: phaseNum
    }));
  };

  // Toggle individual exercise completion state
  const handleExerciseToggle = (exerciseName) => {
    if (!isActiveDay || !isEditable) return; // Only allow logging on the simulated today and when editable

    const updatedCompleted = { ...completedExercises };
    const wasChecked = !!updatedCompleted[exerciseName];

    if (wasChecked) {
      delete updatedCompleted[exerciseName];
    } else {
      updatedCompleted[exerciseName] = true;
    }

    // Determine if all active day exercises are complete
    const exerciseNames = simulatedWorkout?.exercises?.map(e => e.name) || [];
    const allDone = exerciseNames.length > 0 && exerciseNames.every(name => updatedCompleted[name]);

    const nextLog = {
      ...activeLog,
      completedExercises: updatedCompleted,
      completed: allDone
    };

    setWorkoutLog({
      ...workoutLog,
      [simulatedDate]: nextLog
    });

    // Handle streak update
    const wasWorkoutCompleted = activeLog.completed || false;
    if (allDone && !wasWorkoutCompleted) {
      setProfile(prev => ({ ...prev, workoutStreak: prev.workoutStreak + 1 }));
    } else if (!allDone && wasWorkoutCompleted) {
      setProfile(prev => ({ ...prev, workoutStreak: Math.max(0, prev.workoutStreak - 1) }));
    }
  };

  // Toggle individual posture exercise completion state
  const handlePostureToggle = (exerciseName) => {
    if (!isEditable) return;
    const updatedPosture = { ...completedPosture };
    const wasChecked = !!updatedPosture[exerciseName];

    if (wasChecked) {
      delete updatedPosture[exerciseName];
    } else {
      updatedPosture[exerciseName] = true;
    }

    setWorkoutLog({
      ...workoutLog,
      [simulatedDate]: {
        ...activeLog,
        completedPosture: updatedPosture
      }
    });
  };

  // Log entire workout done in one tap
  const handleToggleBulkComplete = () => {
    if (!isActiveDay || !isEditable) return;

    const wasCompleted = activeLog.completed || false;
    const nextCompleted = !wasCompleted;
    const updatedCompleted = { ...completedExercises };

    if (simulatedWorkout?.exercises) {
      simulatedWorkout.exercises.forEach(ex => {
        if (nextCompleted) {
          updatedCompleted[ex.name] = true;
        } else {
          delete updatedCompleted[ex.name];
        }
      });
    }

    setWorkoutLog({
      ...workoutLog,
      [simulatedDate]: {
        ...activeLog,
        completed: nextCompleted,
        completedExercises: updatedCompleted
      }
    });

    if (nextCompleted && !wasCompleted) {
      setProfile(prev => ({ ...prev, workoutStreak: prev.workoutStreak + 1 }));
    } else if (!nextCompleted && wasCompleted) {
      setProfile(prev => ({ ...prev, workoutStreak: Math.max(0, prev.workoutStreak - 1) }));
    }
  };

  // Group exercises into logical categories for clean layout rendering
  const getWorkoutSections = (day, exercises, postureExercises) => {
    if (!exercises) return [];

    if (day === 'Monday') {
      return [
        { name: "Main Workout 🦵", items: exercises.filter(ex => !ex.isWrist) },
        { name: "Wrist Training 💪", items: exercises.filter(ex => ex.isWrist) }
      ];
    }
    if (day === 'Tuesday') {
      return [
        { name: "Main Workout 💪", items: exercises },
        { name: "Posture Work 🧿", items: postureExercises || [] }
      ];
    }
    if (day === 'Thursday') {
      return [
        { name: "Main Workout 🦵", items: exercises.filter(ex => !ex.isWrist) },
        { name: "Wrist Training 💪", items: exercises.filter(ex => ex.isWrist) }
      ];
    }
    if (day === 'Saturday') {
      const chestNames = ["Incline Pushups", "Water Bottle Chest Press", "Chest Squeeze Hold"];
      const wristNames = ["Wrist Curls", "Reverse Wrist Curls", "Farmer Hold"];
      return [
        { name: "Chest Section 🤍", items: exercises.filter(ex => chestNames.includes(ex.name)) },
        { name: "Glute Section 🍑", items: exercises.filter(ex => !chestNames.includes(ex.name) && !ex.isWrist && !wristNames.includes(ex.name)) },
        { name: "Wrist Training 💪", items: exercises.filter(ex => ex.isWrist || wristNames.includes(ex.name)) }
      ];
    }
    if (day === 'Sunday') {
      return [
        { name: "Rest Day Options ☁️", items: exercises }
      ];
    }
    return [
      { name: "Main Workout ✨", items: exercises }
    ];
  };

  const workoutSections = getWorkoutSections(selectedDay, scaledWorkout?.exercises, scaledWorkout?.posture);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 select-none">
      
      {/* Top Banner and Cozy Intro */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1.5deg] opacity-75"></div>
        <div className="flex-1 space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose/15 text-charcoal text-xs font-semibold border border-rose/10">
            <Dumbbell className="w-3.5 h-3.5 text-rose" />
            <span>Cozy Fitness Planner 🤍</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
            Workout & Movement Space
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 font-sans max-w-xl">
            A quiet space to nourish your muscles and bones. Tweak your training phase, track today's workout progression, or complete a light posture stretch.
          </p>
        </div>
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-beige/40 shadow-xs flex-shrink-0">
          <img 
            src="/workout_aesthetic.png" 
            alt="Workout aesthetic watercolor" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Grid: Checklist Left, Phase & Posture Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side (2 cols): Weekly Nav + Checklist */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Navigation Tabs */}
          <div className="glass-card rounded-2xl p-4 relative">
            <div className="washi-tape absolute top-[-6px] left-12 w-16 h-4 rotate-[1deg] opacity-60"></div>
            <div className="flex flex-wrap gap-2 justify-between">
              {daysOfWeek.map((day) => {
                const isSelected = selectedDay === day;
                const isToday = currentDayName === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex-1 min-w-[70px] py-2.5 px-1 rounded-xl text-center flex flex-col items-center justify-center border transition-all ${
                      isSelected 
                        ? 'bg-rose/25 border-rose text-charcoal font-bold scale-102' 
                        : 'bg-white hover:bg-cream/40 border-beige/30 text-charcoal/80'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60">
                      {day.slice(0, 3)}
                    </span>
                    <span className="text-sm font-serif font-bold mt-0.5">
                      {day === 'Monday' && '🍑'}
                      {day === 'Tuesday' && '🤍'}
                      {day === 'Wednesday' && '❤️'}
                      {day === 'Thursday' && '🦵'}
                      {day === 'Friday' && '🏋'}
                      {day === 'Saturday' && '🧸'}
                      {day === 'Sunday' && '☁️'}
                    </span>
                    {isToday && (
                      <span className="text-[8px] bg-sage text-charcoal font-bold px-1.5 py-0.2 rounded-full mt-1.5 uppercase scale-90">
                        Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Workout Checklist */}
          <div className="glass-card rounded-3xl p-6 md:p-8 relative">
            
            {/* Binder loops decoration */}
            <div className="absolute left-[-10px] top-8 bottom-8 w-5 flex flex-col justify-between pointer-events-none z-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-2 rounded-full binder-ring opacity-80"></div>
              ))}
            </div>

            <div className="pl-4 space-y-6">
              
              {/* Day title & subtitle */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-beige/40 pb-4">
                <div>
                  <h3 className="text-2xl font-serif text-charcoal flex items-center gap-2">
                    <span>{scaledWorkout?.title}</span>
                  </h3>
                  <p className="text-xs text-charcoal/50 italic font-medium">{scaledWorkout?.subtitle}</p>
                </div>
                
                {/* Active Day Completion Stats */}
                {isActiveDay && totalExercisesCount > 0 && (
                  <div className="flex flex-col items-end text-xs">
                    <span className="font-semibold text-charcoal/70">
                      Progress: {completedCount} / {totalExercisesCount} Wins
                    </span>
                    <div className="w-40 bg-cream border border-beige/40 rounded-full h-2 mt-1.5 overflow-hidden">
                      <div 
                        className="bg-sage h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Render Exercise Categories */}
              {workoutSections.length > 0 ? (
                <div className="space-y-6">
                  {workoutSections.map((section) => (
                    <div key={section.name} className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 border-b border-beige/25 pb-1">
                        {section.name}
                      </h4>
                      
                      <div className="space-y-2.5">
                        {section.items.map((ex) => {
                          const isCompleted = !!completedExercises[ex.name];
                          
                          return (
                            <div
                              key={ex.name}
                              onClick={() => isActiveDay && isEditable && handleExerciseToggle(ex.name)}
                              className={`p-4 rounded-2xl border flex items-center justify-between transition-all select-none ${
                                !isActiveDay 
                                  ? 'bg-[#FAF8F5]/40 border-beige/20' 
                                  : !isEditable
                                    ? 'bg-[#FAF8F5]/30 border-beige/20 opacity-70 cursor-not-allowed'
                                    : isCompleted 
                                      ? 'bg-cream/40 border-beige/45 opacity-80 cursor-pointer' 
                                      : 'bg-white border-beige/30 hover:border-rose/30 shadow-2xs cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="space-y-0.5">
                                  <span className={`text-sm font-medium ${isCompleted ? 'line-through text-charcoal/50' : 'text-charcoal'}`}>
                                    {ex.name}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/40 bg-cream px-1.5 py-0.5 rounded-md border border-beige/20">
                                      {ex.target || 'Nourishment'}
                                    </span>
                                    {ex.extra && (
                                      <span className="text-[10px] text-charcoal/40 italic">
                                        ({ex.extra})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Exercise Metrics scaled */}
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  {ex.type === 'reps' && (
                                    <span className="text-xs font-semibold text-charcoal bg-rose/10 px-2.5 py-1 rounded-lg border border-rose/15 font-mono">
                                      {ex.sets}s × {ex.reps}r
                                    </span>
                                  )}
                                  {ex.type === 'hold' && (
                                    <span className="text-xs font-semibold text-charcoal bg-sage/20 px-2.5 py-1 rounded-lg border border-sage/35 font-mono">
                                      {ex.sets}s × {ex.hold}s hold
                                    </span>
                                  )}
                                  {ex.type === 'text' && (
                                    <span className="text-xs md:text-sm text-charcoal/70 text-right block leading-normal font-sans">
                                      {ex.content}
                                    </span>
                                  )}
                                </div>

                                {/* Checklist Checkbox (Only interactable on the simulated active day) */}
                                {ex.type !== 'text' && (
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                    isCompleted 
                                      ? 'bg-sage border-sage text-white' 
                                      : !isActiveDay
                                        ? 'border-beige/40 bg-cream/20'
                                        : 'border-beige hover:border-rose bg-white'
                                  }`}>
                                    {isCompleted && <Check className="w-3.5 h-3.5" />}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center font-cursive text-xl text-charcoal/40">
                  No exercise items for this day. Enjoy your rest! 🤍
                </div>
              )}

              {/* Day preview information banner */}
              {!isActiveDay ? (
                <div className="bg-cream/50 rounded-2xl p-4 border border-beige/45 flex items-center gap-3.5 text-xs text-charcoal/60 mt-4 select-none">
                  <span>ℹ️</span>
                  <p>
                    You are previewing **{selectedDay}'s** schedule. To check off items and log logs, please set the **Journal Date** at the top right to fall on a **{selectedDay}**.
                  </p>
                </div>
              ) : (
                /* Complete Active Workout Action Card */
                totalExercisesCount > 0 && (
                  <div className="pt-2 border-t border-beige/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-charcoal/50 italic">
                      Completing all exercises automatically updates your active day streak.
                    </p>
                    <button
                      type="button"
                      onClick={handleToggleBulkComplete}
                      disabled={!isEditable}
                      className={`w-full sm:w-auto py-3 px-6 rounded-2xl font-serif font-bold text-xs flex items-center justify-center gap-2 border shadow-xs transition-all ${
                        !isEditable
                          ? 'bg-cream text-charcoal/40 border-beige/40 cursor-not-allowed'
                          : activeLog.completed 
                            ? 'bg-white hover:bg-cream text-charcoal border-beige transform hover:-translate-y-0.5 active:translate-y-0' 
                            : 'bg-rose hover:bg-[#E8C5C8]/90 text-charcoal border-rose/30 shadow-md transform hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        {activeLog.completed ? 'Workout Logged Done! 🤍' : 'Complete All Exercises 🔥'}
                      </span>
                    </button>
                  </div>
                )
              )}

            </div>
          </div>
        </div>

        {/* Right Side (1 col): Phase selector & Posture Sticky Note */}
        <div className="space-y-6">
          
          {/* Phase Progression Card */}
          <div className="glass-card rounded-3xl p-6 relative">
            <div className="washi-tape absolute top-[-6px] left-8 w-16 h-4 rotate-[-1deg] opacity-60"></div>
            <h3 className="text-lg font-serif mb-1.5 flex items-center gap-2">
              <span>Progression Phase</span>
              <span className="text-sm">⚡</span>
            </h3>
            <p className="text-[11px] text-charcoal/50 leading-relaxed mb-4">
              Your workouts scale dynamically in sets, reps, and hold seconds to avoid muscle adaptation and foster healthy progression.
            </p>

            {/* Phase Tabs */}
            <div className="space-y-2">
              {[
                { phase: 1, title: "Phase 1: Foundation", desc: "Weeks 1–2 • 2 Sets • 8–12 Reps • 20s Holds", emoji: "🧸" },
                { phase: 2, title: "Phase 2: Building", desc: "Weeks 3–4 • 3 Sets • 10–15 Reps • 30s Holds", emoji: "⚡" },
                { phase: 3, title: "Phase 3: Growing", desc: "Weeks 5–8 • 3 Sets • 12–15 Reps • 45s Holds", emoji: "💪" }
              ].map((item) => {
                const isCurrent = profile.phase === item.phase;
                return (
                  <button
                    key={item.phase}
                    type="button"
                    onClick={() => handlePhaseChange(item.phase)}
                    className={`w-full text-left p-3.5 rounded-xl border flex flex-col transition-all ${
                      isCurrent 
                        ? 'bg-sage/20 border-sage text-charcoal shadow-2xs font-semibold' 
                        : 'bg-white border-beige/35 text-charcoal/70 hover:border-sage/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.emoji}</span>
                      <span className="text-xs font-bold">{item.title}</span>
                      {isCurrent && (
                        <span className="text-[9px] bg-sage text-charcoal font-bold px-1.5 py-0.2 rounded-full uppercase ml-auto">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-charcoal/50 leading-tight mt-1">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Posture Routine Sticky Note */}
          <div className="bg-buttercream/60 rounded-3xl p-6 border border-beige/45 shadow-xs relative hover:shadow-sm transition-all duration-300">
            <div className="washi-tape absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-20 h-5 rotate-[1.5deg] opacity-70 bg-rose/40"></div>
            
            <button
              type="button"
              onClick={() => setPostureExpanded(!postureExpanded)}
              className="w-full text-left focus:outline-hidden flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <h4 className="text-lg font-serif italic text-charcoal flex items-center gap-1.5">
                  <span>Posture Routine</span>
                  <span className="text-sm">🧿</span>
                </h4>
                <p className="text-[10px] text-charcoal/50">Quick 5–7 mins routine for laptop days</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center border border-beige/30">
                {postureExpanded ? <ChevronUp className="w-4 h-4 text-charcoal/70" /> : <ChevronDown className="w-4 h-4 text-charcoal/70" />}
              </div>
            </button>

            {/* Collapsible content area */}
            {postureExpanded && (
              <div className="mt-4 space-y-3 pt-3 border-t border-beige/35 transition-all">
                <div className="space-y-2">
                  {postureRoutine.exercises.map((item) => {
                    const scaled = getScaledExercise(item, profile.phase);
                    const isChecked = !!completedPosture[item.name];

                    return (
                      <div
                        key={item.name}
                        onClick={() => isEditable && handlePostureToggle(item.name)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                          !isEditable
                            ? 'bg-white/30 border-beige/20 text-charcoal/50 cursor-not-allowed select-none'
                            : 'bg-white/55 border-beige/25 hover:border-rose/20 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-medium">
                          <span className={`${isChecked ? 'line-through text-charcoal/50' : 'text-charcoal'}`}>
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-mono opacity-80 bg-cream/70 px-1.5 py-0.5 rounded-md font-semibold">
                            {scaled.type === 'reps' ? `${scaled.sets}x${scaled.reps}` : `${scaled.sets}x${scaled.hold}s`}
                          </span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                            isChecked 
                              ? 'bg-sage border-sage text-white' 
                              : 'border-beige bg-white'
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[9px] text-charcoal/40 italic leading-snug pt-1 text-center font-cursive">
                  * Helps combat screen slouching and realigns the spine 🤍
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
