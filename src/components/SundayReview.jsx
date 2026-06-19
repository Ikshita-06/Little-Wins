import React, { useState } from 'react';
import { 
  Check, 
  BookOpen, 
  Sparkles, 
  Droplet, 
  Heart, 
  Activity, 
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { calculateWeeklyMetrics, getWeekDates } from '../utils/progressionHelper';

export default function SundayReview({
  sundayDateStr,
  workoutLog,
  waterLog,
  nutritionLog,
  dailyCheckIns,
  measurementsLog,
  profile,
  setProfile,
  sundayReviews,
  setSundayReviews,
  onClose
}) {
  const [reflection, setReflection] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Calculate metrics for the active Sunday review
  const metrics = calculateWeeklyMetrics({
    sundayDateStr,
    workoutLog,
    waterLog,
    nutritionLog,
    dailyCheckIns,
    measurementsLog,
    profile
  });

  const nextPhase = profile.phase < 3 ? profile.phase + 1 : 3;
  const isAlreadyReviewed = !!sundayReviews[sundayDateStr];
  const activeReviewData = sundayReviews[sundayDateStr] || null;

  // Handle completion of weekly review
  const handleSubmitReview = (unlockNewPhase = false) => {
    const finalReview = {
      completed: true,
      date: sundayDateStr,
      completedWorkouts: metrics.completedWorkouts,
      completionRate: metrics.completionRate,
      waterDays: metrics.waterDays,
      proteinDays: metrics.proteinDays,
      checkinDays: metrics.checkinDays,
      weightChange: metrics.weightChangeStr,
      title: metrics.title,
      reflection: reflection || (activeReviewData ? activeReviewData.reflection : "No reflections written."),
      phaseAtReview: profile.phase,
      unlockedPhase: unlockNewPhase ? nextPhase : profile.phase
    };

    setSundayReviews(prev => ({
      ...prev,
      [sundayDateStr]: finalReview
    }));

    if (unlockNewPhase) {
      setProfile(prev => {
        const updatedMax = Math.max(prev.maxUnlockedPhase || 1, nextPhase);
        return {
          ...prev,
          phase: nextPhase,
          maxUnlockedPhase: updatedMax
        };
      });
    }

    setIsSubmitted(true);
  };

  // Helper to draw the custom consistency squares
  const renderConsistencyBar = (completedCount) => {
    return (
      <div className="flex gap-1.5 mt-2 justify-center">
        {[...Array(6)].map((_, i) => {
          const isDone = i < completedCount;
          return (
            <div 
              key={i} 
              className={`w-7 h-7 rounded-md border flex items-center justify-center font-sans text-[10px] font-bold ${
                isDone 
                  ? 'bg-sage border-sage/40 text-charcoal' 
                  : 'bg-[#FAF8F5] border-dashed border-beige/40 text-charcoal/30'
              }`}
            >
              {isDone ? '✓' : ''}
            </div>
          );
        })}
      </div>
    );
  };

  const currentReflectionValue = activeReviewData ? activeReviewData.reflection : reflection;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-charcoal/20 backdrop-blur-xs select-none overflow-y-auto">
      {/* Main Journal Container */}
      <div className="bg-white border border-beige/60 shadow-2xl rounded-3xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto journal-bg">
        
        {/* Binder Loops Graphic */}
        <div className="absolute top-6 bottom-6 left-2 w-4 flex flex-col justify-around pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-cream border border-beige/50 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-charcoal/60"></div>
            </div>
          ))}
        </div>

        {/* Washi Tapes */}
        <div className="washi-tape absolute top-[-6px] left-10 w-24 h-4.5 rotate-[-1deg] opacity-80 bg-rose/65"></div>
        <div className="washi-tape absolute top-[-6px] right-10 w-20 h-4.5 rotate-[1.5deg] opacity-75 bg-sage/65"></div>

        {/* Header */}
        <div className="pl-6 pb-3 border-b border-beige/35 mb-5 text-center md:text-left">
          <span className="text-[9px] uppercase tracking-widest text-sage font-extrabold flex items-center justify-center md:justify-start gap-1 font-sans">
            <BookOpen className="w-3 h-3" />
            <span>Weekly Reflection Log</span>
          </span>
          <h2 className="text-2xl font-serif text-charcoal mt-1">
            Sunday Review
          </h2>
          <span className="text-xs text-charcoal/50 font-serif italic mt-0.5 block">Week ending on {sundayDateStr}</span>
        </div>

        {/* Main Content */}
        {!isSubmitted && !isAlreadyReviewed ? (
          <div className="pl-6 space-y-6">
            
            {/* Section 1: Workout Consistency */}
            <div className="bg-cream/45 border border-beige/40 p-4 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/50">Workout Consistency</span>
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <span className="text-2xl font-serif font-bold text-charcoal">{metrics.completedWorkouts} / 6</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sage/15 text-charcoal font-semibold border border-sage/10 font-sans">{metrics.completionRate}% Done</span>
              </div>
              {renderConsistencyBar(metrics.completedWorkouts)}
            </div>

            {/* Section 2: Wellness Insights */}
            <div className="bg-cream/20 border border-dashed border-beige/50 p-4.5 rounded-2xl space-y-3 shadow-2xs">
              <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-charcoal/50 block text-center">Wellness Wins Summary</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center bg-white p-2.5 rounded-xl border border-beige/35 text-center">
                  <Droplet className="w-4 h-4 text-blue-400 mb-1" />
                  <span className="text-xs font-bold font-serif text-charcoal">{metrics.waterDays} / 7</span>
                  <span className="text-[9px] text-charcoal/50 font-medium font-sans">Water Met</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-2.5 rounded-xl border border-beige/35 text-center">
                  <Activity className="w-4 h-4 text-honey mb-1" />
                  <span className="text-xs font-bold font-serif text-charcoal">{metrics.proteinDays} / 7</span>
                  <span className="text-[9px] text-charcoal/50 font-medium font-sans">Protein Met</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-2.5 rounded-xl border border-beige/35 text-center">
                  <Heart className="w-4 h-4 text-rose mb-1" />
                  <span className="text-xs font-bold font-serif text-charcoal">{metrics.checkinDays} / 7</span>
                  <span className="text-[9px] text-charcoal/50 font-medium font-sans">Check-ins</span>
                </div>
              </div>
            </div>

            {/* Section 3: Growth Metrics */}
            <div className="bg-[#FAF8F5] border border-beige/40 p-4 rounded-xl flex items-center justify-between text-xs shadow-2xs">
              <div>
                <span className="text-charcoal/50 uppercase tracking-wider text-[8px] font-bold block font-sans">Weekly Weight Change</span>
                <span className="font-serif font-bold text-charcoal text-sm mt-0.5 block">{metrics.weightChangeStr}</span>
              </div>
              <div className="h-8 w-[1px] bg-beige/35"></div>
              <div>
                <span className="text-charcoal/50 uppercase tracking-wider text-[8px] font-bold block font-sans">Weekly Title</span>
                <span className="font-serif font-bold text-rose text-sm mt-0.5 block">{metrics.title}</span>
              </div>
            </div>

            {/* Section 4: Reflection Text area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/50 block">Reflection Diary 🤍</label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="How did you feel about your routines, strengths, and goals this week?"
                rows={3}
                className="w-full text-xs font-serif italic bg-[#FAF8F5] border border-beige/50 rounded-xl p-3 outline-none focus:border-sage focus:bg-white resize-none text-charcoal leading-relaxed shadow-inner"
              />
            </div>

            {/* Section 5: Phase Decision Panel */}
            <div className="border-t border-beige/20 pt-5 space-y-4">
              {metrics.isEligible ? (
                // 80%+ Progression Unlocked
                <div className="space-y-3.5">
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold text-sm">
                      ✨
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold font-serif text-emerald-900">🌷 Amazing Work!</h4>
                      <p className="text-[10px] text-emerald-800 font-sans leading-relaxed">
                        You completed {metrics.completionRate}% of your workouts. <strong>Phase {nextPhase}</strong> is now unlocked! Keep growing one small win at a time. 🤍
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSubmitReview(true)}
                    className="w-full bg-sage border border-sage/20 text-charcoal font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg active:scale-98 transition-all"
                  >
                    <span>Unlock Phase {nextPhase} ✨</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : metrics.completionRate >= 60 ? (
                // 60-79% Keep Practicing
                <div className="space-y-3.5">
                  <div className="p-4 bg-blue-50/40 border border-blue-200 rounded-2xl flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100/50 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">
                      ☁️
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold font-serif text-blue-900">☁️ Good Job!</h4>
                      <p className="text-[10px] text-blue-800 font-sans leading-relaxed">
                        You completed {metrics.completionRate}% of your workouts. Stay with <strong>Phase {profile.phase}</strong> for another week and build consistency.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSubmitReview(false)}
                    className="w-full bg-[#EADBC8] border border-beige/40 text-charcoal font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-md hover:shadow-lg active:scale-98 transition-all"
                  >
                    Continue Phase {profile.phase}
                  </button>
                </div>
              ) : (
                // Below 60% Try Again
                <div className="space-y-3.5">
                  <div className="p-4 bg-rose/10 border border-rose/20 rounded-2xl flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose/15 flex items-center justify-center flex-shrink-0 text-rose font-bold text-sm">
                      🫶
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold font-serif text-rose-900">🫶 Small Wins Still Count</h4>
                      <p className="text-[10px] text-rose-800 font-sans leading-relaxed">
                        You completed {metrics.completionRate}% of your workouts this week. Let's focus on consistency and trying again next week.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmitReview(false)}
                      className="flex-1 bg-[#FAF8F5] border border-beige/40 text-charcoal font-bold py-2.5 rounded-xl text-xs cursor-pointer hover:bg-cream active:scale-98 transition-all"
                    >
                      Try Again Next Week
                    </button>
                    {/* Progression Override backup links for kindness */}
                    <button
                      onClick={() => handleSubmitReview(true)}
                      className="text-[9px] text-charcoal/40 underline font-semibold cursor-pointer px-2"
                    >
                      Unlock Anyway
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          // Submission Celebration State / Already Reviewed View
          <div className="pl-6 space-y-6 text-center">
            
            <div className="py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-sage/20 border-2 border-sage flex items-center justify-center mx-auto text-sage text-2xl font-bold">
                🌸
              </div>
              <h3 className="text-xl font-serif text-charcoal font-bold mt-3">
                {activeReviewData ? "Review Saved!" : "Congratulations, Lovely!"}
              </h3>
              <p className="text-xs text-charcoal/65 max-w-sm mx-auto leading-relaxed">
                Your Sunday journal entries have been stamped and logged. Reflections are locked in for the week!
              </p>
            </div>

            {/* Summary details card */}
            <div className="bg-[#FAF8F5] border border-beige/45 rounded-2xl p-4.5 text-left space-y-3.5 shadow-2xs">
              <div className="flex justify-between items-center text-xs">
                <span className="text-charcoal/50 font-bold font-sans uppercase text-[9px]">Weekly Title:</span>
                <span className="font-serif font-bold text-rose text-sm">
                  {activeReviewData ? activeReviewData.title : metrics.title}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-charcoal/50 font-bold font-sans uppercase text-[9px]">Completed Workouts:</span>
                <span className="font-serif font-bold text-charcoal text-sm">
                  {activeReviewData ? activeReviewData.completedWorkouts : metrics.completedWorkouts} / 6 ({activeReviewData ? activeReviewData.completionRate : metrics.completionRate}%)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-charcoal/50 font-bold font-sans uppercase text-[9px]">Target Training Phase:</span>
                <span className="font-sans font-bold bg-sage/15 text-charcoal px-2.5 py-0.5 rounded-full border border-sage/10 scale-95 origin-right">
                  Phase {activeReviewData ? activeReviewData.unlockedPhase : (isSubmitted ? (metrics.isEligible ? nextPhase : profile.phase) : profile.phase)}
                </span>
              </div>
              <div className="border-t border-beige/25 pt-3">
                <span className="text-charcoal/50 font-bold font-sans uppercase text-[9px] block mb-1">Your Reflections:</span>
                <p className="text-xs font-serif italic text-charcoal/80 leading-relaxed bg-white p-3 border border-beige/35 rounded-xl shadow-inner">
                  "{currentReflectionValue}"
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-sage border border-sage/10 text-charcoal font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-md hover:shadow-lg active:scale-98 transition-all mt-4"
            >
              Close Journal Page
            </button>
          </div>
        )}

        {/* Historical entries timeline */}
        <div className="mt-8 border-t border-beige/25 pt-4 pl-6 select-none">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 text-[10px] font-bold text-charcoal/60 uppercase tracking-widest cursor-pointer mx-auto"
          >
            <span>Past Sunday Reflections ({Object.keys(sundayReviews).length})</span>
            {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHistory && (
            <div className="mt-4 space-y-4 max-h-48 overflow-y-auto pr-2 scrollbar-none">
              {Object.keys(sundayReviews).length === 0 ? (
                <p className="text-[10px] font-serif text-charcoal/40 italic text-center py-2">No reviews recorded yet.</p>
              ) : (
                Object.values(sundayReviews)
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map(rev => (
                    <div key={rev.date} className="bg-cream/45 border border-beige/35 p-3 rounded-xl space-y-1.5 text-left text-xs relative">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-charcoal">{rev.date}</span>
                        <span className="text-[9px] bg-rose/15 text-charcoal px-2 py-0.5 rounded-full font-bold">{rev.title.split(' ')[0]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[9px] text-charcoal/60 font-medium">
                        <span>Workouts: {rev.completedWorkouts}/6 ({rev.completionRate}%)</span>
                        <span>Weight: {rev.weightChange}</span>
                        <span>Water: {rev.waterDays}/7</span>
                        <span>Check-ins: {rev.checkinDays}/7</span>
                      </div>
                      <p className="text-[10px] font-serif italic text-charcoal/70 border-t border-beige/20 pt-1.5">
                        "{rev.reflection}"
                      </p>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
