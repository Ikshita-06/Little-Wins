import { badgesData } from '../data/badges';

const IN_TO_CM = 2.54;

const getDayOfWeekStr = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[d.getDay()];
};

// Helper: Union of all log keys to find all active dates
const getAllActiveDates = (checkins, water, workouts, nutrition) => {
  const keys = new Set([
    ...Object.keys(checkins || {}),
    ...Object.keys(water || {}),
    ...Object.keys(workouts || {}),
    ...Object.keys(nutrition || {})
  ]);
  return Array.from(keys).sort((a, b) => new Date(a) - new Date(b));
};

// Helper: Calculate longest consecutive streak of active days
const getConsecutiveActiveStreak = (activeDates) => {
  if (activeDates.length === 0) return 0;
  
  let maxStreak = 0;
  let currentStreak = 0;
  let prevDate = null;
  
  for (let i = 0; i < activeDates.length; i++) {
    const currentDate = new Date(activeDates[i] + 'T00:00:00');
    if (prevDate === null) {
      currentStreak = 1;
    } else {
      const diffTime = currentDate - prevDate;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
    prevDate = currentDate;
  }
  return Math.max(maxStreak, currentStreak);
};

// Helper: Calculate longest consecutive hydration streak (water >= 6)
const getConsecutiveWaterStreak = (waterLog) => {
  const dates = Object.keys(waterLog || {})
    .filter(d => (waterLog[d] || 0) >= 6)
    .sort((a, b) => new Date(a) - new Date(b));
  
  if (dates.length === 0) return 0;
  
  let maxStreak = 0;
  let currentStreak = 0;
  let prevDate = null;
  
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i] + 'T00:00:00');
    if (prevDate === null) {
      currentStreak = 1;
    } else {
      const diffTime = currentDate - prevDate;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
    prevDate = currentDate;
  }
  return Math.max(maxStreak, currentStreak);
};

// Main badge checker function
export const getNewlyUnlockedBadges = (
  unlockedList = [],
  checkins = {},
  water = {},
  workouts = {},
  nutrition = {},
  measurements = [],
  profile = {},
  periods = {}
) => {
  const newlyUnlocked = [];
  const currentUnlockedSet = new Set(unlockedList);

  const targetProtein = profile.targetProtein || 60;
  const targetCalories = profile.targetCalories || 1900;
  const startingWeight = profile.startingWeight || 40;
  const targetWeight = profile.goalWeight || 45;
  const currentWeight = profile.weight || 40;
  const isGaining = targetWeight >= startingWeight;

  const activeDates = getAllActiveDates(checkins, water, workouts, nutrition);

  // 1. small_wins_count: Complete first full week (7 days of activity logged)
  if (!currentUnlockedSet.has('small_wins_count')) {
    if (activeDates.length >= 7) {
      newlyUnlocked.push('small_wins_count');
    }
  }

  // 2. hydration_hero: Meet water goal (>=6) for 7 consecutive days
  if (!currentUnlockedSet.has('hydration_hero')) {
    if (getConsecutiveWaterStreak(water) >= 7) {
      newlyUnlocked.push('hydration_hero');
    }
  }

  // 3. protein_princess: Hit protein goal for 7 days
  if (!currentUnlockedSet.has('protein_princess')) {
    let proteinDays = 0;
    Object.keys(nutrition).forEach(date => {
      const log = nutrition[date] || {};
      const dailyProtein = 
        (log.breakfastProtein || 0) + 
        (log.lunchProtein || 0) + 
        (log.snackProtein || 0) + 
        (log.dinnerProtein || 0);
      if (dailyProtein >= targetProtein) {
        proteinDays++;
      }
    });
    if (proteinDays >= 7) {
      newlyUnlocked.push('protein_princess');
    }
  }

  // 4. blooming: Gain first 1kg towards goal
  if (!currentUnlockedSet.has('blooming')) {
    const diff = currentWeight - startingWeight;
    const progress = isGaining ? diff : -diff;
    if (progress >= 1.0) {
      newlyUnlocked.push('blooming');
    }
  }

  // 5. on_fire: Maintain a 14 day streak
  if (!currentUnlockedSet.has('on_fire')) {
    if ((profile.workoutStreak || 0) >= 14) {
      newlyUnlocked.push('on_fire');
    }
  }

  // 6. glute_queen: Complete 20 glute-focused workouts (Mon, Thu, Sat)
  if (!currentUnlockedSet.has('glute_queen')) {
    let gluteWorkoutsCount = 0;
    Object.keys(workouts).forEach(date => {
      const log = workouts[date];
      if (log?.completed) {
        const dayName = getDayOfWeekStr(date);
        if (dayName === 'Monday' || dayName === 'Thursday' || dayName === 'Saturday') {
          gluteWorkoutsCount++;
        }
      }
    });
    if (gluteWorkoutsCount >= 20) {
      newlyUnlocked.push('glute_queen');
    }
  }

  // 7. flourishing: Gain 3kg towards goal
  if (!currentUnlockedSet.has('flourishing')) {
    const diff = currentWeight - startingWeight;
    const progress = isGaining ? diff : -diff;
    if (progress >= 3.0) {
      newlyUnlocked.push('flourishing');
    }
  }

  // 8. consistency_queen: Complete 30 day activity streak
  if (!currentUnlockedSet.has('consistency_queen')) {
    if (getConsecutiveActiveStreak(activeDates) >= 30) {
      newlyUnlocked.push('consistency_queen');
    }
  }

  // 9. goal_crushed: Reach goal weight
  if (!currentUnlockedSet.has('goal_crushed')) {
    const reached = isGaining ? (currentWeight >= targetWeight) : (currentWeight <= targetWeight);
    if (reached) {
      newlyUnlocked.push('goal_crushed');
    }
  }

  // 10. protected_energy: Rest days properly for 4 consecutive weeks
  // We'll unlock this if they have checked in or tracked water/activity on Sundays for at least 4 Sundays
  if (!currentUnlockedSet.has('protected_energy')) {
    let sundaysCount = 0;
    activeDates.forEach(date => {
      if (getDayOfWeekStr(date) === 'Sunday') {
        sundaysCount++;
      }
    });
    if (sundaysCount >= 4) {
      newlyUnlocked.push('protected_energy');
    }
  }

  // 11. growing_stronger: Complete 30 workouts total
  if (!currentUnlockedSet.has('growing_stronger')) {
    let completedWorkoutsCount = 0;
    Object.keys(workouts).forEach(date => {
      if (workouts[date]?.completed) {
        completedWorkoutsCount++;
      }
    });
    if (completedWorkoutsCount >= 30) {
      newlyUnlocked.push('growing_stronger');
    }
  }

  // 12. one_day_at_a_time: Complete 100 check-ins
  if (!currentUnlockedSet.has('one_day_at_a_time')) {
    if (Object.keys(checkins).length >= 100) {
      newlyUnlocked.push('one_day_at_a_time');
    }
  }

  // 13. one_percent_better: Complete 50 total small wins
  if (!currentUnlockedSet.has('one_percent_better')) {
    let totalWins = 0;
    activeDates.forEach(date => {
      // Win 1: check-in completed
      if (checkins[date]?.mood) totalWins++;
      // Win 2: water goal met
      if ((water[date] || 0) >= 6) totalWins++;
      // Win 3: workout completed
      if (workouts[date]?.completed) totalWins++;
      // Win 4: protein goal met
      const log = nutrition[date] || {};
      const dailyProtein = 
        (log.breakfastProtein || 0) + 
        (log.lunchProtein || 0) + 
        (log.snackProtein || 0) + 
        (log.dinnerProtein || 0);
      if (dailyProtein >= targetProtein) totalWins++;
      // Win 5: calorie goal met
      const dailyCalories = 
        (log.breakfastCalories || 0) + 
        (log.lunchCalories || 0) + 
        (log.snackCalories || 0) + 
        (log.dinnerCalories || 0);
      if (dailyCalories >= targetCalories) totalWins++;
    });
    if (totalWins >= 50) {
      newlyUnlocked.push('one_percent_better');
    }
  }

  // 14. hydration_royalty: Meet water goal for 30 days
  if (!currentUnlockedSet.has('hydration_royalty')) {
    let waterDays = 0;
    Object.keys(water).forEach(date => {
      if ((water[date] || 0) >= 6) {
        waterDays++;
      }
    });
    if (waterDays >= 30) {
      newlyUnlocked.push('hydration_royalty');
    }
  }

  // 15. nourished_and_thriving: Hit calorie goal for 14 days
  if (!currentUnlockedSet.has('nourished_and_thriving')) {
    let calorieDays = 0;
    Object.keys(nutrition).forEach(date => {
      const log = nutrition[date] || {};
      const dailyCalories = 
        (log.breakfastCalories || 0) + 
        (log.lunchCalories || 0) + 
        (log.snackCalories || 0) + 
        (log.dinnerCalories || 0);
      if (dailyCalories >= targetCalories) {
        calorieDays++;
      }
    });
    if (calorieDays >= 14) {
      newlyUnlocked.push('nourished_and_thriving');
    }
  }

  // 17. gentle_with_myself: Complete 3 period check-ins
  if (!currentUnlockedSet.has('gentle_with_myself')) {
    let periodCheckinsCount = 0;
    Object.keys(checkins).forEach(date => {
      if (periods[date] === true) {
        periodCheckinsCount++;
      }
    });
    if (periodCheckinsCount >= 3) {
      newlyUnlocked.push('gentle_with_myself');
    }
  }

  // 18. comfort_first: Use Gentle Workout Mode 3 times
  if (!currentUnlockedSet.has('comfort_first')) {
    let comfortWorkoutsCount = 0;
    Object.keys(workouts).forEach(date => {
      const log = workouts[date];
      if (log?.completed && log?.workoutType === 'period-comfort') {
        comfortWorkoutsCount++;
      }
    });
    if (comfortWorkoutsCount >= 3) {
      newlyUnlocked.push('comfort_first');
    }
  }

  // 19. listening_to_my_body: Log 5 check-ins during your period
  if (!currentUnlockedSet.has('listening_to_my_body')) {
    let periodCozinessCount = 0;
    Object.keys(checkins).forEach(date => {
      if (periods[date] === true) {
        periodCozinessCount++;
      }
    });
    if (periodCozinessCount >= 5) {
      newlyUnlocked.push('listening_to_my_body');
    }
  }

  // 16. little_wins_legend: Earn all other badges (18 badges)
  if (!currentUnlockedSet.has('little_wins_legend')) {
    // Count how many of the other badges are already unlocked or newly unlocked in this batch
    const allBadgesIds = badgesData.map(b => b.id).filter(id => id !== 'little_wins_legend');
    const allEarned = allBadgesIds.every(id => currentUnlockedSet.has(id) || newlyUnlocked.includes(id));
    if (allEarned) {
      newlyUnlocked.push('little_wins_legend');
    }
  }

  return newlyUnlocked;
};
