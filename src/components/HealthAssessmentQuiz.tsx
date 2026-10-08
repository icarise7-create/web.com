import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Brain, 
  Flame, 
  Bone, 
  Activity, 
  Check, 
  Printer, 
  BookmarkCheck,
  ChevronRight,
  Pill
} from 'lucide-react';

interface QuestionOption {
  id: string;
  label: string;
  desc: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const HealthAssessmentQuiz: React.FC<{ onNavigateToProducts?: () => void }> = ({ onNavigateToProducts }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['energy']);
  const [selectedDiet, setSelectedDiet] = useState<string>('mixed');
  const [selectedAge, setSelectedAge] = useState<string>('26-40');
  const [selectedActivity, setSelectedActivity] = useState<string>('desk-sedentary');
  const [isCalculated, setIsCalculated] = useState(false);
  const [savedToProfile, setSavedToProfile] = useState(false);

  const GOAL_OPTIONS: QuestionOption[] = [
    { id: 'energy', label: 'All-Day Stamina & Energy', desc: 'Overcome midday fatigue, brain fog, and low physical endurance', icon: Flame },
    { id: 'immunity', label: 'Immunity & Seasonal Defense', desc: 'Strengthen cellular resilience against respiratory viruses and pollution', icon: ShieldCheck },
    { id: 'hair-skin', label: 'Luminous Hair, Skin & Nails', desc: 'Control hair thinning, boost dermal collagen, and promote natural glow', icon: Sparkles },
    { id: 'joints-bones', label: 'Joint Mobility & Bone Density', desc: 'Relieve morning knee stiffness and fortify bone mineralization', icon: Bone },
    { id: 'sleep-stress', label: 'Calm Nervous System & Sleep', desc: 'Soothe cortisol, unwind evening tension, and support deep REM sleep', icon: Brain },
    { id: 'heart', label: 'Cardiovascular Vitality & Lipids', desc: 'Maintain healthy triglycerides, arterial elasticity, and circulation', icon: Heart }
  ];

  const DIET_OPTIONS: QuestionOption[] = [
    { id: 'mixed', label: 'Standard Pakistani Diet', desc: 'Traditional meat, lentils, rice, wheat rotis, and seasonal cooked vegetables' },
    { id: 'vegetarian', label: 'Vegetarian / Plant-Forward', desc: 'Zero meat or fish; higher risk of Vitamin B12, Iron, and Zinc deficiencies' },
    { id: 'halal-strict', label: 'Strict 100% Halal Preference', desc: 'Require certified bovine gelatin softgels with verified formulation standards' },
    { id: 'low-dairy', label: 'Lactose Sensitive / Low Dairy', desc: 'Minimal milk or yogurt consumption; requires supplemental Calcium & D3' }
  ];

  const AGE_OPTIONS: QuestionOption[] = [
    { id: '18-25', label: '18 – 25 Years', desc: 'Metabolic building, academic focus, hormonal and skin barrier stabilization' },
    { id: '26-40', label: '26 – 40 Years', desc: 'Peak career stress, reproductive health, active physical demand' },
    { id: '41-55', label: '41 – 55 Years', desc: 'Pre-metabolic protection, bone preservation, antioxidant defense' },
    { id: '55+', label: '55+ Years Vitality', desc: 'Enhanced joint lubrication, cardiovascular support, and optimal B-complex' }
  ];

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter(g => g !== id));
      }
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, id]);
      }
    }
  };

  const handleCalculate = () => {
    setIsCalculated(true);
    setCurrentStep(5);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsCalculated(false);
    setSelectedGoals(['energy']);
    setSavedToProfile(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
          Personalized Clinical Assessment
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#164E33] text-balance">
          Find Your Personalized Wellness &amp; Vitamin Regimen
        </h2>
        <p className="text-sm text-[#477A5C] max-w-xl mx-auto leading-relaxed">
          Developed with evidence-based wellness guidelines. Receive a personalized daily micronutrient schedule tailored to your health goals, diet, and lifestyle.
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-[#52665A] mb-2">
          <span>Step {currentStep} of 4</span>
          <span>
            {currentStep === 1 && 'Primary Health Goals'}
            {currentStep === 2 && 'Dietary Lifestyle'}
            {currentStep === 3 && 'Age & Life Stage'}
            {currentStep === 4 && 'Activity Profile'}
            {currentStep === 5 && 'Clinical Regimen Protocol'}
          </span>
        </div>
        <div className="h-2 w-full bg-[#E2ECE5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#15803D] transition-all duration-300"
            style={{ width: `${Math.min(100, (currentStep / 4) * 100)}%` }}
          />
        </div>
      </div>

      {/* Step 1: Goals */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-[#E2ECE5] pb-3">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E2923]">
              What are your top health objectives right now?
            </h3>
            <p className="text-xs text-[#52665A]">Select up to 3 priority areas for targeted clinical formulation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {GOAL_OPTIONS.map((opt) => {
              const Icon = opt.icon || Pill;
              const isSelected = selectedGoals.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleGoal(opt.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected 
                      ? 'border-[#15803D] bg-[#F0FDF4] shadow-xs' 
                      : 'border-[#E2ECE5] bg-white hover:border-[#C2DEC9]'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-[#15803D] text-white' : 'bg-[#EAF6EE] text-[#15803D]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#1E2923]">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#15803D] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#52665A] mt-1 leading-normal">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Dietary Habits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Diet */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-[#E2ECE5] pb-3">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E2923]">
              Which dietary pattern best reflects your daily meals?
            </h3>
            <p className="text-xs text-[#52665A]">Helps identify baseline micronutrient gaps.</p>
          </div>

          <div className="space-y-3">
            {DIET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDiet(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedDiet === opt.id 
                    ? 'border-[#15803D] bg-[#F0FDF4] shadow-xs' 
                    : 'border-[#E2ECE5] bg-white hover:border-[#C2DEC9]'
                }`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-[#1E2923]">{opt.label}</h4>
                  <p className="text-xs text-[#52665A] mt-0.5">{opt.desc}</p>
                </div>
                {selectedDiet === opt.id && <Check className="w-5 h-5 text-[#15803D] shrink-0 ml-3" />}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-[#52665A] hover:text-[#1E2923] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Age Stage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Age */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-[#E2ECE5] pb-3">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E2923]">
              Select your current age bracket
            </h3>
            <p className="text-xs text-[#52665A]">Dosage requirements change across life phases.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedAge(opt.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedAge === opt.id 
                    ? 'border-[#15803D] bg-[#F0FDF4] shadow-xs' 
                    : 'border-[#E2ECE5] bg-white hover:border-[#C2DEC9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1E2923]">{opt.label}</h4>
                  {selectedAge === opt.id && <Check className="w-4 h-4 text-[#15803D]" />}
                </div>
                <p className="text-xs text-[#52665A] mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-[#52665A] hover:text-[#1E2923] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Activity Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Activity & Symptoms */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-[#E2ECE5] pb-3">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E2923]">
              What is your typical daily movement and sun exposure level?
            </h3>
            <p className="text-xs text-[#52665A]">Crucial for calculating Vitamin D3 synthesis and metabolic co-factors.</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'desk-indoor', title: 'Predominantly Indoors (Office / Study)', desc: 'Less than 20 minutes direct sunlight per day; high screen exposure' },
              { id: 'moderate-commute', title: 'Moderate Activity & Commuting', desc: 'Daily travel, walking, light domestic or retail activity' },
              { id: 'active-athlete', title: 'High Physical Exertion / Workout Routine', desc: 'Frequent cardio, gym training, sports; elevated mineral sweat losses' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedActivity(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedActivity === opt.id 
                    ? 'border-[#15803D] bg-[#F0FDF4] shadow-xs' 
                    : 'border-[#E2ECE5] bg-white hover:border-[#C2DEC9]'
                }`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-[#1E2923]">{opt.title}</h4>
                  <p className="text-xs text-[#52665A] mt-0.5">{opt.desc}</p>
                </div>
                {selectedActivity === opt.id && <Check className="w-5 h-5 text-[#15803D] shrink-0 ml-3" />}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs font-semibold text-[#52665A] hover:text-[#1E2923] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleCalculate}
              className="px-7 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#86EFAC]" />
              <span>Generate My Clinical Regimen</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Clinical Regimen Results */}
      {currentStep === 5 && (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
          <div className="bg-[#F0FDF4] border border-[#C2DEC9] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#C2DEC9] pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  Custom Protocol Generated · Protocol Reference # PKR-ECO-REG-2026
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#164E33] mt-1">
                  Your Tailored Micronutrient &amp; Wellness Protocol
                </h3>
                <p className="text-xs text-[#477A5C] mt-1">
                  Calibrated for: {selectedAge} · {selectedDiet.replace('-', ' ')} diet · {selectedGoals.join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-white text-[#15803D] border border-[#C2DEC9] hover:bg-[#F4FAF6] rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Regimen</span>
                </button>
                <button
                  onClick={() => {
                    setSavedToProfile(true);
                    setTimeout(() => setSavedToProfile(false), 4000);
                  }}
                  className="px-3.5 py-1.5 bg-[#15803D] text-white hover:bg-[#166534] rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{savedToProfile ? 'Saved to Profile' : 'Save Protocol'}</span>
                </button>
              </div>
            </div>

            {/* Protocol Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              
              {/* Morning Schedule */}
              <div className="bg-white rounded-xl border border-[#D2E7DA] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#15803D]" />
                    Morning (Post-Breakfast)
                  </span>
                  <span className="text-[11px] bg-[#EAF6EE] text-[#14532D] px-2 py-0.5 rounded-full font-medium">
                    With 300ml Water
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="border-l-2 border-[#15803D] pl-3 py-0.5">
                    <h5 className="text-sm font-bold text-[#1E2923]">1. Bioactive Multivitamin &amp; Zinc</h5>
                    <p className="text-xs text-[#52665A]">
                      Dosage: 1 Tablet · Contains 24 micronutrients with Panax Ginseng to fuel physical ATP stamina and cognitive vigilance.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#15803D] pl-3 py-0.5">
                    <h5 className="text-sm font-bold text-[#1E2923]">2. Vitamin D3 5000 IU + K2 MK-7 Drops</h5>
                    <p className="text-xs text-[#52665A]">
                      Dosage: 1 Full Dropper sublingually · High-potency Lichen D3 paired with MK-7 to direct calcium straight into bone matrix.
                    </p>
                  </div>
                </div>
              </div>

              {/* Evening Schedule */}
              <div className="bg-white rounded-xl border border-[#D2E7DA] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#15803D]" />
                    Evening / Dinner
                  </span>
                  <span className="text-[11px] bg-[#EAF6EE] text-[#14532D] px-2 py-0.5 rounded-full font-medium">
                    With Healthy Meal Fats
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="border-l-2 border-[#15803D] pl-3 py-0.5">
                    <h5 className="text-sm font-bold text-[#1E2923]">1. Deep-Sea Triple Strength Omega-3</h5>
                    <p className="text-xs text-[#52665A]">
                      Dosage: 1 Halal Softgel · Delivers 600mg EPA and 400mg DHA for cardiovascular arterial compliance and night tissue repair.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#15803D] pl-3 py-0.5">
                    <h5 className="text-sm font-bold text-[#1E2923]">2. Magnesium Glycinate / Bone Mineralizer</h5>
                    <p className="text-xs text-[#52665A]">
                      Dosage: 1 Tablet (45 mins before bed) · Calms neuromuscular excitability and encourages deep restorative REM sleep.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Pharmacist Clinical Guidance Notes */}
            <div className="mt-6 bg-[#EAF6EE] rounded-xl p-4 border border-[#C2DEC9] flex items-start gap-3 text-xs text-[#164E33]">
              <ShieldCheck className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">Verified Clinical Guidance:</span>
                <p className="text-[#3E6F52] leading-relaxed">
                  Avoid taking Calcium supplements simultaneously with high-dose Iron or Thyroid medication; leave a minimum 2-hour window. Always ensure fat-soluble vitamins (A, D, E, K) are consumed alongside dietary fats (eggs, olive oil, or yogurt) to maximize systemic bioavailability.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-[#52665A] hover:text-[#1E2923] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Health Assessment</span>
              </button>

              {onNavigateToProducts && (
                <button
                  onClick={onNavigateToProducts}
                  className="px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Formulations Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
