import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  Trash2, 
  RotateCcw, 
  Droplets, 
  Award, 
  Sun, 
  Sunset, 
  Moon, 
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface RoutineItem {
  id: string;
  name: string;
  dosage: string;
  period: 'morning' | 'afternoon' | 'evening' | 'bedtime';
  instructions: string;
  completed: boolean;
}

const DEFAULT_ROUTINE: RoutineItem[] = [
  {
    id: 'r1',
    name: 'Daily Multivitamin & Zinc',
    dosage: '1 Tablet',
    period: 'morning',
    instructions: 'Take immediately after breakfast with full glass of water',
    completed: true
  },
  {
    id: 'r2',
    name: 'Vitamin D3 5000 IU Drops',
    dosage: '1 Dropper (1ml)',
    period: 'morning',
    instructions: 'Hold sublingually under tongue for 30s before swallowing',
    completed: true
  },
  {
    id: 'r3',
    name: 'Triple Strength Omega-3 Fish Oil',
    dosage: '1 Halal Softgel',
    period: 'afternoon',
    instructions: 'Take during lunch with dietary fats',
    completed: false
  },
  {
    id: 'r4',
    name: 'Magnesium Glycinate',
    dosage: '1 Capsule',
    period: 'bedtime',
    instructions: 'Take 45 minutes prior to sleep for muscle & nervous relaxation',
    completed: false
  }
];

export const DosageRoutinePlanner: React.FC = () => {
  const [items, setItems] = useState<RoutineItem[]>(() => {
    try {
      const saved = localStorage.getItem('eco_routine_v2');
      return saved ? JSON.parse(saved) : DEFAULT_ROUTINE;
    } catch {
      return DEFAULT_ROUTINE;
    }
  });

  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('eco_water_v2');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('1 Tablet');
  const [newPeriod, setNewPeriod] = useState<'morning' | 'afternoon' | 'evening' | 'bedtime'>('morning');
  const [newInstructions, setNewInstructions] = useState('Take with meal');

  useEffect(() => {
    try {
      localStorage.setItem('eco_routine_v2', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('eco_water_v2', String(waterGlasses));
    } catch (e) {
      console.error(e);
    }
  }, [waterGlasses]);

  const toggleComplete = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: RoutineItem = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      dosage: newDosage.trim(),
      period: newPeriod,
      instructions: newInstructions.trim(),
      completed: false
    };

    setItems(prev => [...prev, newItem]);
    setNewName('');
    setIsAddingNew(false);
  };

  const totalCount = items.length;
  const completedCount = items.filter(i => i.completed).length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const periods: Array<{ key: 'morning' | 'afternoon' | 'evening' | 'bedtime'; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { key: 'morning', label: 'Morning (Breakfast)', icon: Sun },
    { key: 'afternoon', label: 'Midday (Lunch)', icon: Sun },
    { key: 'evening', label: 'Evening (Dinner)', icon: Sunset },
    { key: 'bedtime', label: 'Bedtime (Night)', icon: Moon }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
          Daily Wellness Habit &amp; Dosage Tracker
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#164E33] text-balance">
          Manage Your Daily Medicine &amp; Vitamin Schedule
        </h2>
        <p className="text-sm text-[#477A5C] max-w-xl mx-auto leading-relaxed">
          Stay consistent with your active formulations. Track intake, log hydration, and prevent forgotten doses with an intuitive timetable.
        </p>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        
        {/* Adherence Progress */}
        <div className="bg-white border border-[#E2ECE5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#52665A]">Today's Adherence</span>
            <div className="text-2xl font-bold text-[#1E2923] tabular-nums mt-0.5">
              {completedCount} / {totalCount} Taken
            </div>
            <span className="text-[11px] text-[#15803D] font-medium">{percentage}% Completed</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-[#15803D] flex items-center justify-center font-bold text-xs text-[#15803D]">
            {percentage}%
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white border border-[#E2ECE5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#52665A]">Consistency Streak</span>
            <div className="text-2xl font-bold text-[#1E2923] tabular-nums mt-0.5">
              7 Days Active
            </div>
            <span className="text-[11px] text-amber-600 font-medium">Optimal bio-accumulation</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-white border border-[#E2ECE5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#52665A]">Daily Hydration</span>
            <div className="text-2xl font-bold text-[#1E2923] tabular-nums mt-0.5">
              {waterGlasses} / 8 Glasses
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <button
                onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                className="w-5 h-5 rounded-full bg-[#EAF6EE] text-[#15803D] flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() => setWaterGlasses(Math.min(12, waterGlasses + 1))}
                className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
            <Droplets className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Routine Timeline by Period */}
      <div className="bg-white border border-[#E2ECE5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2ECE5]">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E2923]">
            Today's Timetable
          </h3>

          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Formulation</span>
          </button>
        </div>

        {/* New Item Modal / Drawer */}
        {isAddingNew && (
          <form onSubmit={handleAddItem} className="bg-[#F9FBFA] p-5 rounded-xl border border-[#D2E7DA] space-y-4 animate-in slide-in-from-top-2 duration-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] block">
              Add New Supplement or Prescription to Routine
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Formulation Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Biotin 2500mcg, Panadol..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Dosage Format *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 Tablet, 2 Drops..."
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Time Period *</label>
                <select
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                >
                  <option value="morning">Morning (Breakfast)</option>
                  <option value="afternoon">Midday (Lunch)</option>
                  <option value="evening">Evening (Dinner)</option>
                  <option value="bedtime">Bedtime (Night)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Instructions / Meal Note</label>
                <input
                  type="text"
                  placeholder="e.g. Take with warm water..."
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-3 py-1.5 text-xs text-[#52665A] hover:text-[#1E2923] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-full cursor-pointer shadow-xs"
              >
                Save to Schedule
              </button>
            </div>
          </form>
        )}

        {/* Schedule Groups */}
        <div className="space-y-6">
          {periods.map(({ key, label, icon: Icon }) => {
            const periodItems = items.filter(i => i.period === key);
            if (periodItems.length === 0) return null;

            return (
              <div key={key} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  <Icon className="w-4 h-4 text-[#15803D]" />
                  <span>{label}</span>
                </div>

                <div className="space-y-2">
                  {periodItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        item.completed 
                          ? 'bg-[#F0FDF4] border-[#C2DEC9]' 
                          : 'bg-[#F9FBFA] border-[#E2ECE5] hover:border-[#C2DEC9]'
                      }`}
                    >
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className="flex items-center gap-3 text-left flex-1 min-w-0 cursor-pointer"
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                          item.completed ? 'bg-[#15803D] border-[#15803D] text-white' : 'border-[#A1B8A9] bg-white'
                        }`}>
                          {item.completed && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="min-w-0">
                          <span className={`text-xs font-bold block ${item.completed ? 'line-through text-[#52665A]' : 'text-[#1E2923]'}`}>
                            {item.name} · {item.dosage}
                          </span>
                          <span className="text-[11px] text-[#52665A] block truncate">{item.instructions}</span>
                        </div>
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 text-[#A1B8A9] hover:text-rose-600 rounded-md hover:bg-white transition-colors cursor-pointer"
                        title="Delete from routine"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
