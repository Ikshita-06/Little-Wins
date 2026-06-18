export const baseWorkouts = {
  Monday: {
    title: "Glute Foundation 🍑",
    subtitle: "Focus: Thighs, Glutes & Wrists",
    exercises: [
      { name: "Squat + 3 Pulses", type: "reps", baseSets: 2, baseReps: 12, target: "Glutes & Thighs" },
      { name: "Sumo Squat", type: "reps", baseSets: 2, baseReps: 12, target: "Inner Thighs & Glutes" },
      { name: "Glute Bridge", type: "reps", baseSets: 2, baseReps: 15, target: "Glutes" },
      { name: "Single Leg Bridge", type: "reps", baseSets: 2, baseReps: 8, extra: "each leg", target: "Glute Isolation" },
      { name: "Walkouts", type: "reps", baseSets: 2, baseReps: 8, target: "Hamstrings & Core" },
      { name: "Bridge Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Glute Endurance" },
      { name: "Wrist Rotations", type: "hold", baseSets: 2, baseHold: 20, isWrist: true, target: "Wrist Strength" },
      { name: "Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms" },
      { name: "Reverse Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms" }
    ]
  },
  Tuesday: {
    title: "Upper Body + Posture 🤍",
    subtitle: "Focus: Back, Shoulders & Alignment",
    exercises: [
      { name: "Knee Pushups", type: "reps", baseSets: 2, baseReps: 8, target: "Chest & Arms" },
      { name: "Superman", type: "reps", baseSets: 2, baseReps: 12, target: "Lower Back & Posture" },
      { name: "Superman Reach", type: "reps", baseSets: 2, baseReps: 10, target: "Upper Back" },
      { name: "Back Squeezes", type: "reps", baseSets: 2, baseReps: 15, target: "Shoulder Blades" },
      { name: "Dolphin Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Shoulder Stability" },
      { name: "Bird Dogs", type: "reps", baseSets: 2, baseReps: 8, extra: "each side", target: "Core & Posture" }
    ],
    posture: [
      { name: "Cat Cow", type: "reps", baseSets: 2, baseReps: 10, target: "Spine Mobility" },
      { name: "Cobra Stretch", type: "hold", baseSets: 2, baseHold: 20, target: "Abdominal & Back Stretch" }
    ]
  },
  Wednesday: {
    title: "Core Day ❤️",
    subtitle: "Focus: Deep Core & Abdominals",
    exercises: [
      { name: "Crunches", type: "reps", baseSets: 2, baseReps: 15, target: "Upper Abs" },
      { name: "Heel Touches", type: "reps", baseSets: 2, baseReps: 20, target: "Obliques" },
      { name: "Russian Twists", type: "reps", baseSets: 2, baseReps: 20, target: "Side Abs & Waist" },
      { name: "Bicycle Crunches", type: "reps", baseSets: 2, baseReps: 20, target: "Full Core" },
      { name: "Slow Mountain Climbers", type: "reps", baseSets: 2, baseReps: 20, target: "Deep Core" },
      { name: "Plank", type: "hold", baseSets: 2, baseHold: 20, target: "Isometric Core Strength" }
    ]
  },
  Thursday: {
    title: "Leg Growth 🦵",
    subtitle: "Focus: Thighs, Glutes & Forearms",
    exercises: [
      { name: "Pulse Lunges", type: "reps", baseSets: 2, baseReps: 10, extra: "each leg", target: "Thighs & Glutes" },
      { name: "Sumo Squat Calf Raise", type: "reps", baseSets: 2, baseReps: 12, target: "Inner Thighs & Calves" },
      { name: "Outer Thigh Lift", type: "reps", baseSets: 2, baseReps: 12, extra: "each leg", target: "Side Hips & Glutes" },
      { name: "Side Plank Leg Lift", type: "reps", baseSets: 2, baseReps: 8, extra: "each leg", target: "Core & Hips" },
      { name: "Bulgarian Split Squat", type: "reps", baseSets: 2, baseReps: 8, extra: "each leg", target: "Glute Depth" },
      { name: "Glute Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Glute Activation" },
      { name: "Wrist Rotations", type: "hold", baseSets: 2, baseHold: 20, isWrist: true, target: "Wrist Strength" },
      { name: "Farmer Hold", type: "hold", baseSets: 2, baseHold: 30, isWrist: true, target: "Grip & Forearms" }
    ]
  },
  Friday: {
    title: "Full Body 🏋",
    subtitle: "Focus: Active Recovery & Tone",
    exercises: [
      { name: "Walk Down Plank", type: "reps", baseSets: 2, baseReps: 8, target: "Total Body Strength" },
      { name: "Squat", type: "reps", baseSets: 2, baseReps: 15, target: "Legs & Glutes" },
      { name: "Curtsy Lunges", type: "reps", baseSets: 2, baseReps: 10, extra: "each leg", target: "Side Hips" },
      { name: "Bicycle Crunches", type: "reps", baseSets: 2, baseReps: 20, target: "Core" },
      { name: "Superman", type: "reps", baseSets: 2, baseReps: 12, target: "Back Strength" },
      { name: "Plank", type: "hold", baseSets: 2, baseHold: 30, target: "Core Endurance" }
    ]
  },
  Saturday: {
    title: "Chest + Glute Sculpt 🤍",
    subtitle: "Focus: Chest Tone, Glute Isolation & Wrists",
    exercises: [
      { name: "Incline Pushups", type: "reps", baseSets: 2, baseReps: 8, target: "Upper Chest" },
      { name: "Water Bottle Chest Press", type: "reps", baseSets: 2, baseReps: 12, target: "Pectorals & Arms" },
      { name: "Chest Squeeze Hold", type: "hold", baseSets: 2, baseHold: 20, target: "Chest Firming" },
      { name: "Donkey Kicks", type: "reps", baseSets: 2, baseReps: 12, extra: "each leg", target: "Glute Focus" },
      { name: "Fire Hydrants", type: "reps", baseSets: 2, baseReps: 12, extra: "each leg", target: "Outer Glutes & Hips" },
      { name: "Frog Pumps", type: "reps", baseSets: 2, baseReps: 20, target: "Glute Burnout" },
      { name: "Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms" },
      { name: "Reverse Wrist Curls", type: "reps", baseSets: 2, baseReps: 15, isWrist: true, target: "Forearms" },
      { name: "Farmer Hold", type: "hold", baseSets: 2, baseHold: 30, isWrist: true, target: "Grip & Wrist" }
    ]
  },
  Sunday: {
    title: "Rest Day ☁️",
    subtitle: "Take it easy & recover",
    exercises: [
      { name: "Complete Rest", type: "text", content: "Let your muscles heal and rebuild!" },
      { name: "Optional Walk", type: "text", content: "A nice, slow 30-60 minute walk in nature." },
      { name: "Light Stretching", type: "text", content: "Gently stretch your glutes, back, and wrists." }
    ]
  }
};

export const postureRoutine = {
  title: "Aesthetic Posture Routine 🧿",
  subtitle: "Perfect for laptop-heavy days (5-7 Minutes)",
  exercises: [
    { name: "Bird Dogs", type: "reps", baseSets: 2, baseReps: 8, extra: "each side" },
    { name: "Superman", type: "reps", baseSets: 2, baseReps: 12 },
    { name: "Back Squeezes", type: "reps", baseSets: 2, baseReps: 15 },
    { name: "Cat Cow", type: "reps", baseSets: 2, baseReps: 10 },
    { name: "Cobra Stretch", type: "hold", baseSets: 2, baseHold: 20 }
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
    return { ...exercise, sets, reps, hold };
  }

  // Phase 2 (Weeks 3-4): 3 Sets, 10-15 Reps, 30-40s Holds
  if (phase === 2) {
    sets = 3;
    if (reps) {
      reps = Math.min(15, reps + 2);
      if (exercise.baseReps === 8) reps = 10;
    }
    if (hold) {
      hold = hold + 10;
    }
  }

  // Phase 3 (Weeks 5-8): 3 Sets, 12-15 Reps, 45s Holds
  if (phase === 3) {
    sets = 3;
    if (reps) {
      reps = Math.min(15, reps + 4);
      if (exercise.baseReps === 8) reps = 12;
    }
    if (hold) {
      hold = 45;
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

  const scaledExercises = dayData.exercises.map(ex => getScaledExercise(ex, phase));
  const scaledPosture = dayData.posture ? dayData.posture.map(ex => getScaledExercise(ex, phase)) : null;

  return {
    ...dayData,
    exercises: scaledExercises,
    posture: scaledPosture
  };
};
