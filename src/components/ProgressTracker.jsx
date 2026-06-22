import { useState, useEffect } from 'react';
import { 
  Scale, 
  Ruler, 
  Trash2, 
  Settings, 
  Calendar, 
  Edit3,
  Check,
  AlertCircle,
  Heart,
  Droplet,
  Dumbbell,
  Lock,
  Unlock,
  Sparkles,
  Leaf,
  Flame,
  Award
} from 'lucide-react';

const IN_TO_CM = 2.54;

// Helper to convert inches to display value (cm or in)
const toDisplay = (val, unit) => {
  if (val === undefined || val === null || val === '') return '';
  if (unit === 'cm') {
    return Math.round(Number(val) * IN_TO_CM * 10) / 10;
  }
  return Math.round(Number(val) * 10) / 10;
};

// Helper to convert input value back to stored inches
const toStored = (val, unit) => {
  if (val === undefined || val === null || val === '') return '';
  if (unit === 'cm') {
    return Math.round((Number(val) / IN_TO_CM) * 100) / 100;
  }
  return Math.round(Number(val) * 100) / 100;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr + 'T00:00:00');
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Binder Rings decoration to look like spiral notebook binder rings on the left side of cards
function BinderRings() {
  return (
    <div className="absolute left-0 top-6 bottom-6 w-2.5 flex flex-col justify-around pointer-events-none z-15 select-none">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-5 h-2.5 rounded-full binder-ring -ml-2.5 border border-beige/40"></div>
      ))}
    </div>
  );
}

// Decorative punch holes for binder cards
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

function getAestheticIllustration(label) {
  const cleanLabel = (label || '').toLowerCase();
  if (cleanLabel === 'waist') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-rose stroke-current" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M12 6c3 0 4-2 4-2s-1.5 3-4 3" />
        <path d="M12 11c-3 0-4-2-4-2s1.5 3 4 3" />
        <path d="M12 16c3 0 4-2 4-2s-1.5 3-4 3" />
      </svg>
    );
  }
  if (cleanLabel === 'chest') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-sage stroke-current" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8" />
        <path d="M12 8c2-2 3-5 0-6-3 1-2 4 0 6z" />
        <path d="M12 13c-2-1.5-4-1.5-4 0.5s2 2 4 1" />
        <path d="M12 16c2-1.5 4-1.5 4 0.5s-2 2-4 1" />
      </svg>
    );
  }
  if (cleanLabel === 'hips') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-honey stroke-current" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20c8-4 12-10 14-16" />
        <path d="M9 13c2-2 4-1 4-1" />
        <path d="M13 8c2-2 4-1 4-1" />
        <path d="M6 17c1.5-1.5 3-1 3-1" />
      </svg>
    );
  }
  if (cleanLabel === 'thigh') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#9E8A5D]/75 stroke-current" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="1.5" />
        <path d="M12 8.5V22" />
        <path d="M12 12c-2.5-1-3.5-3.5-2-5.5 1.5 2 2 4.5 2 5.5z" />
        <path d="M12 12c2.5-1 3.5-3.5 2-5.5-1.5 2-2 4.5-2 5.5z" />
      </svg>
    );
  }
  if (cleanLabel === 'wrist') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-rose stroke-current" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-charcoal/30 stroke-current" fill="none" strokeWidth="1.2">
      <path d="M12 2v20M17 5H7" />
    </svg>
  );
}

// Polaroid Card component for current measurements (Minimal typography card, botanical sketch, no emojis)
function PolaroidCard({ label, value, change, tapeColor = 'bg-rose/30', rotate = 'rotate-0', unit = 'in', labelColor = 'bg-rose/5' }) {
  return (
    <div className={`bg-white p-3 pb-4 rounded-xl shadow-xs border border-beige/40 flex flex-col items-center justify-between text-center relative ${rotate} transition-all hover:rotate-0 duration-300 hover:scale-102 hover:shadow-sm`}>
      {/* Washi tape at the top */}
      <div className={`washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 ${tapeColor} opacity-85`}></div>
      
      {/* Polaroid photo square area - line art & typography card */}
      <div className={`w-full aspect-square rounded-md border border-beige/15 flex flex-col items-center justify-center mb-2.5 relative overflow-hidden ${labelColor} p-2`}>
        <div className="flex-1 flex items-center justify-center">
          {getAestheticIllustration(label)}
        </div>
        <span className="text-[10px] font-serif font-bold italic tracking-wide text-charcoal/80 mt-1">{label}</span>
      </div>
      
      {/* Polaroid bottom margin area */}
      <div className="space-y-0.5">
        <span className="text-xs font-bold font-mono text-charcoal block">
          {value ? `${value} ${unit}` : '--'}
        </span>
        {change && change.diffStr !== '0' && (
          <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
            change.type === 'gain' ? 'bg-sage/25 text-charcoal font-bold' : 'bg-rose/20 text-charcoal font-bold'
          }`}>
            {change.diffStr}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProgressTracker({
  profile,
  setProfile,
  measurementsLog,
  setMeasurementsLog,
  simulatedDate,
  waterLog,
  workoutLog
}) {
  // Goal Settings
  const startingWeight = profile.startingWeight || 40;
  const targetWeight = profile.goalWeight || 45;
  const currentWeight = profile.weight || 40;

  const [showSettings, setShowSettings] = useState(false);
  const [tempStartWeight, setTempStartWeight] = useState(startingWeight);
  const [tempGoalWeight, setTempGoalWeight] = useState(targetWeight);

  // Unit System for body measurements: 'in' or 'cm' (Weight is always kg)
  const [measurementUnit, setMeasurementUnit] = useState('in');

  // Form states
  const [weightInput, setWeightInput] = useState('');
  const [waistInput, setWaistInput] = useState('');
  const [chestInput, setChestInput] = useState('');
  const [hipsInput, setHipsInput] = useState('');
  const [thighInput, setThighInput] = useState('');
  const [wristInput, setWristInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  // UI States
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', '30days', '7days'
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [deleteConfirmDate, setDeleteConfirmDate] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Sync state with selected simulatedDate change
  useEffect(() => {
    const existing = measurementsLog.find(m => m.date === simulatedDate);
    if (existing) {
      setWeightInput(existing.weight || '');
      setWaistInput(toDisplay(existing.waist, measurementUnit));
      setChestInput(toDisplay(existing.chest, measurementUnit));
      setHipsInput(toDisplay(existing.hips, measurementUnit));
      setThighInput(toDisplay(existing.thigh, measurementUnit));
      setWristInput(toDisplay(existing.wrist, measurementUnit));
      setNoteInput(existing.notes || '');
    } else {
      setWeightInput('');
      setWaistInput('');
      setChestInput('');
      setHipsInput('');
      setThighInput('');
      setWristInput('');
      setNoteInput('');
    }
  }, [simulatedDate, measurementsLog, measurementUnit]);

  // Adjust Goals handler
  const handleSaveGoals = (e) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      startingWeight: Number(tempStartWeight) || 40,
      goalWeight: Number(tempGoalWeight) || 45
    }));
    setShowSettings(false);
  };

  // Sync Profile Weight helper
  const syncProfileWeight = (updatedLogs) => {
    const sorted = [...updatedLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sorted.length > 0) {
      const latest = sorted[sorted.length - 1];
      setProfile(prev => ({
        ...prev,
        weight: latest.weight || prev.weight
      }));
    }
  };

  // Save/Update log
  const handleSaveLog = (e) => {
    e.preventDefault();
    if (!weightInput) {
      alert('Please enter a weight log.');
      return;
    }

    const newLogEntry = {
      date: simulatedDate,
      weight: Number(weightInput),
      waist: toStored(waistInput, measurementUnit),
      chest: toStored(chestInput, measurementUnit),
      hips: toStored(hipsInput, measurementUnit),
      thigh: toStored(thighInput, measurementUnit),
      wrist: toStored(wristInput, measurementUnit),
      notes: noteInput.trim()
    };

    const existingIndex = measurementsLog.findIndex(m => m.date === simulatedDate);
    let updatedLogs = [...measurementsLog];

    if (existingIndex >= 0) {
      updatedLogs[existingIndex] = newLogEntry;
    } else {
      updatedLogs.push(newLogEntry);
    }

    setMeasurementsLog(updatedLogs);
    syncProfileWeight(updatedLogs);

    setSaveSuccessMsg('Measurements saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Delete log
  const handleDeleteLog = (dateToDelete) => {
    const updatedLogs = measurementsLog.filter(m => m.date !== dateToDelete);
    setMeasurementsLog(updatedLogs);
    syncProfileWeight(updatedLogs);
    setDeleteConfirmDate(null);

    if (dateToDelete === simulatedDate) {
      setWeightInput('');
      setWaistInput('');
      setChestInput('');
      setHipsInput('');
      setThighInput('');
      setWristInput('');
      setNoteInput('');
    }
  };

  // Handle unit toggle & convert current input numbers in state to avoid stale inputs
  const handleUnitToggle = (newUnit) => {
    if (newUnit === measurementUnit) return;
    setWaistInput(prev => prev ? String(toDisplay(toStored(prev, measurementUnit), newUnit)) : '');
    setChestInput(prev => prev ? String(toDisplay(toStored(prev, measurementUnit), newUnit)) : '');
    setHipsInput(prev => prev ? String(toDisplay(toStored(prev, measurementUnit), newUnit)) : '');
    setThighInput(prev => prev ? String(toDisplay(toStored(prev, measurementUnit), newUnit)) : '');
    setWristInput(prev => prev ? String(toDisplay(toStored(prev, measurementUnit), newUnit)) : '');
    setMeasurementUnit(newUnit);
  };

  // Prep chronological data for chart and history
  const sortedData = [...measurementsLog]
    .filter(d => d.weight !== undefined && d.weight !== null)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Date filtering for Weight Trajectory chart
  const activeSimDate = new Date(simulatedDate + 'T00:00:00');
  const filteredData = sortedData.filter(item => {
    if (timeFilter === 'all') return true;
    const itemDate = new Date(item.date + 'T00:00:00');
    const diffTime = activeSimDate - itemDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (timeFilter === '30days') return diffDays >= 0 && diffDays <= 30;
    if (timeFilter === '7days') return diffDays >= 0 && diffDays <= 7;
    return true;
  });

  // Calculate changes & ratios
  const totalJourneyRange = Math.abs(targetWeight - startingWeight);
  const currentProgress = totalJourneyRange > 0
    ? Math.abs(currentWeight - startingWeight)
    : 0;
  const progressPercent = totalJourneyRange > 0
    ? Math.min(100, Math.max(0, Math.round((currentProgress / totalJourneyRange) * 100)))
    : 0;

  const isGaining = targetWeight >= startingWeight;
  const remainingToGoal = isGaining 
    ? (targetWeight - currentWeight).toFixed(1)
    : (currentWeight - targetWeight).toFixed(1);

  // Stepping vine weights
  const stepWeight = (targetWeight - startingWeight) / 4;
  const stone1 = startingWeight;
  const stone2 = startingWeight + stepWeight;
  const stone3 = startingWeight + stepWeight * 2;
  const stone4 = startingWeight + stepWeight * 3;
  const stone5 = targetWeight;

  // SVG Progress coordinates (straight line track)
  const stemCoords = [
    { x: 50, y: 40 },
    { x: 150, y: 40 },
    { x: 250, y: 40 },
    { x: 350, y: 40 },
    { x: 450, y: 40 }
  ];

  const getButterflyPos = () => {
    const ratio = totalJourneyRange > 0
      ? Math.max(0, Math.min(1, currentProgress / totalJourneyRange))
      : 0;

    const segmentProgress = ratio * 4;
    const segmentIndex = Math.floor(segmentProgress);
    const localRatio = segmentProgress - segmentIndex;

    const p1 = stemCoords[segmentIndex];
    const p2 = stemCoords[Math.min(4, segmentIndex + 1)];

    return {
      x: p1.x + (p2.x - p1.x) * localRatio,
      y: p1.y + (p2.y - p1.y) * localRatio
    };
  };

  const butterflyPos = getButterflyPos();

  // --- Helper to calculate differences between consecutive entries in sorted timeline list ---
  const getPrevDiff = (currentItem, index, field, unit = 'in') => {
    const chronological = [...measurementsLog]
      .filter(d => d[field] !== undefined && d[field] !== null && d[field] !== '')
      .sort((a, b) => new Date(a.date) - new Date(b.date));
      
    const currentIdx = chronological.findIndex(d => d.date === currentItem.date);
    if (currentIdx <= 0) return null; // No previous log to compare to
    
    const prevItem = chronological[currentIdx - 1];
    const currentVal = Number(currentItem[field]);
    const prevVal = Number(prevItem[field]);
    
    const diff = currentVal - prevVal;
    if (Math.abs(diff) < 0.01) return { diffStr: '0', type: 'none' };
    
    if (field === 'weight') {
      const diffStr = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} kg`;
      return { diffStr, type: diff > 0 ? 'gain' : 'loss' };
    } else {
      const displayDiff = unit === 'cm' ? diff * IN_TO_CM : diff;
      const diffStr = `${displayDiff >= 0 ? '+' : ''}${displayDiff.toFixed(1)} ${unit}`;
      return { diffStr, type: displayDiff > 0 ? 'gain' : 'loss' };
    }
  };

  // Get current dimension values from active date
  const latestLog = sortedData[sortedData.length - 1] || {};
  const previousLog = sortedData[sortedData.length - 2] || null;

  const getCurrentDimensionChange = (field) => {
    if (!latestLog[field]) return null;
    if (!previousLog || !previousLog[field]) return null;
    const diff = Number(latestLog[field]) - Number(previousLog[field]);
    if (Math.abs(diff) < 0.01) return { diffStr: '0', type: 'none' };
    const displayDiff = measurementUnit === 'cm' ? diff * IN_TO_CM : diff;
    return {
      diffStr: `${displayDiff >= 0 ? '+' : ''}${displayDiff.toFixed(1)} ${measurementUnit}`,
      type: displayDiff > 0 ? 'gain' : 'loss'
    };
  };

  // --- 🫶 WEEKLY SNAPSHOT CALCULATIONS ---
  const activeDateObj = new Date(simulatedDate + 'T00:00:00');
  const getNDaysAgoStr = (days) => {
    const d = new Date(activeDateObj.getTime() - days * 24 * 60 * 60 * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const last7DaysKeys = [];
  for (let i = 0; i < 7; i++) {
    last7DaysKeys.push(getNDaysAgoStr(i));
  }

  // Workouts done in last 7 days
  let weeklyWorkouts = 0;
  last7DaysKeys.forEach(k => {
    if (workoutLog && workoutLog[k] && workoutLog[k].completed) {
      weeklyWorkouts++;
    }
  });

  // Water completion rate (days >= 6 drops)
  let weeklyWaterDays = 0;
  last7DaysKeys.forEach(k => {
    if (waterLog && waterLog[k] && waterLog[k] >= 6) {
      weeklyWaterDays++;
    }
  });

  // Weight & measurements differences in last 7 days
  const sevenDaysAgoDate = new Date(activeDateObj.getTime() - 7 * 24 * 60 * 60 * 1000);
  const logsLast7Days = sortedData.filter(d => {
    const dDate = new Date(d.date + 'T00:00:00');
    return dDate >= sevenDaysAgoDate && dDate <= activeDateObj;
  });

  let weeklyWeightDiff = '0.0 kg';
  let weeklyWaistDiff = '0.0 in';
  let weeklyHipsDiff = '0.0 in';
  let wtDiffVal = 0;
  let waistDiffVal = 0;
  let hipsDiffVal = 0;

  if (logsLast7Days.length >= 2) {
    const oldest = logsLast7Days[0];
    const newest = logsLast7Days[logsLast7Days.length - 1];

    wtDiffVal = newest.weight - oldest.weight;
    weeklyWeightDiff = `${wtDiffVal >= 0 ? '+' : ''}${wtDiffVal.toFixed(1)} kg`;

    if (newest.waist !== undefined && oldest.waist !== undefined) {
      const wDiffInches = newest.waist - oldest.waist;
      waistDiffVal = measurementUnit === 'cm' ? wDiffInches * IN_TO_CM : wDiffInches;
      weeklyWaistDiff = `${waistDiffVal >= 0 ? '+' : ''}${waistDiffVal.toFixed(1)} ${measurementUnit}`;
    }
    if (newest.hips !== undefined && oldest.hips !== undefined) {
      const hDiffInches = newest.hips - oldest.hips;
      hipsDiffVal = measurementUnit === 'cm' ? hDiffInches * IN_TO_CM : hDiffInches;
      weeklyHipsDiff = `${hipsDiffVal >= 0 ? '+' : ''}${hipsDiffVal.toFixed(1)} ${measurementUnit}`;
    }
  }

  // SVG Chart Setup
  const svgWidth = 500;
  const svgHeight = 240;
  const margin = { top: 20, right: 80, bottom: 35, left: 40 };

  const chartPoints = [];
  let linePath = '';
  let areaPath = '';
  let yTicks = [];
  let goalY = 0;

  if (filteredData.length > 0) {
    const dates = filteredData.map(d => new Date(d.date + 'T00:00:00').getTime());
    const minX = Math.min(...dates);
    const maxX = Math.max(...dates);

    const weights = filteredData.map(d => d.weight);
    const allWeights = [...weights, targetWeight, startingWeight];
    const minYValue = Math.min(...allWeights) - 1.0;
    const maxYValue = Math.max(...allWeights) + 1.0;

    const heightSpan = svgHeight - margin.top - margin.bottom;
    const getY = (w) => {
      if (maxYValue === minYValue) {
        return margin.top + heightSpan / 2;
      }
      return margin.top + (1 - (w - minYValue) / (maxYValue - minYValue)) * heightSpan;
    };

    const getX = (time) => {
      if (maxX === minX) {
        return margin.left + (svgWidth - margin.left - margin.right) / 2;
      }
      return margin.left + ((time - minX) / (maxX - minX)) * (svgWidth - margin.left - margin.right);
    };

    filteredData.forEach(item => {
      const time = new Date(item.date + 'T00:00:00').getTime();
      const x = getX(time);
      const y = getY(item.weight);
      chartPoints.push({ x, y, data: item });
    });

    chartPoints.sort((a, b) => a.x - b.x);

    linePath = chartPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');
    
    if (chartPoints.length > 0) {
      areaPath = `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${svgHeight - margin.bottom} L ${chartPoints[0].x} ${svgHeight - margin.bottom} Z`;
    }

    const startTick = Math.floor(minYValue);
    const endTick = Math.ceil(maxYValue);
    const step = Math.ceil((endTick - startTick) / 5) || 1;
    for (let w = startTick; w <= endTick; w += step) {
      yTicks.push({ val: w, y: getY(w) });
    }

    goalY = getY(targetWeight);
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 select-none">
      
      {/* Top Banner & Softer Journey Tagline */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="washi-tape absolute top-0 left-10 w-24 h-5 rotate-[-1.5deg] opacity-75 bg-sage/65"></div>
        
        <div className="flex-1 space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 text-charcoal text-xs font-semibold border border-sage/10 font-sans">
            <Leaf className="w-3.5 h-3.5 text-sage fill-sage/25" />
            <span>Your Weight Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
            Every Step Matters
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 font-sans max-w-xl">
            Every small step counts. Growth takes time, and you're doing wonderfully.
          </p>
        </div>
 
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-beige/40 shadow-xs flex-shrink-0 order-first md:order-none mx-auto md:mx-0">
          <img 
            src="/progress_aesthetic.png" 
            alt="Weight progress watercolor illustration" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=200&auto=format&fit=crop&q=60";
            }}
          />
        </div>
      </div>
 
      {/* Stats as Scrapbook Pinned Memo Notes & Flower-Stem Progress Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left 2 Cols: Stepping Flower Stem Progress */}
        <div className="md:col-span-2 glass-card rounded-3xl p-6 flex flex-col justify-between relative journal-bg">
          <div className="washi-tape absolute top-[-8px] left-10 w-20 h-4 rotate-[1deg] opacity-70 bg-sage/40"></div>
          <BinderHoles />
          
          <div className="pl-6 flex justify-between items-center text-xs font-semibold text-charcoal/65 mb-2 font-sans">
            <span>Weight Journey Track</span>
            <span className="text-sage font-bold">{progressPercent}% Blooming</span>
          </div>
 
          {/* Stepping Progress Timeline (Straight clean bar track) */}
          <div className="relative w-full py-4 pl-6">
            <svg viewBox="0 0 500 80" className="w-full h-full">
              {/* Background track line */}
              <line 
                x1="50" 
                y1="40" 
                x2="450" 
                y2="40" 
                stroke="#EADBC8" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              
              {/* Filled active track line */}
              <line 
                x1="50" 
                y1="40" 
                x2={50 + 400 * (totalJourneyRange > 0 ? Math.max(0, Math.min(1, currentProgress / totalJourneyRange)) : 0)} 
                y2="40" 
                stroke="#B5C9C0" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              
              {/* Timeline checkpoints */}
              {[
                { label: 'Start', val: stone1 },
                { label: '25%', val: stone2 },
                { label: '50%', val: stone3 },
                { label: '75%', val: stone4 },
                { label: 'Goal', val: stone5 }
              ].map((node, idx) => {
                const coord = stemCoords[idx];
                const isReached = isGaining ? (currentWeight >= node.val) : (currentWeight <= node.val);
                return (
                  <g key={idx}>
                    {/* Solid circular node */}
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r="5" 
                      fill={isReached ? "#B5C9C0" : "#FFFFFF"} 
                      stroke={isReached ? "#9AB0A6" : "#EADBC8"}
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    {/* Label above */}
                    <text 
                      x={coord.x} 
                      y={coord.y - 12} 
                      textAnchor="middle" 
                      className="text-[9.5px] font-bold fill-charcoal/60 uppercase tracking-wider font-sans"
                    >
                      {node.label}
                    </text>
                    {/* Value below */}
                    <text 
                      x={coord.x} 
                      y={coord.y + 18} 
                      textAnchor="middle" 
                      className="text-[9px] font-mono fill-charcoal/50 font-medium"
                    >
                      {node.val.toFixed(1)}kg
                    </text>
                  </g>
                );
              })}
 
              {/* Glowing progress glider dot */}
              <g transform={`translate(${butterflyPos.x}, ${butterflyPos.y})`}>
                <circle 
                  cx="0" 
                  cy="0" 
                  r="8" 
                  fill="rgba(181, 201, 192, 0.45)" 
                />
                <circle 
                  cx="0" 
                  cy="0" 
                  r="4.5" 
                  fill="#B5C9C0" 
                  stroke="#FFFFFF" 
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>
 
          <div className="pl-6 pt-2 flex justify-between text-[10px] text-charcoal/45 italic font-cursive text-sm">
            <span>Beginning of journey...</span>
            <span>{Number(remainingToGoal) > 0 ? `${remainingToGoal} kg left to reach your goal!` : 'Goal reached! Wonderful progress!'}</span>
          </div>
        </div>
 
        {/* Right 1 Col: Pinned Polaroid Stats Cards */}
        <div className="flex justify-around items-center gap-4 bg-cream/35 border border-beige/40 p-4 rounded-3xl relative">
          <div className="washi-tape absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-4.5 rotate-[-2deg] opacity-75 bg-sage/40"></div>
          
          {/* Starting Polaroid Card */}
          <div className="bg-white p-2 pb-4 rounded-lg shadow-xs border border-beige/40 rotate-[-4deg] flex flex-col items-center flex-1 max-w-[80px]">
            <span className="text-[9px] text-charcoal/50 font-bold uppercase tracking-tight font-sans">Starting</span>
            <span className="text-sm font-bold font-serif text-charcoal mt-1">{startingWeight}</span>
            <span className="text-[8px] text-charcoal/40 font-mono mt-0.5">kg</span>
          </div>
 
          {/* Current Polaroid Card */}
          <div className="bg-white p-2 pb-4 rounded-lg shadow-sm border border-sage/40 rotate-[2deg] flex flex-col items-center scale-105 flex-1 max-w-[85px] z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-sage/40 absolute top-1"></div>
            <span className="text-[9px] text-sage font-bold uppercase tracking-tight font-sans">Current</span>
            <span className="text-base font-extrabold font-serif text-charcoal mt-1">{currentWeight}</span>
            <span className="text-[8px] text-charcoal/40 font-mono mt-0.5">kg</span>
          </div>
 
          {/* Goal Polaroid Card */}
          <div className="bg-white p-2 pb-4 rounded-lg shadow-xs border border-beige/40 rotate-[-1deg] flex flex-col items-center flex-1 max-w-[80px]">
            <span className="text-[9px] text-sage font-bold uppercase tracking-tight font-sans">Goal</span>
            <span className="text-sm font-bold font-serif text-charcoal mt-1">{targetWeight}</span>
            <span className="text-[8px] text-charcoal/40 font-mono mt-0.5">kg</span>
          </div>
 
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute right-2 bottom-2 p-1.5 bg-white hover:bg-cream border border-beige/55 rounded-lg text-charcoal/50 hover:text-charcoal transition-colors cursor-pointer"
            title="Adjust goals"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
 
      </div>
 
      {/* Edit Goals Panel */}
      {showSettings && (
        <div className="relative p-5 border border-beige/40 bg-cream/35 rounded-2xl space-y-4 max-w-md mx-auto">
          <div className="washi-tape absolute top-[-6px] left-8 w-16 h-4 rotate-[-1deg] opacity-70 bg-sage/55"></div>
          <form onSubmit={handleSaveGoals} className="space-y-4">
            <h4 className="text-sm font-bold font-serif text-charcoal">Update Journey Goals</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-charcoal/70 uppercase font-sans">Starting Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tempStartWeight}
                  onChange={(e) => setTempStartWeight(e.target.value)}
                  className="w-full bg-white border border-beige/65 rounded-xl px-3 py-1.5 text-xs text-charcoal outline-hidden font-mono"
                  min="20"
                  max="200"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-charcoal/70 uppercase font-sans">Target Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tempGoalWeight}
                  onChange={(e) => setTempGoalWeight(e.target.value)}
                  className="w-full bg-white border border-beige/65 rounded-xl px-3 py-1.5 text-xs text-charcoal outline-hidden font-mono"
                  min="20"
                  max="200"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="bg-white text-charcoal/60 px-3 py-1.5 rounded-xl border border-beige/40"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-rose hover:bg-rose/90 text-charcoal font-semibold px-3 py-1.5 rounded-xl border border-rose/30"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
 
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-cream border border-sage rounded-2xl p-4 shadow-lg flex items-center gap-3 animate-bounce-soft">
          <div className="w-2.5 h-full absolute left-0 top-0 bottom-0 bg-sage rounded-l-2xl"></div>
          <span className="text-xl">📏</span>
          <span className="text-xs font-medium text-charcoal font-sans">{saveSuccessMsg}</span>
        </div>
      )}
 
      {/* Two-Column Masonry Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN STACK (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Weight Trajectory Chart Card */}
          <div className="glass-card rounded-3xl p-6 md:p-8 relative journal-bg">
            <div className="washi-tape absolute top-[-8px] left-12 w-20 h-4.5 rotate-[-1deg] opacity-75 bg-sage/40"></div>
            <BinderHoles />
            
            <div className="pl-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-serif text-charcoal">Weight Trajectory</h3>
                <p className="text-xs text-charcoal/50 font-sans">Tracking your muscle and weight development</p>
              </div>
 
              {/* Timeframe Filter Options */}
              <div className="flex bg-cream border border-beige/50 p-1 rounded-xl gap-1 text-xs font-sans">
                {[
                  { id: 'all', label: 'All Time' },
                  { id: '30days', label: 'Last 30 Days' },
                  { id: '7days', label: 'Last 7 Days' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTimeFilter(opt.id)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      timeFilter === opt.id 
                        ? 'bg-sage text-charcoal font-semibold shadow-xs' 
                        : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
 
            {/* SVG Chart Area */}
            <div className="relative w-full h-[250px] bg-white/40 border border-beige/25 rounded-2xl overflow-hidden p-2 flex items-center justify-center ml-4">
              {filteredData.length === 0 ? (
                <div className="text-center p-6 text-charcoal/50 max-w-sm font-sans">
                  <AlertCircle className="w-8 h-8 text-sage/60 mx-auto mb-2" />
                  <p className="font-serif font-semibold text-sm text-charcoal">No measurements recorded yet</p>
                  <p className="text-xs mt-1 text-charcoal/60">Use the log form on the right to log your weights. They will instantly visualise here!</p>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <svg 
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                    className="w-full h-full"
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B5C9C0" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#B5C9C0" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
 
                    {/* Y Gridlines */}
                    {yTicks.map((tick, i) => (
                      <g key={i}>
                        <line 
                          x1={margin.left} 
                          y1={tick.y} 
                          x2={svgWidth - margin.right} 
                          y2={tick.y} 
                          stroke="#EADBC8" 
                          strokeWidth="1" 
                          strokeDasharray="3 3"
                          strokeOpacity="0.6"
                        />
                        <text 
                          x={margin.left - 8} 
                          y={tick.y + 3} 
                          textAnchor="end" 
                          className="text-[10px] font-mono fill-charcoal/50 font-medium"
                        >
                          {tick.val}
                        </text>
                      </g>
                    ))}
 
                    {/* Target Weight line */}
                    {goalY > 0 && (
                      <g>
                        <line 
                          x1={margin.left} 
                          y1={goalY} 
                          x2={svgWidth - margin.right} 
                          y2={goalY} 
                          stroke="#B5C9C0" 
                          strokeWidth="1.5" 
                          strokeDasharray="5 3"
                        />
                        <text 
                          x={svgWidth - margin.right + 6} 
                          y={goalY + 3} 
                          textAnchor="start" 
                          className="text-[10px] font-bold fill-sage uppercase tracking-wider font-sans"
                        >
                          Goal: {targetWeight}kg
                        </text>
                      </g>
                    )}
 
                    {/* Area under the line */}
                    {areaPath && (
                      <path 
                        d={areaPath} 
                        fill="url(#areaGradient)" 
                        className="transition-all duration-500"
                      />
                    )}
 
                    {/* Trajectory Curve Line */}
                    {linePath && (
                      <path 
                        d={linePath} 
                        fill="none" 
                        stroke="#B5C9C0" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="transition-all duration-500"
                      />
                    )}
 
                    {/* Minimal aesthetic circular data points (No emojis, using warm gold and sage) */}
                    {chartPoints.map((pt, i) => {
                      const isToday = pt.data.date === simulatedDate;
                      return (
                        <g key={i}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isToday ? "6.5" : "4.5"}
                            fill={isToday ? "#E8C08A" : "#B5C9C0"}
                            stroke={isToday ? "#423E3A" : "#FFFFFF"}
                            strokeWidth="1.5"
                            className="cursor-pointer transition-all duration-300 hover:scale-130"
                            onMouseEnter={() => setHoveredPoint(pt)}
                          />
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r="14" 
                            fill="transparent" 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredPoint(pt)}
                          />
                        </g>
                      );
                    })}
 
                    {/* X Axis Date labels */}
                    {chartPoints.length > 0 && (() => {
                      const labelsToDraw = [];
                      if (chartPoints.length === 1) {
                        labelsToDraw.push(chartPoints[0]);
                      } else if (chartPoints.length <= 5) {
                        labelsToDraw.push(...chartPoints);
                      } else {
                        labelsToDraw.push(chartPoints[0]);
                        const step = Math.floor(chartPoints.length / 3);
                        labelsToDraw.push(chartPoints[step]);
                        labelsToDraw.push(chartPoints[step * 2]);
                        labelsToDraw.push(chartPoints[chartPoints.length - 1]);
                      }
 
                      return labelsToDraw.map((pt, i) => (
                        <text
                          key={i}
                          x={pt.x}
                          y={svgHeight - 12}
                          textAnchor="middle"
                          className="text-[9px] font-semibold fill-charcoal/45 font-sans"
                        >
                          {formatDate(pt.data.date).split(',')[0]}
                        </text>
                      ));
                    })()}
                  </svg>
 
                  {/* Absolute Positioned Tooltip */}
                  {hoveredPoint && (
                    <div 
                      className="absolute bg-white border border-beige/70 p-3 rounded-2xl shadow-lg pointer-events-none z-30 flex flex-col gap-1 w-32 transition-all duration-150"
                      style={{ 
                        left: `${Math.min(svgWidth - 140, Math.max(10, (hoveredPoint.x / svgWidth) * 100))}%`, 
                        top: `${Math.max(10, ((hoveredPoint.y - 75) / svgHeight) * 100)}%`,
                      }}
                    >
                      <div className="text-[10px] font-bold text-charcoal/50 uppercase font-sans">
                        {formatDate(hoveredPoint.data.date).split(',')[0]}
                      </div>
                      <div className="text-sm font-bold text-charcoal font-serif">
                        {hoveredPoint.data.weight} kg
                      </div>
                      <div className="text-[9px] text-charcoal/60 flex flex-col font-sans">
                        <span>Waist: {hoveredPoint.data.waist ? `${toDisplay(hoveredPoint.data.waist, measurementUnit)}${measurementUnit}` : '--'}</span>
                        <span>Hips: {hoveredPoint.data.hips ? `${toDisplay(hoveredPoint.data.hips, measurementUnit)}${measurementUnit}` : '--'}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
 
            <div className="absolute right-4 bottom-2 font-cursive text-sm text-charcoal/40 rotate-[2deg] select-none pointer-events-none">
              ~ growing stronger every day
            </div>
          </div>
 
          {/* BODY MEASUREMENTS (Typography Pinned Polaroid Cards, No Emojis, Sage/Beige theme) */}
          <div className="glass-card rounded-3xl p-6 relative journal-bg">
            <div className="washi-tape absolute top-[-8px] left-1/3 w-20 h-5 rotate-[1.5deg] opacity-75 bg-sage/40"></div>
            <BinderRings />
 
            <div className="pl-6 pb-2 border-b border-beige/40 mb-5">
              <h4 className="text-md font-serif font-bold text-charcoal">Body Dimensions</h4>
              <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold font-sans">Current Pinned Measurements</p>
            </div>
 
            {/* Grid of Polaroid Cards */}
            <div className="pl-6 grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              <PolaroidCard 
                label="Waist" 
                value={toDisplay(latestLog.waist, measurementUnit)} 
                change={getCurrentDimensionChange('waist')} 
                tapeColor="bg-sage/40"
                labelColor="bg-sage/10 text-sage"
                rotate="rotate-[-2deg]"
                unit={measurementUnit}
              />
              <PolaroidCard 
                label="Chest" 
                value={toDisplay(latestLog.chest, measurementUnit)} 
                change={getCurrentDimensionChange('chest')} 
                tapeColor="bg-sage/40"
                labelColor="bg-sage/15 text-sage"
                rotate="rotate-[1deg]"
                unit={measurementUnit}
              />
              <PolaroidCard 
                label="Hips" 
                value={toDisplay(latestLog.hips, measurementUnit)} 
                change={getCurrentDimensionChange('hips')} 
                tapeColor="bg-honey/45"
                labelColor="bg-honey/15 text-[#C0965C]"
                rotate="rotate-[-1deg]"
                unit={measurementUnit}
              />
              <PolaroidCard 
                label="Thigh" 
                value={toDisplay(latestLog.thigh, measurementUnit)} 
                change={getCurrentDimensionChange('thigh')} 
                tapeColor="bg-buttercream/65"
                labelColor="bg-buttercream/35 text-[#9E8A5D]"
                rotate="rotate-[2deg]"
                unit={measurementUnit}
              />
              <PolaroidCard 
                label="Wrist" 
                value={toDisplay(latestLog.wrist, measurementUnit)} 
                change={getCurrentDimensionChange('wrist')} 
                tapeColor="bg-sage/35"
                labelColor="bg-cream border border-beige/20 text-charcoal/80"
                rotate="rotate-[-1.5deg]"
                unit={measurementUnit}
              />
            </div>
          </div>
 
          {/* JOURNEY TIMELINE */}
          <div className="glass-card rounded-3xl p-6 md:p-8 relative journal-bg">
            <div className="washi-tape absolute top-[-8px] right-12 w-20 h-4.5 rotate-[1.5deg] opacity-70 bg-sage/35"></div>
            <BinderHoles />
            
            <div className="pl-6 flex items-center justify-between border-b border-beige/40 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-serif text-charcoal">Journey Timeline</h3>
                <p className="text-xs text-charcoal/55 italic font-sans">Review physical growth trends over dates</p>
              </div>
              <span className="text-xs bg-cream border border-beige/65 text-charcoal/65 px-3 py-1 rounded-xl font-sans font-medium">
                Sorted Newest First
              </span>
            </div>
 
            {measurementsLog.length === 0 ? (
              <div className="text-center py-10 text-charcoal/45 italic text-sm font-sans">
                No logs recorded yet. Create one on the right form!
              </div>
            ) : (
              <div className="relative pl-8 pr-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-none">
                
                {/* Vertical leafy vine stem line */}
                <div className="absolute left-[33px] top-4 bottom-4 w-[3px] bg-sage/40 rounded-full select-none pointer-events-none"></div>
 
                <div className="space-y-6">
                  {[...measurementsLog]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, idx) => {
                      const wtDiff = getPrevDiff(item, idx, 'weight');
                      const waistDiff = getPrevDiff(item, idx, 'waist', measurementUnit);
                      const hipsDiff = getPrevDiff(item, idx, 'hips', measurementUnit);
                      const chestDiff = getPrevDiff(item, idx, 'chest', measurementUnit);
                      const thighDiff = getPrevDiff(item, idx, 'thigh', measurementUnit);
                      const wristDiff = getPrevDiff(item, idx, 'wrist', measurementUnit);
                      
                      const isSelectedDate = item.date === simulatedDate;
 
                      return (
                        <div key={item.date} className="relative flex items-start gap-4">
                          
                          {/* Node circle */}
                          <div className="absolute left-[-11px] top-2 z-10 w-3.5 h-3.5 rounded-full bg-white border-2 border-sage flex items-center justify-center select-none shadow-2xs">
                          </div>
 
                          {/* Content Note Card */}
                          <div 
                            className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col gap-2 ${
                              isSelectedDate 
                                ? 'bg-sage/10 border-sage/40' 
                                : 'bg-white border-beige/30 hover:border-sage/30 shadow-2xs'
                            }`}
                          >
                            {/* Card Header Row */}
                            <div className="flex flex-row sm:items-center justify-between gap-3 w-full">
                              <div>
                                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider font-mono">
                                  {formatDate(item.date)}
                                </span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-base font-bold font-serif text-charcoal">{item.weight} kg</span>
                                  {wtDiff && (
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                                      wtDiff.type === 'gain' 
                                        ? 'bg-sage/20 text-charcoal font-bold' 
                                        : wtDiff.type === 'loss' 
                                          ? 'bg-sage/15 text-charcoal' 
                                          : 'bg-cream text-charcoal/50'
                                    }`}>
                                      {wtDiff.diffStr}
                                    </span>
                                  )}
                                </div>
                              </div>
 
                              {/* Delete action button */}
                              <div className="flex items-center">
                                {deleteConfirmDate === item.date ? (
                                  <div className="flex items-center gap-1 bg-cream/80 px-2 py-1 rounded-xl border border-beige/40">
                                    <button 
                                      onClick={() => handleDeleteLog(item.date)} 
                                      className="text-[9px] bg-sage text-charcoal px-2 py-1 rounded-lg border border-sage/30 font-bold hover:bg-sage/90 cursor-pointer"
                                    >
                                      Yes
                                    </button>
                                    <button 
                                      onClick={() => setDeleteConfirmDate(null)} 
                                      className="text-[9px] bg-white text-charcoal/60 px-2 py-1 rounded-lg border border-beige/40 cursor-pointer"
                                    >
                                      No
                                    </button>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => setDeleteConfirmDate(item.date)}
                                    className="p-2 text-charcoal/40 hover:text-sage rounded-lg transition-colors cursor-pointer"
                                    title="Delete log"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
 
                            {/* Dimensions directly displayed (inline - no emojis) */}
                            <div className="flex flex-wrap gap-2.5 mt-1 font-sans">
                              {item.waist !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-cream/70 border border-beige/35 px-2 py-0.5 rounded-full text-charcoal/80">
                                  <span className="font-medium text-charcoal/60">Waist:</span>
                                  <span className="font-mono font-bold">{toDisplay(item.waist, measurementUnit)}{measurementUnit}</span>
                                  {waistDiff && waistDiff.diffStr !== '0' && (
                                    <span className={`text-[9px] font-bold ${waistDiff.type === 'gain' ? 'text-sage' : 'text-rose/85'}`}>
                                      ({waistDiff.diffStr})
                                    </span>
                                  )}
                                </span>
                              )}
                              {item.chest !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-sage/10 border border-sage/20 px-2 py-0.5 rounded-full text-charcoal/80">
                                  <span className="font-medium text-sage">Chest:</span>
                                  <span className="font-mono font-bold">{toDisplay(item.chest, measurementUnit)}{measurementUnit}</span>
                                  {chestDiff && chestDiff.diffStr !== '0' && (
                                    <span className={`text-[9px] font-bold ${chestDiff.type === 'gain' ? 'text-sage' : 'text-rose/85'}`}>
                                      ({chestDiff.diffStr})
                                    </span>
                                  )}
                                </span>
                              )}
                              {item.hips !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-sage/10 border border-sage/20 px-2 py-0.5 rounded-full text-charcoal/80">
                                  <span className="font-medium text-sage">Hips:</span>
                                  <span className="font-mono font-bold">{toDisplay(item.hips, measurementUnit)}{measurementUnit}</span>
                                  {hipsDiff && hipsDiff.diffStr !== '0' && (
                                    <span className={`text-[9px] font-bold ${hipsDiff.type === 'gain' ? 'text-sage' : 'text-rose/85'}`}>
                                      ({hipsDiff.diffStr})
                                    </span>
                                  )}
                                </span>
                              )}
                              {item.thigh !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-honey/15 border border-honey/20 px-2 py-0.5 rounded-full text-charcoal/80">
                                  <span className="font-medium text-[#B08D5B]">Thighs:</span>
                                  <span className="font-mono font-bold">{toDisplay(item.thigh, measurementUnit)}{measurementUnit}</span>
                                  {thighDiff && thighDiff.diffStr !== '0' && (
                                    <span className={`text-[9px] font-bold ${thighDiff.type === 'gain' ? 'text-sage' : 'text-rose/85'}`}>
                                      ({thighDiff.diffStr})
                                    </span>
                                  )}
                                </span>
                              )}
                              {item.wrist !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-buttercream/25 border border-beige/35 px-2 py-0.5 rounded-full text-charcoal/80">
                                  <span className="font-medium text-[#9E8A5D]">Wrist:</span>
                                  <span className="font-mono font-bold">{toDisplay(item.wrist, measurementUnit)}{measurementUnit}</span>
                                  {wristDiff && wristDiff.diffStr !== '0' && (
                                    <span className={`text-[9px] font-bold ${wristDiff.type === 'gain' ? 'text-sage' : 'text-rose/85'}`}>
                                      ({wristDiff.diffStr})
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>
 
                            {/* Notes/Reflection diary list */}
                            {item.notes && (
                              <div className="bg-cream/70 border border-beige/35 rounded-xl p-2.5 text-xs text-charcoal/80 mt-1">
                                <span className="font-semibold block text-[9px] text-charcoal/45 uppercase tracking-wider mb-0.5 font-sans">Diary Reflection</span>
                                <p className="font-cursive text-[15px] leading-relaxed text-charcoal/85 italic">
                                  "{item.notes}"
                                </p>
                              </div>
                            )}
 
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
 
        {/* RIGHT COLUMN STACK (1/3 width on desktop) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* WEEKLY SNAPSHOT CARD */}
          <div className="glass-card rounded-3xl p-6 relative journal-bg">
            <div className="washi-tape absolute top-[-8px] left-1/4 w-20 h-4.5 rotate-[-2deg] opacity-75 bg-[#E8C08A]/35"></div>
            <BinderHoles />
 
            <div className="pl-6 pb-2 border-b border-beige/40 mb-4">
              <h4 className="text-md font-serif font-bold text-charcoal flex items-center gap-1.5">
                <span>Weekly Snapshot</span>
              </h4>
              <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold font-sans">Past 7 days wellness glow</p>
            </div>
 
            <div className="pl-6 space-y-3 text-xs font-sans">
              <div className="flex justify-between items-center py-1.5 border-b border-beige/10">
                <span className="text-charcoal/70 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-sage" />
                  <span>Weight:</span>
                </span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded-full ${
                  wtDiffVal >= 0 ? 'bg-sage/25 text-charcoal font-bold' : 'bg-sage/15 text-charcoal'
                }`}>
                  {weeklyWeightDiff}
                </span>
              </div>
 
              <div className="flex justify-between items-center py-1.5 border-b border-beige/10">
                <span className="text-charcoal/70 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-sage" />
                  <span>Waist:</span>
                </span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded-full ${
                  waistDiffVal >= 0 ? 'bg-sage/25 text-charcoal font-bold' : 'bg-sage/15 text-charcoal'
                }`}>
                  {weeklyWaistDiff}
                </span>
              </div>
 
              <div className="flex justify-between items-center py-1.5 border-b border-beige/10">
                <span className="text-charcoal/70 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-sage" />
                  <span>Hips:</span>
                </span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded-full ${
                  hipsDiffVal >= 0 ? 'bg-sage/25 text-charcoal font-bold' : 'bg-sage/15 text-charcoal'
                }`}>
                  {weeklyHipsDiff}
                </span>
              </div>
 
              <div className="flex justify-between items-center py-1.5 border-b border-beige/10">
                <span className="text-charcoal/70 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-sage" />
                  <span>Workouts:</span>
                </span>
                <span className="font-bold bg-cream border border-beige/40 px-2.5 py-0.5 rounded-full text-[10px]">
                  {weeklyWorkouts}/7 done
                </span>
              </div>
 
              <div className="flex justify-between items-center py-1.5">
                <span className="text-charcoal/70 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-blue-400 fill-blue-50" />
                  <span>Water Goals:</span>
                </span>
                <span className="font-bold bg-cream border border-beige/40 px-2.5 py-0.5 rounded-full text-[10px]">
                  {weeklyWaterDays}/7 met
                </span>
              </div>
            </div>
          </div>
 
          {/* LOG PROGRESS FORM */}
          <div className="glass-card rounded-3xl p-6 md:p-8 relative journal-bg">
            <div className="washi-tape absolute top-[-8px] left-1/3 w-20 h-5 rotate-[1.2deg] opacity-75 bg-honey/30"></div>
            <BinderHoles />
 
            <div className="pl-6 space-y-6">
              <div className="border-b border-beige/40 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-serif text-charcoal">Log Progress</h3>
                  <p className="text-[11px] text-charcoal/50 italic font-sans font-medium">Write today's entries</p>
                </div>
                
                {/* Unit Toggle Slider */}
                <div className="flex bg-cream border border-beige/50 p-0.5 rounded-lg text-[10px] font-bold select-none self-start sm:self-center font-sans">
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('in')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                      measurementUnit === 'in' ? 'bg-sage text-charcoal shadow-2xs font-semibold' : 'text-charcoal/50 hover:text-charcoal/80'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('cm')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                      measurementUnit === 'cm' ? 'bg-sage text-charcoal shadow-2xs font-semibold' : 'text-charcoal/50 hover:text-charcoal/80'
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>
 
              <div className="bg-cream/40 p-3 rounded-2xl border border-beige/35 text-[11px] text-charcoal/65 flex items-center gap-2 font-sans">
                <Calendar className="w-4 h-4 text-sage flex-shrink-0" />
                <span>Logging date: <span className="font-bold text-charcoal font-mono">{formatDate(simulatedDate)}</span></span>
              </div>
 
              <form onSubmit={handleSaveLog} className="space-y-4 font-sans">
                
                {/* Weight Log Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-sage" />
                    <span>Weight (kg)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-dashed border-beige/85 focus:border-sage focus:ring-0 outline-hidden font-mono text-center text-sm pb-1"
                    min="20"
                    max="200"
                    required
                  />
                </div>
 
                {/* Dimensions Input Grid */}
                <div className="border-t border-beige/30 pt-3 space-y-3">
                  <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Ruler className="w-3.5 h-3.5 text-sage" />
                    <span>Dimensions ({measurementUnit})</span>
                  </span>
 
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Chest */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-charcoal/65 uppercase tracking-wider block">Chest</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={chestInput}
                        onChange={(e) => setChestInput(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-dashed border-beige/85 focus:border-sage focus:ring-0 outline-hidden font-mono text-center text-xs pb-0.5"
                        min="0"
                        max="150"
                      />
                    </div>
 
                    {/* Waist */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-charcoal/65 uppercase tracking-wider block">Waist</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={waistInput}
                        onChange={(e) => setWaistInput(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-dashed border-beige/85 focus:border-sage focus:ring-0 outline-hidden font-mono text-center text-xs pb-0.5"
                        min="0"
                        max="150"
                      />
                    </div>
 
                    {/* Hips */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-charcoal/65 uppercase tracking-wider block">Hips</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={hipsInput}
                        onChange={(e) => setHipsInput(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-dashed border-beige/85 focus:border-sage focus:ring-0 outline-hidden font-mono text-center text-xs pb-0.5"
                        min="0"
                        max="150"
                      />
                    </div>
 
                    {/* Thighs */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-charcoal/65 uppercase tracking-wider block">Thighs</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={thighInput}
                        onChange={(e) => setThighInput(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-dashed border-beige/85 focus:border-sage focus:ring-0 outline-hidden font-mono text-center text-xs pb-0.5"
                        min="0"
                        max="100"
                      />
                    </div>
 
                    {/* Wrist */}
                    <div className="space-y-1 col-span-2">
                      <label className="text-[10px] font-bold text-charcoal/65 uppercase tracking-wider block">Wrist</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={wristInput}
                        onChange={(e) => setWristInput(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-dashed border-beige/85 focus:border-sage focus:ring-0 outline-hidden font-mono text-center text-xs pb-0.5"
                        min="0"
                        max="50"
                      />
                    </div>
                  </div>
                </div>
 
                {/* Reflection/Self love Notes */}
                <div className="space-y-1 pt-1">
                  <label className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-honey" />
                    <span>Journal Reflections</span>
                  </label>
                  <textarea
                    placeholder="How does your body feel today? Cozy, sore, proud..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    rows="2"
                    className="w-full bg-cream/60 border border-beige/65 rounded-xl px-3 py-2 text-xs text-charcoal focus:border-sage outline-hidden font-cursive text-[17px] leading-relaxed placeholder-charcoal/30 resize-none"
                  />
                </div>
 
                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full mt-3 py-2.5 bg-sage hover:bg-[#B5C9C0]/90 text-charcoal font-serif font-bold rounded-2xl border border-sage/30 shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 transform active:translate-y-0.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Measurements Log</span>
                </button>
 
              </form>
            </div>
          </div>
 
        </div>
 
      </div>
 
    </div>
  );
}
