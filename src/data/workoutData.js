export const baseWorkouts = {
  Monday: {
    title: "Glute Foundation 🍑",
    subtitle: "Focus: Thighs, Glutes & Wrists",
    exercises: [
      { name: "Squat + 3 Pulses", type: "reps", baseSets: 2, baseReps: 12, target: "Glutes & Thighs", emoji: "🍑" },
      { name: "Sumo Squat", type: "reps", baseSets: 2, baseReps: 12, target: "Inner Thighs & Glutes", emoji: "🧘‍♀️" },
      { name: "Glute Bridge", type: "reps", baseSets: 2, baseReps: 15, target: "Glutes", emoji: "🍑" },
      { name: "Single Leg Bridge", type: "reps", baseSets: 2, baseReps: 8, extra: "each leg", target: "Glute Isolation", emoji: "🦵" },
      { name: "Walkouts", type: "reps", baseSets: 2, baseReps: 8, target: "Hamstrings & Core", emoji: "🚶‍♀️" },
      { name: "Bridge Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Glute Endurance", emoji: "⏳" },
      { name: "Wrist Rotations", type: "hold", baseSets: 2, baseHold: 20, isWrist: true, target: "Wrist Strength", emoji: "⌚" },
      { name: "Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms", emoji: "💪" },
      { name: "Reverse Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms", emoji: "💪" }
    ]
  },
  Tuesday: {
    title: "Upper Body + Posture 🌸",
    subtitle: "Focus: Back, Shoulders & Alignment",
    exercises: [
      { name: "Knee Pushups", type: "reps", baseSets: 2, baseReps: 8, target: "Chest & Arms", emoji: "💪" },
      { name: "Superman", type: "reps", baseSets: 2, baseReps: 12, target: "Lower Back & Posture", emoji: "🦸‍♀️" },
      { name: "Superman Reach", type: "reps", baseSets: 2, baseReps: 10, target: "Upper Back", emoji: "✨" },
      { name: "Back Squeezes", type: "reps", baseSets: 2, baseReps: 15, target: "Shoulder Blades", emoji: "📐" },
      { name: "Dolphin Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Shoulder Stability", emoji: "🐬" },
      { name: "Bird Dogs", type: "reps", baseSets: 2, baseReps: 8, extra: "each side", target: "Core & Posture", emoji: "🐕" },
      { name: "Cat Cow", type: "reps", baseSets: 2, baseReps: 10, target: "Spine Mobility", emoji: "🐱" },
      { name: "Cobra Stretch", type: "hold", baseSets: 2, baseHold: 20, target: "Abdominal & Back Stretch", emoji: "🐍" }
    ]
  },
  Wednesday: {
    title: "Core Day ☁️",
    subtitle: "Focus: Deep Core & Abdominals",
    exercises: [
      { name: "Crunches", type: "reps", baseSets: 2, baseReps: 15, target: "Upper Abs", emoji: "🥣" },
      { name: "Heel Touches", type: "reps", baseSets: 2, baseReps: 20, target: "Obliques", emoji: "🦶" },
      { name: "Russian Twists", type: "reps", baseSets: 2, baseReps: 20, target: "Side Abs & Waist", emoji: "🌪️" },
      { name: "Bicycle Crunches", type: "reps", baseSets: 2, baseReps: 20, target: "Full Core", emoji: "🚲" },
      { name: "Slow Mountain Climbers", type: "reps", baseSets: 2, baseReps: 20, target: "Deep Core", emoji: "🏔️" },
      { name: "Plank", type: "hold", baseSets: 2, baseHold: 20, target: "Isometric Core Strength", emoji: "🧱" }
    ]
  },
  Thursday: {
    title: "Leg Growth 🌷",
    subtitle: "Focus: Thighs, Glutes & Forearms",
    exercises: [
      { name: "Pulse Lunges", type: "reps", baseSets: 2, baseReps: 10, extra: "each leg", target: "Thighs & Glutes", emoji: "🦵" },
      { name: "Sumo Squat Calf Raise", type: "reps", baseSets: 2, baseReps: 12, target: "Inner Thighs & Calves", emoji: "🩰" },
      { name: "Outer Thigh Lift", type: "reps", baseSets: 2, baseReps: 12, extra: "each leg", target: "Side Hips & Glutes", emoji: "🧜‍♀️" },
      { name: "Side Plank Leg Lift", type: "reps", baseSets: 2, baseReps: 8, extra: "each leg", target: "Core & Hips", emoji: "🧱" },
      { name: "Bulgarian Split Squat", type: "reps", baseSets: 2, baseReps: 8, extra: "each leg", target: "Glute Depth", emoji: "🍑" },
      { name: "Glute Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Glute Activation", emoji: "⏳" },
      { name: "Wrist Rotations", type: "hold", baseSets: 2, baseHold: 20, isWrist: true, target: "Wrist Strength", emoji: "⌚" },
      { name: "Farmer Hold", type: "hold", baseSets: 2, baseHold: 30, isWrist: true, target: "Grip & Forearms", emoji: "👜" }
    ]
  },
  Friday: {
    title: "Full Body 🫧",
    subtitle: "Focus: Active Recovery & Tone",
    exercises: [
      { name: "Walk Down Plank", type: "reps", baseSets: 2, baseReps: 8, target: "Total Body Strength", emoji: "🪜" },
      { name: "Squat", type: "reps", baseSets: 2, baseReps: 15, target: "Legs & Glutes", emoji: "🧘‍♀️" },
      { name: "Curtsy Lunges", type: "reps", baseSets: 2, baseReps: 10, extra: "each leg", target: "Side Hips", emoji: "🎀" },
      { name: "Bicycle Crunches", type: "reps", baseSets: 2, baseReps: 20, target: "Core", emoji: "🚲" },
      { name: "Superman", type: "reps", baseSets: 2, baseReps: 12, target: "Back Strength", emoji: "🦸‍♀️" },
      { name: "Plank", type: "hold", baseSets: 2, baseHold: 30, target: "Core Endurance", emoji: "🧱" }
    ]
  },
  Saturday: {
    title: "Chest + Glute Sculpt 🧸",
    subtitle: "Focus: Chest Tone, Glute Isolation & Wrists",
    exercises: [
      { name: "Incline Pushups", type: "reps", baseSets: 2, baseReps: 8, target: "Upper Chest", emoji: "🪜" },
      { name: "Water Bottle Chest Press", type: "reps", baseSets: 2, baseReps: 12, target: "Pectorals & Arms", emoji: "🍼" },
      { name: "Chest Squeeze Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Chest Firming", emoji: "🧸" },
      { name: "Donkey Kicks", type: "reps", baseSets: 2, baseReps: 12, extra: "each leg", target: "Glute Focus", emoji: "🦄" },
      { name: "Fire Hydrants", type: "reps", baseSets: 2, baseReps: 12, extra: "each leg", target: "Outer Glutes & Hips", emoji: "🔥" },
      { name: "Frog Pumps", type: "reps", baseSets: 2, baseReps: 20, target: "Glute Burnout", emoji: "🐸" },
      { name: "Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms", emoji: "💪" },
      { name: "Reverse Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms", emoji: "💪" },
      { name: "Farmer Hold", type: "hold", baseSets: 2, baseHold: 30, isWrist: true, target: "Grip & Wrist", emoji: "👜" }
    ]
  },
  Sunday: {
    title: "Rest Day 💃",
    subtitle: "Take it easy & recover",
    exercises: [
      { name: "Complete Rest", type: "text", content: "Let your muscles heal and rebuild! 🤍", emoji: "🧸" },
      { name: "Optional Walk", type: "text", content: "A nice, slow 30-60 minute walk in nature. 🚶‍♀️", emoji: "🌲" },
      { name: "Light Stretching", type: "text", content: "Gently stretch your glutes, back, and wrists. 🧘‍♀️", emoji: "🫧" }
    ]
  }
};

export const postureRoutine = {
  title: "Aesthetic Posture Routine 📐",
  subtitle: "Perfect for laptop-heavy days (5-7 Minutes)",
  exercises: [
    { name: "Bird Dogs", type: "reps", baseSets: 2, baseReps: 8, extra: "each side", emoji: "🐕" },
    { name: "Superman", type: "reps", baseSets: 2, baseReps: 12, emoji: "🦸‍♀️" },
    { name: "Back Squeezes", type: "reps", baseSets: 2, baseReps: 15, emoji: "📐" },
    { name: "Cat Cow", type: "reps", baseSets: 2, baseReps: 10, emoji: "🐱" },
    { name: "Cobra Stretch", type: "hold", baseSets: 2, baseHold: 20, emoji: "🐍" }
  ]
};

// Scale sets, reps, and hold seconds depending on Phase (1, 2, or 3)
export const getScaledExercise = (exercise, phase) => {
  if (exercise.type === "text") return exercise;

  let sets = exercise.baseSets;
  let reps = exercise.baseReps;
  let hold = exercise.baseHold;

  // Phase 1 (Weeks 1-2): 2 Sets, Base Reps, Base Holds (20-30s)
  if (phase === 1) {
    // Keep base values
    return { ...exercise, sets, reps, hold };
  }

  // Phase 2 (Weeks 3-4): 3 Sets, 10-15 Reps, 30-40s Holds
  if (phase === 2) {
    sets = 3;
    if (reps) {
      // Scale reps: usually +2 or +3 reps
      reps = Math.min(15, reps + 2);
      // For Single Leg Bridges, Side Plank Leg Lifts, Bulgarian Splits, 8 reps -> 10 reps
      if (exercise.baseReps === 8) reps = 10;
    }
    if (hold) {
      // Scale holds: usually +10 seconds
      hold = hold + 10;
    }
  }

  // Phase 3 (Weeks 5-8): 3 Sets, 12-15 Reps, 45s Holds
  if (phase === 3) {
    sets = 3;
    if (reps) {
      reps = Math.min(15, reps + 4);
      if (exercise.baseReps === 8) reps = 12; // Scale 8 -> 12
    }
    if (hold) {
      hold = 45; // Sets holds to 45 seconds
    }
  }

  return {
    ...exercise,
    sets,
    reps,
    hold
  };
};

export const getScaledWorkout = (day, phase) => {
  const dayData = baseWorkouts[day];
  if (!dayData) return null;

  return {
    ...dayData,
    exercises: dayData.exercises.map(ex => getScaledExercise(ex, phase))
  };
};
