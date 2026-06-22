import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Nutrition from './components/Nutrition';
import ProgressTracker from './components/ProgressTracker';
import DailyCheckIn from './components/DailyCheckIn';
import Badges from './components/Badges';
import { badgesData } from './data/badges';
import { getNewlyUnlockedBadges } from './utils/badgeChecker';
import { Trophy } from 'lucide-react';

const getTodayStr = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Cozy Night Mode synced to localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('lw_dark_mode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lw_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lw_dark_mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Date Simulator state for testing/viewing logs on different days
  const [simulatedDate, setSimulatedDate] = useState(getTodayStr());

  // Track the actual current calendar day to detect midnight rollovers
  const realTodayRef = useRef(getTodayStr());

  // Auto-update simulatedDate to new day at midnight (only if it was set to today's date previously)
  useEffect(() => {
    const interval = setInterval(() => {
      const newTodayStr = getTodayStr();

      // If midnight has passed (the calendar date has changed)
      if (newTodayStr !== realTodayRef.current) {
        const oldTodayStr = realTodayRef.current;
        realTodayRef.current = newTodayStr;

        setSimulatedDate(prev => {
          // Only auto-advance if the user was currently looking at the active "today" page
          if (prev === oldTodayStr) {
            return newTodayStr;
          }
          return prev;
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // --- LOCALSTORAGE SYNCED STATES ---
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('lw_profile');
    const initial = saved ? JSON.parse(saved) : {
      age: 20,
      height: "5'0\"",
      startingWeight: 39,
      weight: 39,
      goalWeight: 45,
      phase: 1,
      maxUnlockedPhase: 1,
      workoutStreak: 0,
      lastActiveDate: null,
      consistency: 85,
    };
    if (initial && initial.maxUnlockedPhase === undefined) {
      initial.maxUnlockedPhase = initial.phase || 1;
    }
    return initial;
  });

  const [periods, setPeriods] = useState(() => {
    const saved = localStorage.getItem('lw_periods');
    return saved ? JSON.parse(saved) : {};
  });

  const [waterLog, setWaterLog] = useState(() => {
    const saved = localStorage.getItem('lw_water');
    return saved ? JSON.parse(saved) : {};
  });

  const [nutritionLog, setNutritionLog] = useState(() => {
    const saved = localStorage.getItem('lw_nutrition');
    return saved ? JSON.parse(saved) : {};
  });

  const [nutritionEntries, setNutritionEntries] = useState(() => {
    const saved = localStorage.getItem('nutritionEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [workoutLog, setWorkoutLog] = useState(() => {
    const saved = localStorage.getItem('lw_workouts');
    return saved ? JSON.parse(saved) : {};
  });

  const [measurementsLog, setMeasurementsLog] = useState(() => {
    const saved = localStorage.getItem('lw_measurements');
    return saved ? JSON.parse(saved) : [
      { date: '2026-06-10', weight: 40, waist: 24, chest: 32, hips: 34, thigh: 19, wrist: 5 }
    ];
  });

  const [dailyCheckIns, setDailyCheckIns] = useState(() => {
    const saved = localStorage.getItem('lw_checkins');
    return saved ? JSON.parse(saved) : {};
  });

  const [sundayReviews, setSundayReviews] = useState(() => {
    const saved = localStorage.getItem('lw_sunday_reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    const saved = localStorage.getItem('lw_badges');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(id => id === 'first_week' ? 'small_wins_count' : id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return ['small_wins_count']; // start with 'Small Wins Count'
  });

  const [activeBadgeToast, setActiveBadgeToast] = useState(null);

  // --- SYNC TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('lw_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('lw_periods', JSON.stringify(periods));
  }, [periods]);

  useEffect(() => {
    localStorage.setItem('lw_water', JSON.stringify(waterLog));
  }, [waterLog]);

  useEffect(() => {
    localStorage.setItem('lw_nutrition', JSON.stringify(nutritionLog));
  }, [nutritionLog]);

  useEffect(() => {
    localStorage.setItem('lw_workouts', JSON.stringify(workoutLog));
  }, [workoutLog]);

  useEffect(() => {
    localStorage.setItem('lw_measurements', JSON.stringify(measurementsLog));
  }, [measurementsLog]);

  useEffect(() => {
    localStorage.setItem('lw_checkins', JSON.stringify(dailyCheckIns));
  }, [dailyCheckIns]);

  useEffect(() => {
    localStorage.setItem('lw_sunday_reviews', JSON.stringify(sundayReviews));
  }, [sundayReviews]);

  useEffect(() => {
    localStorage.setItem('lw_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    localStorage.setItem('nutritionEntries', JSON.stringify(nutritionEntries));
  }, [nutritionEntries]);

  // Synchronize nutritionLog totals based on nutritionEntries
  useEffect(() => {
    // Group entries by date
    const entriesByDate = {};
    nutritionEntries.forEach(entry => {
      if (!entriesByDate[entry.date]) {
        entriesByDate[entry.date] = [];
      }
      entriesByDate[entry.date].push(entry);
    });

    setNutritionLog(prevLog => {
      let changed = false;
      const nextLog = { ...prevLog };

      // Reset calorie/protein counts for all dates in nextLog
      Object.keys(nextLog).forEach(date => {
        const dayLog = nextLog[date];
        if (dayLog && (
          dayLog.breakfastCalories !== 0 ||
          dayLog.breakfastProtein !== 0 ||
          dayLog.lunchCalories !== 0 ||
          dayLog.lunchProtein !== 0 ||
          dayLog.snackCalories !== 0 ||
          dayLog.snackProtein !== 0 ||
          dayLog.dinnerCalories !== 0 ||
          dayLog.dinnerProtein !== 0
        )) {
          nextLog[date] = {
            ...dayLog,
            breakfastCalories: 0,
            breakfastProtein: 0,
            lunchCalories: 0,
            lunchProtein: 0,
            snackCalories: 0,
            snackProtein: 0,
            dinnerCalories: 0,
            dinnerProtein: 0
          };
          changed = true;
        }
      });

      // Sum up the entries for any date that has them
      Object.keys(entriesByDate).forEach(date => {
        const dayEntries = entriesByDate[date];
        const currentDayLog = nextLog[date] || {
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

        const sums = {
          breakfastCalories: 0,
          breakfastProtein: 0,
          lunchCalories: 0,
          lunchProtein: 0,
          snackCalories: 0,
          snackProtein: 0,
          dinnerCalories: 0,
          dinnerProtein: 0
        };

        dayEntries.forEach(e => {
          const mealKey = e.meal.toLowerCase();
          const key = mealKey === 'snacks' || mealKey === 'snack' ? 'snack' : mealKey;
          sums[`${key}Calories`] += Number(e.calories || 0);
          sums[`${key}Protein`] += Number(e.protein || 0);
        });

        const mealChecked = {
          breakfast: currentDayLog.breakfast || dayEntries.some(e => e.meal.toLowerCase() === 'breakfast'),
          lunch: currentDayLog.lunch || dayEntries.some(e => e.meal.toLowerCase() === 'lunch'),
          snack: currentDayLog.snack || dayEntries.some(e => ['snack', 'snacks'].includes(e.meal.toLowerCase())),
          dinner: currentDayLog.dinner || dayEntries.some(e => e.meal.toLowerCase() === 'dinner'),
        };

        const updatedDayLog = {
          ...currentDayLog,
          ...sums,
          ...mealChecked
        };

        if (JSON.stringify(currentDayLog) !== JSON.stringify(updatedDayLog)) {
          nextLog[date] = updatedDayLog;
          changed = true;
        }
      });

      return changed ? nextLog : prevLog;
    });
  }, [nutritionEntries]);

  // Dynamic Badge Unlocking Engine
  useEffect(() => {
    const newlyUnlocked = getNewlyUnlockedBadges(
      unlockedBadges,
      dailyCheckIns,
      waterLog,
      workoutLog,
      nutritionLog,
      measurementsLog,
      profile,
      periods
    );

    if (newlyUnlocked.length > 0) {
      const nextUnlocked = [...unlockedBadges, ...newlyUnlocked];
      setUnlockedBadges(nextUnlocked);

      // Select the first newly unlocked badge to display in the toast alert
      const firstBadge = badgesData.find(b => b.id === newlyUnlocked[0]);
      if (firstBadge) {
        setActiveBadgeToast(firstBadge);
      }
    }
  }, [dailyCheckIns, waterLog, workoutLog, nutritionLog, measurementsLog, profile, unlockedBadges]);

  // Auto-dismiss unlocked badge toast alert
  useEffect(() => {
    if (activeBadgeToast) {
      const timer = setTimeout(() => {
        setActiveBadgeToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [activeBadgeToast]);

  // Determine current day of week based on simulated date
  const getDayOfWeek = () => {
    const dateObj = new Date(simulatedDate + 'T00:00:00');
    const options = { weekday: 'long' };
    return dateObj.toLocaleDateString('en-US', options); // 'Monday', etc.
  };

  const currentDayName = getDayOfWeek();

  // A journal page is editable if it represents today or yesterday in local time
  const checkIfDateIsEditable = (dateStr) => {
    const today = new Date();
    const todayStr = getTodayStr(today);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getTodayStr(yesterday);

    return dateStr === todayStr || dateStr === yesterdayStr;
  };

  const isEditable = checkIfDateIsEditable(simulatedDate);
  const isOnPeriod = !!periods[simulatedDate];

  return (
    <div className={`min-h-screen bg-cream text-charcoal font-sans selection:bg-rose/30 ${isOnPeriod ? 'period-comfort' : ''}`}>

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        profile={{ ...profile, periods }}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Layout Area */}
      <div className="md:pl-64 min-h-screen flex flex-col relative">

        {/* Binder Spiral Loops (Desktop only) */}
        <div className="hidden md:flex absolute left-[246px] top-12 bottom-12 w-6 flex-col justify-around py-8 pointer-events-none z-50">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="w-10 h-3 rounded-full binder-ring -ml-3 opacity-90 transition-transform hover:scale-105 duration-300"
              style={{ transform: `rotate(${Math.sin(i) * 3}deg)` }}
            ></div>
          ))}
        </div>

        {/* Notebook Style Paper Container */}
        <div className="flex-1 flex flex-col bg-white md:m-6 md:ml-8 md:rounded-3xl border border-beige/60 shadow-lg relative overflow-hidden">

          {/* Vertical Pink Notebook Margin Line (Desktop only) */}
          <div className="hidden md:block absolute left-12 top-0 bottom-0 w-[1px] bg-rose/40 pointer-events-none"></div>

          {isOnPeriod && (
            <>
              {/* Cute corner decorations for period mode */}
              <div className="absolute top-16 right-4 select-none pointer-events-none text-2xl animate-float opacity-75 z-20">
                🎀
              </div>
              <div className="absolute bottom-4 left-16 select-none pointer-events-none text-2xl animate-float opacity-70 z-20" style={{ animationDelay: '1s' }}>
                🧸
              </div>
              <div className="absolute bottom-20 right-4 select-none pointer-events-none text-2xl animate-float opacity-65 z-20" style={{ animationDelay: '2s' }}>
                ☁️
              </div>
              <div className="absolute top-36 left-4 select-none pointer-events-none text-2xl animate-float opacity-60 z-20 hidden md:block" style={{ animationDelay: '1.5s' }}>
                🌷
              </div>
            </>
          )}

          {/* Top bar with developer date picker simulator */}
          <div className="hidden md:flex items-center justify-between pl-16 pr-8 py-4 border-b border-beige/40 bg-white/50 backdrop-blur-xs select-none">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Today's Page</span>
              <span className="ml-3 font-serif font-bold text-charcoal">{currentDayName}, {simulatedDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal/50 bg-buttercream/50 border border-beige/50 px-2.5 py-1 rounded-md font-medium">
                📖 Journal Date:
              </span>
              <input
                type="date"
                value={simulatedDate}
                onChange={(e) => setSimulatedDate(e.target.value)}
                className="text-xs bg-white border border-beige rounded-lg px-2 py-1 outline-hidden cursor-pointer hover:border-sage focus:border-sage"
              />
            </div>
          </div>

          {/* Mobile-only Date simulator info bar */}
          <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white/70 border-b border-beige/30 text-xs select-none font-semibold">
            <span className="flex items-center gap-1.5">
              {currentDayName}, {simulatedDate}
            </span>
            <div className="flex items-center gap-1.5">
              <span>Page:</span>
              <input
                type="date"
                value={simulatedDate}
                onChange={(e) => setSimulatedDate(e.target.value)}
                className="bg-white border border-beige rounded-md px-1.5 py-0.5 outline-hidden"
              />
            </div>
          </div>

          {/* Content Area (Shifted slightly right on desktop to align with margin) */}
          <main className="flex-1 pb-20 md:pb-8 md:pl-8">
            {currentTab === 'dashboard' && (
              <Dashboard
                profile={profile}
                setProfile={setProfile}
                simulatedDate={simulatedDate}
                currentDayName={currentDayName}
                waterLog={waterLog}
                setWaterLog={setWaterLog}
                nutritionLog={nutritionLog}
                workoutLog={workoutLog}
                dailyCheckIns={dailyCheckIns}
                measurementsLog={measurementsLog}
                sundayReviews={sundayReviews}
                setSundayReviews={setSundayReviews}
                setCurrentTab={setCurrentTab}
                darkMode={darkMode}
                isOnPeriod={isOnPeriod}
              />
            )}

            {currentTab === 'workouts' && (
              <Workouts
                profile={profile}
                setProfile={setProfile}
                periods={periods}
                setPeriods={setPeriods}
                simulatedDate={simulatedDate}
                currentDayName={currentDayName}
                workoutLog={workoutLog}
                setWorkoutLog={setWorkoutLog}
                isEditable={isEditable}
              />
            )}

            {currentTab === 'nutrition' && (
              <Nutrition
                profile={profile}
                setProfile={setProfile}
                simulatedDate={simulatedDate}
                nutritionLog={nutritionLog}
                setNutritionLog={setNutritionLog}
                waterLog={waterLog}
                setWaterLog={setWaterLog}
                isEditable={isEditable}
                nutritionEntries={nutritionEntries}
                setNutritionEntries={setNutritionEntries}
                isOnPeriod={isOnPeriod}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressTracker
                profile={profile}
                setProfile={setProfile}
                measurementsLog={measurementsLog}
                setMeasurementsLog={setMeasurementsLog}
                simulatedDate={simulatedDate}
                waterLog={waterLog}
                workoutLog={workoutLog}
                isOnPeriod={isOnPeriod}
              />
            )}

            {currentTab === 'checkin' && (
              <DailyCheckIn
                profile={profile}
                setProfile={setProfile}
                periods={periods}
                setPeriods={setPeriods}
                simulatedDate={simulatedDate}
                dailyCheckIns={dailyCheckIns}
                setDailyCheckIns={setDailyCheckIns}
                waterLog={waterLog}
                setWaterLog={setWaterLog}
                workoutLog={workoutLog}
                setWorkoutLog={setWorkoutLog}
                nutritionLog={nutritionLog}
                setNutritionLog={setNutritionLog}
                isEditable={isEditable}
                setNutritionEntries={setNutritionEntries}
              />
            )}

            {currentTab === 'badges' && (
              <Badges
                unlockedBadges={unlockedBadges}
                setUnlockedBadges={setUnlockedBadges}
              />
            )}
          </main>
        </div>
      </div>

      {/* Dynamic Badge Unlock Toast Notification */}
      {activeBadgeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-white border-2 border-amber-300 rounded-3xl p-5 shadow-2xl flex items-start gap-3.5 animate-bounce-soft relative select-none">
          {/* Scrapbook washi tape */}
          <div className="washi-tape absolute -top-2.5 left-1/3 w-20 h-4 bg-amber-250/80 rotate-[-1.5deg] opacity-90"></div>

          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-600 mt-1">
            <Trophy className="w-5.5 h-5.5 fill-amber-100" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500 font-sans">Badge Unlocked! 🌸</span>
              <span className="text-[9px] bg-rose/15 text-charcoal px-2 py-0.5 rounded-full font-bold uppercase scale-90">{activeBadgeToast.rarity}</span>
            </div>
            <h4 className="text-sm font-bold font-serif text-charcoal leading-tight">
              {activeBadgeToast.title}
            </h4>
            <p className="text-[10px] text-charcoal/65 leading-normal font-sans">
              {activeBadgeToast.description}
            </p>
          </div>

          <button
            onClick={() => setActiveBadgeToast(null)}
            className="text-charcoal/35 hover:text-charcoal cursor-pointer text-sm font-bold pl-1"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
