import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Auto-create configuration files from templates if they don't exist
const dataFiles = ['personalInfo', 'workoutData', 'foodDatabase']
dataFiles.forEach(file => {
  const templatePath = path.resolve(__dirname, `src/data/${file}.template.js`)
  const targetPath = path.resolve(__dirname, `src/data/${file}.js`)
  if (!fs.existsSync(targetPath)) {
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, targetPath)
    } else {
      if (file === 'personalInfo') {
        fs.writeFileSync(targetPath, `export const personalInfo = {
  age: null,
  height: "",
  startingWeight: null,
  weight: null,
  goalWeight: null,
  targetCalories: 1900,
  targetProtein: 60,
  measurements: []
};
`)
      } else if (file === 'workoutData') {
        fs.writeFileSync(targetPath, `export const baseWorkouts = {
  Monday: { title: "Monday Workout", subtitle: "", exercises: [] },
  Tuesday: { title: "Tuesday Workout", subtitle: "", exercises: [] },
  Wednesday: { title: "Wednesday Workout", subtitle: "", exercises: [] },
  Thursday: { title: "Thursday Workout", subtitle: "", exercises: [] },
  Friday: { title: "Friday Workout", subtitle: "", exercises: [] },
  Saturday: { title: "Saturday Workout", subtitle: "", exercises: [] },
  Sunday: { title: "Rest Day", subtitle: "", exercises: [{ name: "Complete Rest", type: "text", content: "Rest!" }] }
};
export const postureRoutine = { title: "Posture Routine", subtitle: "", exercises: [] };
export const getScaledExercise = (e) => e;
export const getScaledWorkout = (d) => baseWorkouts[d];
`)
      } else if (file === 'foodDatabase') {
        fs.writeFileSync(targetPath, `export const foodDatabase = [];\n`)
      }
    }
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
    strictPort: true,
    host: true
  }
})

