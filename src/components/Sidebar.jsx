import React, { useState } from 'react';
import {
  Home,
  Dumbbell,
  ChefHat,
  LineChart,
  CalendarCheck,
  Award,
  Sparkles,
  Flame,
  User,
  Menu,
  X,
  Trash2
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, profile, darkMode, toggleDarkMode, handleResetData }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home},
    { id: 'workouts', name: 'Workouts', icon: Dumbbell},
    { id: 'nutrition', name: 'Nutrition', icon: ChefHat},
    { id: 'progress', name: 'Progress', icon: LineChart},
    { id: 'checkin', name: 'Check-In', icon: CalendarCheck},
    { id: 'badges', name: 'Badges', icon: Award},
  ];

  return (
    <>
      {/* Mobile Drawer Sidebar Overlay */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-100 flex">
          {/* Translucent Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-charcoal/45 backdrop-blur-xs transition-opacity duration-300"
          ></div>

          {/* Sliding Aside Container */}
          <aside className="relative flex flex-col w-64 bg-white min-h-screen p-6 text-[#423E3A] shadow-2xl animate-slide-in-left z-110">
            {/* Washi tape decor */}
            <div className="washi-tape absolute top-[-6px] left-10 w-24 h-4.5 rotate-[-1deg] opacity-75"></div>

            {/* Header / Close button */}
            <div className="flex items-center justify-between mb-8 select-none">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <h1 className="text-xl font-serif font-bold tracking-tight text-charcoal">
                  Little Wins
                </h1>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg text-charcoal/40 hover:bg-cream hover:text-charcoal cursor-pointer flex items-center justify-center focus:outline-hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Phase & Streak Cozy Stats Block */}
            <div className="mb-6 bg-cream/70 rounded-2xl p-4 border border-beige/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Current Phase</span>
                <span className="text-xs bg-sage/20 text-charcoal px-2 py-0.5 rounded-full font-medium">
                  Phase {profile.phase}
                </span>
              </div>
              <div className="text-sm font-serif font-semibold text-charcoal mb-3">
                {profile.phase === 1 && "🧸 Foundation"}
                {profile.phase === 2 && "⚡ Building"}
                {profile.phase === 3 && "💪 Growing"}
              </div>

              <div className="border-t border-beige/40 pt-3 flex items-center justify-between">
                <span className="text-xs text-charcoal/60">Workout Streak</span>
                <div className="flex items-center gap-1 text-rose font-semibold text-sm">
                  <Flame className="w-4 h-4 fill-current animate-pulse-slow" />
                  <span>{profile.workoutStreak} Days</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                      ? 'bg-rose/20 text-charcoal font-semibold shadow-xs'
                      : 'text-charcoal/70 hover:bg-cream hover:text-charcoal'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-rose' : 'text-charcoal/60'}`} />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-xs opacity-75">{item.emoji}</span>
                  </button>
                );
              })}
            </nav>

            {/* Cozy Night Mode Toggle (Mobile Drawer) */}
            <div className="mb-4 pt-4 border-t border-beige/40 flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal/65 uppercase tracking-wider">Cozy Night Mode</span>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-cream hover:bg-rose/25 text-charcoal/70 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-beige/40"
              >
                {darkMode ? "🌙 Cozy Night" : "☀️ Soft Sun"}
              </button>
            </div>

            {/* User Card at bottom */}
            <div className="mt-auto pt-6 border-t border-beige/40">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose/30 flex items-center justify-center text-rose border border-rose/10 font-bold font-serif">
                    LW
                  </div>
                  <div>
                    <div className="text-[10px] text-charcoal/50">Wellness Companion</div>
                    <div className="text-xs font-semibold text-charcoal">Consistency Queen 👸</div>
                  </div>
                </div>
                <button
                  onClick={handleResetData}
                  className="p-2 hover:bg-rose/10 rounded-xl text-rose/60 hover:text-rose cursor-pointer transition-colors"
                  title="Reset App Data"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-beige/60 min-h-screen p-6 fixed left-0 top-0 text-[#423E3A] z-30">
        {/* Logo & Tagline */}
        <div className="mb-8 select-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌸</span>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-charcoal">
              Little Wins
            </h1>
          </div>
          <p className="text-xs text-charcoal/60 font-sans italic">
            ✨ One percent better, every day.
          </p>
        </div>

        {/* Phase & Streak Cozy Stats Block */}
        <div className="mb-6 bg-cream/70 rounded-2xl p-4 border border-beige/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Current Phase</span>
            <span className="text-xs bg-sage/20 text-charcoal px-2 py-0.5 rounded-full font-medium">
              Phase {profile.phase}
            </span>
          </div>
          <div className="text-sm font-serif font-semibold text-charcoal mb-3">
            {profile.phase === 1 && "🧸 Foundation"}
            {profile.phase === 2 && "⚡ Building"}
            {profile.phase === 3 && "💪 Growing"}
          </div>

          <div className="border-t border-beige/40 pt-3 flex items-center justify-between">
            <span className="text-xs text-charcoal/60">Workout Streak</span>
            <div className="flex items-center gap-1 text-rose font-semibold text-sm">
              <Flame className="w-4 h-4 fill-current animate-pulse-slow" />
              <span>{profile.workoutStreak} Days</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-rose/20 text-charcoal font-semibold shadow-xs'
                  : 'text-charcoal/70 hover:bg-cream hover:text-charcoal'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose' : 'text-charcoal/60'}`} />
                  <span>{item.name}</span>
                </div>
                <span className="text-xs opacity-75">{item.emoji}</span>
              </button>
            );
          })}
        </nav>

        {/* Cozy Night Mode Toggle (Desktop) */}
        <div className="mb-4 pt-4 border-t border-beige/40 flex items-center justify-between">
          <span className="text-xs font-semibold text-charcoal/65 uppercase tracking-wider">Cozy Night Mode</span>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-cream hover:bg-rose/25 text-charcoal/70 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-beige/40"
          >
            {darkMode ? "🌙 Cozy Night" : "☀️ Soft Sun"}
          </button>
        </div>

        {/* User Card at bottom */}
        <div className="mt-auto pt-6 border-t border-beige/40">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose/30 flex items-center justify-center text-rose border border-rose/10 font-bold font-serif">
                LW
              </div>
              <div>
                <div className="text-[10px] text-charcoal/50">Wellness Companion</div>
                <div className="text-xs font-semibold text-charcoal">Consistency Queen 👸</div>
              </div>
            </div>
            <button
              onClick={handleResetData}
              className="p-2 hover:bg-rose/10 rounded-xl text-rose/60 hover:text-rose cursor-pointer transition-colors"
              title="Reset App Data"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar (hidden on desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-beige/60 py-2 px-3 z-50 flex items-center justify-around shadow-lg">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all ${isActive ? 'text-rose font-semibold' : 'text-charcoal/60'
                }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 left-0 right-0 bg-white border-b border-beige/40 px-4 py-3 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-1 -ml-1 rounded-lg text-charcoal/70 hover:bg-cream hover:text-charcoal cursor-pointer flex items-center justify-center focus:outline-hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-lg">🌸</span>
          <span className="font-serif font-bold text-lg text-charcoal">Little Wins</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-1 rounded-xl bg-cream hover:bg-rose/25 text-charcoal/70 border border-beige/40 flex items-center justify-center cursor-pointer w-7 h-7 text-xs"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          <div className="flex items-center gap-1 text-xs bg-rose/10 text-charcoal font-semibold px-2.5 py-1 rounded-full border border-rose/20">
            <Flame className="w-3.5 h-3.5 text-rose fill-current" />
            <span>{profile.workoutStreak}d</span>
          </div>
          <div className="text-xs bg-sage/20 text-charcoal px-2.5 py-1 rounded-full font-semibold">
            Ph {profile.phase}
          </div>
        </div>
      </header>
    </>
  );
}
