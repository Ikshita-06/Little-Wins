import React, { useState, useEffect } from 'react';
import { Check, Settings, Sparkles, Edit3, Plus, Search, Trash2, X } from 'lucide-react';
import { foodDatabase } from '../data/foodDatabase';

function ProgressCircle({ value, target, colorClass, strokeColor, unit, label }) {
  const percentage = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-cream/40 border border-beige/35 rounded-2xl relative select-none flex-1 min-w-[140px]">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-beige/20"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            className={`transition-all duration-500 ease-out`}
            stroke={strokeColor}
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-bold font-serif text-charcoal">{value}</span>
          <span className="text-[10px] text-charcoal/50 font-medium">/ {target} {unit}</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">{label}</span>
        <span className="text-[10px] block text-rose font-semibold mt-0.5">{percentage}% Met</span>
      </div>
    </div>
  );
}

export default function Nutrition({
  profile,
  setProfile,
  simulatedDate,
  nutritionLog,
  setNutritionLog,
  isEditable,
  nutritionEntries = [],
  setNutritionEntries
}) {
  const targetCalories = profile.targetCalories || 1900;
  const targetProtein = profile.targetProtein || 60;

  const [showSettings, setShowSettings] = useState(false);
  const [tempCalories, setTempCalories] = useState(targetCalories);
  const [tempProtein, setTempProtein] = useState(targetProtein);

  // Modal & Search States
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const activeLog = nutritionLog[simulatedDate] || {
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false,
    notes: ""
  };

  useEffect(() => {
    setTempCalories(targetCalories);
    setTempProtein(targetProtein);
  }, [targetCalories, targetProtein]);

  const updateLogField = (field, value) => {
    if (!isEditable) return;
    const dayLog = nutritionLog[simulatedDate] || {
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
      notes: ""
    };

    setNutritionLog({
      ...nutritionLog,
      [simulatedDate]: {
        ...dayLog,
        [field]: value
      }
    });
  };

  const saveTargets = (e) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      targetCalories: Number(tempCalories) || 1900,
      targetProtein: Number(tempProtein) || 60
    }));
    setShowSettings(false);
  };

  // Get current date's entries
  const currentEntries = nutritionEntries.filter(e => e.date === simulatedDate);

  // Group entries by meal type
  const entriesByMeal = {
    Breakfast: currentEntries.filter(e => e.meal === 'Breakfast'),
    Lunch: currentEntries.filter(e => e.meal === 'Lunch'),
    Snack: currentEntries.filter(e => e.meal === 'Snack' || e.meal === 'Snacks'),
    Dinner: currentEntries.filter(e => e.meal === 'Dinner')
  };

  // Calculate totals
  const currentCalories = currentEntries.reduce((sum, e) => sum + (e.calories || 0), 0);
  const currentProtein = currentEntries.reduce((sum, e) => sum + (e.protein || 0), 0);

  const isCalorieGoalMet = currentCalories >= targetCalories;
  const isProteinGoalMet = currentProtein >= targetProtein;

  const caloriePercentage = Math.min(100, Math.round((currentCalories / targetCalories) * 100));
  const proteinPercentage = Math.min(100, Math.round((currentProtein / targetProtein) * 100));

  // Autocomplete suggestions based on query
  const autocompleteSuggestions = searchQuery.trim()
    ? foodDatabase.filter(food =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)
    : [];

  // Filtered food list for browsing when no query
  const categories = ['All', 'Eggs', 'Dairy', 'Protein Sources', 'Rice', 'Roti & Paratha', 'Breakfast', 'Common Meals', 'Sabzis', 'Fruits', 'Snacks', 'Drinks', 'Comfort Foods', 'Sweets'];

  const browsableFoods = foodDatabase.filter(food => {
    if (activeCategoryFilter === 'All') return true;
    return food.category === activeCategoryFilter;
  }).slice(0, 8);

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setSearchQuery('');
    if (food && food.portions) {
      setSelectedPortion(Object.keys(food.portions)[0]);
    }
  };

  const handleAddEntry = () => {
    if (!selectedFood || !isEditable) return;

    const portionData = selectedFood.portions[selectedPortion];
    const newEntry = {
      id: Date.now(),
      food: selectedFood.name,
      portion: selectedPortion,
      calories: portionData.calories,
      protein: portionData.protein,
      meal: selectedMeal,
      date: simulatedDate
    };

    setNutritionEntries(prev => [...prev, newEntry]);

    // Reset Modal
    setSelectedFood(null);
    setSearchQuery('');
    setSelectedPortion('');
    setShowAddModal(false);
  };

  const handleRemoveEntry = (id) => {
    if (!isEditable) return;
    setNutritionEntries(prev => prev.filter(e => e.id !== id));
  };

  const getEmojiForFood = (foodName) => {
    const food = foodDatabase.find(f => f.name.toLowerCase() === foodName.toLowerCase());
    return food ? food.emoji : "🍽";
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 select-none">

      {/* Top Banner and Cozy Intro */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1.5deg] opacity-75"></div>
        <div className="flex-1 space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose/15 text-charcoal text-xs font-semibold border border-rose/10">
            <Sparkles className="w-3.5 h-3.5 text-rose" />
            <span>Cozy Nutrition Space</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
            🍽 Food Journal
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 font-sans max-w-xl">
            "Fuel your growth one meal at a time." 🤍
          </p>
        </div>
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-beige/40 shadow-xs flex-shrink-0">
          <img
            src="/nutrition_aesthetic.png"
            alt="Nutrition aesthetic watercolor"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=60";
            }}
          />
        </div>
      </div>

      {/* Main Grid: Checklist & Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left Side: Progress & Food Cards */}
        <div className="lg:col-span-2 space-y-8">

          {/* Progress Circles Card */}
          <div className="glass-card rounded-3xl p-6 md:p-8 relative space-y-6">
            <div className="washi-tape absolute top-[-6px] left-12 w-16 h-4 rotate-[1.5deg] opacity-60"></div>

            <div className="flex flex-wrap gap-6 justify-center w-full flex-1">
              <ProgressCircle
                value={currentCalories}
                target={targetCalories}
                strokeColor="#E8C5C8"
                unit="kcal"
                label="Calories Consumed"
              />
              <ProgressCircle
                value={currentProtein}
                target={targetProtein}
                strokeColor="#B5C9C0"
                unit="g"
                label="Protein Goal"
              />
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex justify-between items-center border-t border-beige/30">
              <div className="text-[11px] text-charcoal/50 italic">
                Logs feed your daily check-in streaks!
              </div>
              <div className="flex gap-2">
                {isCalorieGoalMet && isProteinGoalMet && (
                  <span className="text-[10px] bg-rose/20 text-charcoal px-2.5 py-1 rounded-full font-bold uppercase border border-rose/10 flex items-center gap-1">
                    🎉 Goals Met!
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-xs bg-cream hover:bg-beige/25 border border-beige text-charcoal/80 px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <Settings className="w-3 h-3" />
                  <span>Targets</span>
                </button>
              </div>
            </div>

            {/* Inline Targets Editor */}
            {showSettings && (
              <form onSubmit={saveTargets} className="mt-6 p-5 border border-beige/40 bg-cream/35 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal/70">Daily Calorie Target (kcal)</label>
                    <input
                      type="number"
                      value={tempCalories}
                      onChange={(e) => setTempCalories(e.target.value)}
                      className="w-full bg-white border border-beige/65 rounded-xl px-3 py-2 text-sm text-charcoal focus:border-rose outline-hidden font-mono"
                      min="500"
                      max="5000"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal/70">Daily Protein Target (g)</label>
                    <input
                      type="number"
                      value={tempProtein}
                      onChange={(e) => setTempProtein(e.target.value)}
                      className="w-full bg-white border border-beige/65 rounded-xl px-3 py-2 text-sm text-charcoal focus:border-rose outline-hidden font-mono"
                      min="10"
                      max="300"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="bg-white border border-beige/40 text-charcoal/60 px-3 py-1 rounded-lg cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose border border-rose/30 text-charcoal font-bold px-3 py-1 rounded-lg cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Add Food Entry Button */}
          {isEditable ? (
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full py-4 bg-rose hover:bg-[#EADBC8]/40 border-2 border-dashed border-[#E8C5C8] hover:border-beige/55 text-charcoal font-serif font-bold rounded-2.5xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-99"
            >
              <Plus className="w-5 h-5" />
              <span>➕ Add Food Entry</span>
            </button>
          ) : (
            <div className="w-full py-3.5 bg-cream/40 border border-dashed border-beige/40 text-charcoal/50 text-xs font-serif text-center rounded-2.5xl">
              📖 Journal entries can only be edited on Today's or Yesterday's pages.
            </div>
          )}

          {/* Meal Lists */}
          <div className="space-y-6">
            {[
              { key: 'Breakfast', label: '🌅 Breakfast', icon: '🌅' },
              { key: 'Lunch', label: '☀️ Lunch', icon: '☀️' },
              { key: 'Snack', label: '🌤 Snacks', icon: '🌤' },
              { key: 'Dinner', label: '🌙 Dinner', icon: '🌙' }
            ].map(mealSection => {
              const meals = entriesByMeal[mealSection.key] || [];
              return (
                <div key={mealSection.key} className="glass-card rounded-3xl p-6 relative space-y-4">
                  <div className="flex items-center justify-between border-b border-beige/30 pb-2">
                    <h3 className="text-lg font-serif text-charcoal flex items-center gap-2 font-bold">
                      <span>{mealSection.label}</span>
                    </h3>
                    <span className="text-[10px] bg-buttercream/50 text-charcoal/70 px-2 py-0.5 rounded-full font-bold font-mono">
                      {meals.length} {meals.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {meals.length === 0 ? (
                    <div className="py-6 border-2 border-dashed border-beige/25 rounded-2xl text-center text-xs text-charcoal/40 font-serif italic">
                      No entries logged for {mealSection.key}.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {meals.map(entry => (
                        <div
                          key={entry.id}
                          className="p-4 bg-cream/35 border border-beige/40 rounded-2.5xl flex items-center justify-between gap-4 hover:shadow-xs transition-all duration-300 relative group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3.5xl" role="img" aria-label="food-emoji">
                              {getEmojiForFood(entry.food)}
                            </span>
                            <div className="space-y-0.5">
                              <h4 className="font-serif font-bold text-charcoal leading-tight text-[14px]">
                                {entry.food}
                              </h4>
                              <span className="text-[9px] bg-rose/10 dark:bg-rose/20 text-charcoal px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block">
                                {entry.portion}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <span className="text-xs font-bold font-mono text-charcoal/80 block">
                                {entry.calories} kcal
                              </span>
                              <span className="text-[9px] font-bold font-mono text-charcoal/50 block">
                                {entry.protein}g protein
                              </span>
                            </div>
                            {isEditable && (
                              <button
                                onClick={() => handleRemoveEntry(entry.id)}
                                className="p-1.5 hover:bg-rose/15 text-rose/65 hover:text-rose rounded-lg cursor-pointer transition-colors"
                                title="Remove Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Sticky Notes Pad */}
        <div className="space-y-6">

          {/* Notes Sticky Note Pad */}
          <div className="bg-rose/30 dark:bg-rose/10 rounded-3xl p-6 border border-rose/25 shadow-xs relative flex flex-col justify-between hover:shadow-sm transition-all duration-300">
            <div className="washi-tape absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-20 h-5 rotate-[1.2deg] opacity-70 bg-rose/40"></div>

            <div className="space-y-3">
              <h4 className="text-lg font-serif italic text-charcoal flex items-center gap-1.5">
                <span>Daily Food Thoughts</span>
                <Edit3 className="w-3.5 h-3.5 text-charcoal/60" />
              </h4>
              <textarea
                value={activeLog.notes || ''}
                onChange={(e) => updateLogField('notes', e.target.value)}
                disabled={!isEditable}
                placeholder={isEditable ? "How did you feel after eating? Any cravings, recipes, or simple self-love thoughts..." : "No food diary notes were recorded."}
                className={`w-full bg-transparent border-0 outline-hidden font-cursive text-[18px] text-charcoal/85 leading-relaxed resize-none min-h-[160px] placeholder-charcoal/40 ${!isEditable ? 'cursor-not-allowed text-charcoal/65' : 'focus:ring-0 focus:outline-hidden'
                  }`}
              />
            </div>

            <div className="font-cursive text-right text-xs text-charcoal/50 mt-4 select-none">
              ~ your nourishment diary
            </div>
          </div>

        </div>

      </div>

      {/* Add Food Entry Modal Overlay */}
      {showAddModal && isEditable && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-charcoal/20 backdrop-blur-xs select-none overflow-y-auto">
          {/* Modal Container */}
          <div className="bg-white dark:bg-[#2A2420] border border-beige/60 shadow-2xl rounded-3xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto journal-bg">

            {/* Binder spiral style loop details */}
            <div className="absolute top-6 bottom-6 left-2 w-4 flex flex-col justify-around pointer-events-none z-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-cream border border-beige/50 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-charcoal/60"></div>
                </div>
              ))}
            </div>

            <div className="washi-tape absolute top-[-6px] left-10 w-24 h-4.5 rotate-[-1.5deg] opacity-80 bg-rose/65"></div>

            {/* Close Button */}
            <button
              onClick={() => {
                setShowAddModal(false);
                setSelectedFood(null);
                setSearchQuery('');
              }}
              className="absolute top-4 right-4 text-charcoal/45 hover:text-charcoal hover:bg-cream/40 p-1.5 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pl-6 pb-2 border-b border-beige/35 mb-4">
              <h3 className="text-xl font-serif text-charcoal font-bold flex items-center gap-1.5">
                <span>🍽 Add Food Entry</span>
              </h3>
            </div>

            {/* Modal Body */}
            <div className="pl-6 space-y-5">

              {/* Search Food Section */}
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/50 block">
                  🍽 What did you eat?
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-charcoal/40" />
                  <input
                    type="text"
                    placeholder="Type food name..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (selectedFood) setSelectedFood(null);
                    }}
                    className="w-full bg-cream border border-beige/65 rounded-xl pl-9 pr-4 py-2 text-xs text-charcoal focus:border-rose focus:ring-1 focus:ring-rose/25 outline-hidden"
                  />
                </div>

                {/* Autocomplete Suggestions Box */}
                {autocompleteSuggestions.length > 0 && (
                  <div className="absolute top-[54px] left-0 right-0 bg-white border border-beige/50 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-beige/20">
                    {autocompleteSuggestions.map(food => (
                      <button
                        key={food.id}
                        type="button"
                        onClick={() => handleSelectFood(food)}
                        className="w-full text-left px-4 py-2 text-xs text-charcoal hover:bg-cream flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span>{food.emoji}</span>
                          <span className="font-bold">{food.name}</span>
                        </span>
                        <span className="text-[9px] bg-buttercream text-charcoal/60 px-2 py-0.5 rounded-full font-bold">
                          {food.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Browse Foods Selector (Shown when no active search or food chosen) */}
              {!selectedFood && !searchQuery.trim() && (
                <div className="space-y-2">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/50 block">
                    ✨ Or browse popular database
                  </label>
                  {/* Category Pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none flex-nowrap mask-right">
                    {categories.slice(0, 7).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategoryFilter(cat)}
                        className={`text-[9px] font-bold px-2.5 py-1 rounded-full cursor-pointer flex-shrink-0 transition-all ${activeCategoryFilter === cat
                            ? 'bg-rose text-charcoal border border-rose/30 shadow-2xs font-extrabold'
                            : 'bg-cream text-charcoal/60 border border-beige/40'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {/* Category Foods Grid */}
                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                    {browsableFoods.map(food => (
                      <button
                        key={food.id}
                        type="button"
                        onClick={() => handleSelectFood(food)}
                        className="p-2 border border-beige/35 bg-cream/40 rounded-xl text-left text-[11px] text-charcoal hover:bg-cream hover:border-rose/25 flex items-center gap-2 cursor-pointer transition-all hover:translate-x-0.5"
                      >
                        <span>{food.emoji}</span>
                        <span className="font-semibold truncate">{food.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Food Info & Portion Section */}
              {selectedFood && (
                <div className="space-y-4">

                  {/* Food Badge */}
                  <div className="p-3 bg-cream/45 border border-beige/40 rounded-xl flex items-center gap-2.5 shadow-2xs">
                    <span className="text-3xl">{selectedFood.emoji}</span>
                    <div>
                      <h4 className="font-serif font-bold text-charcoal leading-tight text-sm">
                        {selectedFood.name}
                      </h4>
                      <span className="text-[9px] bg-buttercream text-charcoal/60 px-2 py-0.5 rounded-full font-bold">
                        {selectedFood.category}
                      </span>
                    </div>
                  </div>

                  {/* Portion Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/50 block">
                      Portion Size
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.keys(selectedFood.portions).map(port => {
                        const pData = selectedFood.portions[port];
                        const isActive = selectedPortion === port;
                        return (
                          <button
                            key={port}
                            type="button"
                            onClick={() => setSelectedPortion(port)}
                            className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-0.5 cursor-pointer text-center transition-all ${isActive
                                ? 'bg-sage border-sage text-charcoal shadow-2xs font-bold scale-102'
                                : 'bg-cream border-beige/40 text-charcoal/70'
                              }`}
                          >
                            <span className="text-[11px] uppercase tracking-wider font-extrabold">{port}</span>
                            <span className="text-[9px] font-mono opacity-80">{pData.calories} kcal • {pData.protein}g protein</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Meal Type Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/50 block">
                      Meal Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'Breakfast', label: '🌅 Breakfast' },
                        { key: 'Lunch', label: '☀️ Lunch' },
                        { key: 'Snack', label: '🌤 Snack' },
                        { key: 'Dinner', label: '🌙 Dinner' }
                      ].map(mealType => {
                        const isActive = selectedMeal === mealType.key;
                        return (
                          <button
                            key={mealType.key}
                            type="button"
                            onClick={() => setSelectedMeal(mealType.key)}
                            className={`py-2 px-1 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${isActive
                                ? 'bg-rose border-rose text-charcoal shadow-2xs font-bold'
                                : 'bg-cream border-beige/40 text-charcoal/70'
                              }`}
                          >
                            {mealType.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Preview Display Box */}
                  <div className="bg-cream border border-dashed border-beige/70 p-3.5 rounded-2xl space-y-1 text-center select-none shadow-inner">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/45 block mb-1">
                      Live Preview 🌷
                    </span>
                    <h5 className="font-serif font-bold text-charcoal leading-tight text-sm">
                      {selectedFood.name}
                    </h5>
                    <p className="text-[10px] text-charcoal/60 font-semibold uppercase">
                      {selectedPortion}
                    </p>
                    <div className="flex justify-center gap-4 pt-1 text-xs">
                      <span className="font-bold font-mono text-charcoal">
                        Calories: {selectedFood.portions[selectedPortion]?.calories || 0} kcal
                      </span>
                      <span className="font-bold font-mono text-charcoal">
                        Protein: {selectedFood.portions[selectedPortion]?.protein || 0}g
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleAddEntry}
                    className="w-full py-3 bg-sage hover:bg-sage/90 border border-sage/20 text-charcoal font-serif font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-98 transition-all"
                  >
                    <span>Add To Journal 🌷</span>
                  </button>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
