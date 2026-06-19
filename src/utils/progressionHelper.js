// Helper to get week dates range ending on a given Sunday
export const getWeekDates = (sundayDateStr) => {
  const dates = [];
  const sunday = new Date(sundayDateStr + 'T00:00:00');
  
  // Calculate Monday to Sunday dates (6 days before Sunday to Sunday itself)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
  }
  return dates; // [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
};

// Calculate all metrics for the week ending on Sunday
export const calculateWeeklyMetrics = ({
  sundayDateStr,
  workoutLog,
  waterLog,
  nutritionLog,
  dailyCheckIns,
  measurementsLog,
  profile
}) => {
  const weekDates = getWeekDates(sundayDateStr);
  const activeWorkoutsDates = weekDates.slice(0, 6); // Monday to Saturday

  // 1. Workout Completion Rate (Mon-Sat)
  let completedWorkouts = 0;
  activeWorkoutsDates.forEach(dateStr => {
    if (workoutLog[dateStr] && workoutLog[dateStr].completed) {
      completedWorkouts++;
    }
  });
  const completionRate = Math.round((completedWorkouts / 6) * 100);

  // 2. Water Goals Met (Mon-Sun, 7 days)
  let waterDays = 0;
  weekDates.forEach(dateStr => {
    const drops = waterLog[dateStr] || 0;
    if (drops >= 6) {
      waterDays++;
    }
  });

  // 3. Protein Goals Met (Mon-Sun, 7 days)
  let proteinDays = 0;
  const targetProtein = profile.targetProtein || 60;
  weekDates.forEach(dateStr => {
    const activeLog = nutritionLog[dateStr];
    if (activeLog) {
      const currentProtein = 
        (activeLog.breakfast ? Number(activeLog.breakfastProtein || 0) : 0) +
        (activeLog.lunch ? Number(activeLog.lunchProtein || 0) : 0) +
        (activeLog.snack ? Number(activeLog.snackProtein || 0) : 0) +
        (activeLog.dinner ? Number(activeLog.dinnerProtein || 0) : 0);
      if (currentProtein >= targetProtein) {
        proteinDays++;
      }
    }
  });

  // 4. Daily Check-ins logged (Mon-Sun, 7 days)
  let checkinDays = 0;
  weekDates.forEach(dateStr => {
    if (dailyCheckIns[dateStr]) {
      checkinDays++;
    }
  });

  // 5. Weight change calculation
  let weightChangeStr = "No log this week";
  const currentWeekLogs = measurementsLog.filter(log => weekDates.includes(log.date));
  
  if (currentWeekLogs.length > 0) {
    // Sort descending by date to find the latest log in this week
    currentWeekLogs.sort((a, b) => b.date.localeCompare(a.date));
    const currentWeight = currentWeekLogs[0].weight;

    // Find the latest log before this week
    const beforeLogs = measurementsLog.filter(log => log.date < weekDates[0]);
    if (beforeLogs.length > 0) {
      beforeLogs.sort((a, b) => b.date.localeCompare(a.date));
      const prevWeight = beforeLogs[0].weight;
      const diff = currentWeight - prevWeight;
      weightChangeStr = diff === 0 ? "0.0kg" : `${diff > 0 ? '+' : ''}${diff.toFixed(1)}kg`;
    } else {
      // Fallback: compare to startingWeight in user profile
      const startingWeight = profile.startingWeight || 40;
      const diff = currentWeight - startingWeight;
      weightChangeStr = diff === 0 ? "0.0kg" : `${diff > 0 ? '+' : ''}${diff.toFixed(1)}kg`;
    }
  } else {
    // Fallback: If no logs this week, display weight from the latest log, but note no change logged
    if (measurementsLog.length > 0) {
      const sortedLogs = [...measurementsLog].sort((a, b) => b.date.localeCompare(a.date));
      weightChangeStr = `${sortedLogs[0].weight}kg (no new logs)`;
    } else {
      weightChangeStr = `${profile.weight || 40}kg`;
    }
  }

  // 6. Award Cozy Title
  let title = "One Day At A Time 🫶";
  if (completionRate === 100) {
    title = "Consistency Queen 💃";
  } else if (completionRate >= 80) {
    title = "Blooming 🌷";
  } else if (completionRate >= 60) {
    title = "Growing Steadily ☁️";
  }

  // 7. Check if progression criteria met (completionRate >= 80%)
  const isEligible = completionRate >= 80;

  return {
    weekDates,
    completedWorkouts,
    completionRate,
    waterDays,
    proteinDays,
    checkinDays,
    weightChangeStr,
    title,
    isEligible
  };
};
