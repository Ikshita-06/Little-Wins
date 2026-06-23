export const baseWorkouts = {
  Monday: { title: "Monday Workout", subtitle: "Focus area", exercises: [] },
  Tuesday: { title: "Tuesday Workout", subtitle: "Focus area", exercises: [] },
  Wednesday: { title: "Wednesday Workout", subtitle: "Focus area", exercises: [] },
  Thursday: { title: "Thursday Workout", subtitle: "Focus area", exercises: [] },
  Friday: { title: "Friday Workout", subtitle: "Focus area", exercises: [] },
  Saturday: { title: "Saturday Workout", subtitle: "Focus area", exercises: [] },
  Sunday: { title: "Rest Day ☁️", subtitle: "Take it easy & recover", exercises: [{ name: "Complete Rest", type: "text", content: "Let your muscles heal and rebuild!" }] }
};

export const postureRoutine = {
  title: "Aesthetic Posture Routine 🧿",
  subtitle: "Perfect for laptop-heavy days",
  exercises: []
};

export const getScaledExercise = (exercise, phase) => {
  return exercise;
};

export const getScaledWorkout = (day, phase) => {
  const dayData = baseWorkouts[day];
  if (!dayData) return null;
  return {
    ...dayData,
    exercises: dayData.exercises || [],
    posture: dayData.posture || null
  };
};
