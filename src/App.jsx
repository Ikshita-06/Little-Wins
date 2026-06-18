import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Nutrition from './components/Nutrition';
import ProgressTracker from './components/ProgressTracker';
import DailyCheckIn from './components/DailyCheckIn';
import Badges from './components/Badges';

const getTodayStr = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Date Simulator state for testing/viewing logs on different days
  const [simulatedDate, setSimulatedDate] = useState(getTodayStr());

  // --- LOCALSTORAGE SYNCED STATES ---
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('lw_profile');
    return saved ? JSON.parse(saved) : {
      age: 20,
      height: "5'0\"",
      startingWeight: 40,
      weight: 40,
      goalWeight: 45,
      phase: 1,
      workoutStreak: 0,
      lastActiveDate: null,
      consistency: 85,
    };
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

  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    const saved = localStorage.getItem('lw_badges');
    return saved ? JSON.parse(saved) : ['first_week']; // start with 'small wins count'
  });

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
    localStorage.setItem('lw_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  // Determine current day of week based on simulated date
  const getDayOfWeek = () => {
    const dateObj = new Date(simulatedDate + 'T00:00:00');
    const options = { weekday: 'long' };
    return dateObj.toLocaleDateString('en-US', options); // 'Monday', etc.
  };

  const currentDayName = getDayOfWeek();

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-rose/30">

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        profile={{ ...profile, periods }}
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
          <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white/70 border-b border-beige/30 text-xs select-none">
            <span>{currentDayName}, {simulatedDate}</span>
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
                setCurrentTab={setCurrentTab}
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
              />
            )}

            {currentTab === 'progress' && (
              <ProgressTracker
                profile={profile}
                setProfile={setProfile}
                measurementsLog={measurementsLog}
                setMeasurementsLog={setMeasurementsLog}
                simulatedDate={simulatedDate}
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
    </div>
  );
}
