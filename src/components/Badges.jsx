import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Droplet,
  Flame,
  Award,
  Leaf,
  Crown,
  Trophy,
  Heart,
  Activity,
  Calendar,
  Coffee,
  Lock,
  Unlock,
  Scale,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { badgesData, badgeCategories, progressionPath } from '../data/badges';

// Helper: Custom aesthetic images for each individual badge
function getBadgeIllustration(badgeId, extraClasses = 'w-16 h-16 md:w-20 md:h-20') {
  const cleanId = (badgeId || '').toLowerCase();
  return (
    <img
      src={`/badges/${cleanId}.png`}
      alt={badgeId}
      className={`object-contain transition-transform duration-300 ${extraClasses}`}
    />
  );
}

// Decorative punch holes for scrapbook binder paper
function BinderHoles() {
  return (
    <div className="absolute left-2 top-6 bottom-6 w-4 flex flex-col justify-around pointer-events-none z-10 select-none">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-3.5 h-3.5 rounded-full bg-cream border border-beige/70 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-charcoal/80"></div>
        </div>
      ))}
    </div>
  );
}

export default function Badges({ unlockedBadges = [], setUnlockedBadges }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const unlockedSet = new Set(unlockedBadges);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Calculate totals
  const totalBadgesCount = badgesData.length;
  const unlockedCount = badgesData.filter(b => unlockedSet.has(b.id)).length;
  const progressPercent = Math.round((unlockedCount / totalBadgesCount) * 100);

  // Filtered badges
  const filteredBadges = badgesData.filter(badge => {
    if (activeCategory === 'All') return true;
    return badge.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Badge card colors based on rarity
  const getRarityTagColor = (rarity) => {
    const r = (rarity || '').toLowerCase();
    if (r === 'legendary') return 'bg-gradient-to-r from-amber-200 to-rose-200 text-amber-900 border-amber-300';
    if (r === 'epic') return 'bg-amber-100/75 text-amber-800 border-amber-200';
    if (r === 'rare') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (r === 'uncommon') return 'bg-teal-50 text-teal-700 border-teal-200';
    return 'bg-cream text-charcoal/60 border-beige/40';
  };

  // Helper to render stars based on rarity
  const renderRarityStars = (count) => {
    return '⭐'.repeat(count || 1);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 select-none">

      {/* Top Header Banner - Cute morning sunset watercolor wash (static trophy icon) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-badges-from via-badges-via to-badges-to border border-beige/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1.5deg] opacity-75 bg-sage/65"></div>

        <div className="flex-1 space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 text-charcoal text-xs font-semibold border border-sage/10 font-sans">
            <Trophy className="w-3.5 h-3.5 text-sage fill-sage/25" />
            <span>Achievements Showcase</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
            Your Wellness Milestones
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 font-sans max-w-xl">
            Celebrate every small victory. Streaks, hydration goals, healthy eating habits, and progress logs unlock gorgeous collectible stamps!
          </p>
        </div>

        {/* Dynamic Progress Stat Ring / Banner Block */}
        <div className="relative bg-cream/55 border border-beige/40 p-5 rounded-2xl flex flex-col items-center justify-center text-center flex-shrink-0 min-w-[150px] w-full md:w-auto">
          <span className="text-3xl font-serif text-charcoal font-bold">{unlockedCount} / {totalBadgesCount}</span>
          <span className="text-[10px] text-charcoal/50 font-bold uppercase tracking-wider mt-0.5">Badges Unlocked</span>
          <div className="w-full bg-cream border border-beige/35 h-2 rounded-full overflow-hidden mt-3 max-w-[120px]">
            <div
              className="bg-sage h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="text-[9px] text-sage font-bold mt-1.5 uppercase">{progressPercent}% Completed</span>
        </div>
      </div>

      {/* Wellness Adventure Progression Path (with scroll height fix to avoid tooltip clip) */}
      <div className="bg-cream/45 border border-beige/40 rounded-3xl p-6 relative journal-bg">
        <div className="washi-tape absolute top-[-8px] left-12 w-20 h-4.5 rotate-[1.5deg] opacity-70 bg-sage/40"></div>
        <BinderHoles />

        <div className="pl-6 pb-2 border-b border-beige/40 mb-5">
          <h4 className="text-md font-serif font-bold text-charcoal flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-sage" />
            <span>Wellness Adventure Path</span>
          </h4>
          <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold font-sans">Your progression map along the favorite collection trail</p>
        </div>

        {/* Trail stepping stones - increased top padding to pt-24 so tooltips are fully visible */}
        <div className="pl-6 pt-24 pb-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center min-w-[900px] justify-between relative px-4">

            {/* Background connecting trail line */}
            <div className="absolute left-6 right-6 top-[20px] h-0.5 bg-dashed-line border-b border-dashed border-beige/80 -z-10"></div>

            {progressionPath.map((badgeId, index) => {
              const badge = badgesData.find(b => b.id === badgeId);
              if (!badge) return null;

              const isUnlocked = unlockedSet.has(badgeId);

              return (
                <div key={badgeId} className="flex flex-col items-center space-y-2 relative group w-20">
                  {/* Stepping stone circle */}
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-350 relative ${isUnlocked
                      ? `${badge.colorClasses.split(' ')[0]} border-sage text-charcoal shadow-md scale-105 hover:scale-110`
                      : 'bg-cream border-dashed border-beige/50 text-charcoal/40 opacity-70'
                      }`}
                  >
                    {isUnlocked ? (
                      getBadgeIllustration(badgeId, 'w-7 h-7')
                    ) : (
                      <span className="text-[11px] font-bold font-mono">{index + 1}</span>
                    )}

                    {/* Checkmark overlay for unlocked */}
                    {isUnlocked && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cream border border-sage text-sage flex items-center justify-center text-[8px] font-extrabold shadow-2xs">
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Title and tooltip details */}
                  <span className="text-[9px] font-serif font-bold text-charcoal text-center leading-tight truncate w-full">
                    {badge.title}
                  </span>

                  {/* Hover tooltip card info */}
                  <div className="absolute bottom-[54px] left-1/2 -translate-x-1/2 bg-white border border-beige/70 px-2.5 py-1.5 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-250 w-32 z-20 text-center space-y-1">
                    <span className="text-[8px] font-bold text-sage/80 uppercase block">Step {index + 1}</span>
                    <span className="text-[10px] font-bold text-charcoal block leading-tight">{badge.title}</span>
                    <span className="text-[8px] text-charcoal/50 block leading-normal">{isUnlocked ? '✓ Unlocked' : badge.unlock}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories Tabs & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 select-none">

        {/* Tab Buttons */}
        <div className="flex flex-wrap bg-cream border border-beige/55 p-1 rounded-2xl gap-1 text-xs font-sans w-full md:w-auto">
          {['All', ...badgeCategories].map(cat => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            let activeClass = 'bg-sage text-charcoal font-semibold shadow-xs';
            if (isActive) {
              if (cat === 'Wellness') activeClass = 'bg-blue-100 border border-blue-200 text-blue-800 font-semibold shadow-xs';
              else if (cat === 'Nutrition') activeClass = 'bg-amber-100 border border-amber-200 text-amber-900 font-semibold shadow-xs';
              else if (cat === 'Fitness') activeClass = 'bg-purple-100 border border-purple-200 text-purple-900 font-semibold shadow-xs';
              else if (cat === 'Progress') activeClass = 'bg-rose-100 border border-rose-200 text-rose-900 font-semibold shadow-xs';
              else if (cat === 'Consistency') activeClass = 'bg-orange-100 border border-orange-200 text-orange-900 font-semibold shadow-xs';
              else if (cat === 'Legendary') activeClass = 'bg-gradient-to-r from-amber-200 via-rose-200 to-sage/30 border border-amber-300 text-amber-955 font-semibold shadow-xs';
            }
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer text-center ${isActive ? activeClass : 'text-charcoal/60 hover:text-charcoal hover:bg-cream/45'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="text-[10px] text-charcoal/50 font-bold uppercase tracking-wider font-sans bg-cream border border-beige/45 px-2.5 py-1 rounded-lg">
          Showing {filteredBadges.length} Badges
        </span>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredBadges.map((badge, idx) => {
          const isUnlocked = unlockedSet.has(badge.id);

          // Apply slight alternating tilts for custom scrapbook feel
          const rotation = idx % 3 === 0 ? 'rotate-[-2deg]' : idx % 3 === 1 ? 'rotate-[1deg]' : 'rotate-[-1deg]';

          return (
            <div
              key={badge.id}
              className={`bg-white p-4 pb-5 rounded-2xl border transition-all duration-305 flex flex-col items-center text-center relative group select-none ${rotation} hover:rotate-0 hover:scale-102 ${isUnlocked
                ? 'border-beige/50 shadow-md hover:shadow-lg'
                : 'border-dashed border-beige/45 bg-white shadow-2xs opacity-55 hover:opacity-85 hover:border-sage/30'
                }`}
            >
              {/* Top Washi Tape (Unlocked is full color, locked has 40% opacity color) */}
              <div
                className={`washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 opacity-80 ${badge.colorClasses.split(' ')[0]
                  } ${!isUnlocked && 'opacity-40'}`}
              ></div>

              {/* Stamp Photo Square */}
              <div
                className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center mb-3 relative overflow-hidden transition-all p-3 ${badge.colorClasses.split(' ')[0]
                  } border ${isUnlocked ? 'border-beige/10' : 'border-dashed border-beige/25'}`}
              >
                {/* Visual Icon / Lock Overlay */}
                {isUnlocked ? (
                  getBadgeIllustration(badge.id, 'w-16 h-16 md:w-20 md:h-20 group-hover:scale-110')
                ) : (
                  <>
                    {getBadgeIllustration(badge.id, 'w-16 h-16 md:w-20 md:h-20 opacity-40 grayscale-40')}
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cream/90 backdrop-blur-xs flex items-center justify-center border border-beige/65 shadow-2xs">
                      <Lock className="w-2.5 h-2.5 text-charcoal/70" strokeWidth="2" />
                    </div>
                  </>
                )}

                {/* Confetti sparkle icons for epic/legendary unlocked badges */}
                {isUnlocked && (badge.rarity === 'Epic' || badge.rarity === 'Legendary') && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Sparkles className="absolute top-2 left-2 w-3.5 h-3.5 text-amber-400 fill-amber-100 opacity-60 animate-sparkle" />
                    <Sparkles className="absolute bottom-2 right-2 w-3.5 h-3.5 text-rose/50 fill-rose/10 opacity-60 animate-sparkle" />
                  </div>
                )}
              </div>

              {/* Rarity & Star Stamps */}
              <div className="space-y-1.5 w-full">
                {/* Rarity label */}
                <div className="flex items-center justify-center gap-1">
                  <span className={`text-[7.5px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getRarityTagColor(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                  {isUnlocked && (
                    <span className="text-[7px] select-none opacity-85">
                      {renderRarityStars(badge.rarityStars)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h5 className="text-sm font-bold font-serif text-charcoal flex items-center justify-center gap-1 leading-snug">
                  {badge.title}
                </h5>

                {/* Description / Requirement */}
                <p className="text-[10px] text-charcoal/65 leading-relaxed font-sans px-1 min-h-[32px] flex items-center justify-center">
                  {isUnlocked ? badge.description : badge.unlock}
                </p>
              </div>

              {/* Polaroid Bottom Border timestamp for unlocked */}
              <div className="w-full pt-2 border-t border-beige/25 mt-3 text-[8.5px] font-bold text-charcoal/40 uppercase tracking-widest font-mono">
                {isUnlocked ? (
                  <span className="text-sage font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Collected
                  </span>
                ) : (
                  <span className="text-[#B08D5B]/70 flex items-center justify-center gap-1">
                    🌱 Growing
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
