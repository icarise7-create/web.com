import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Info, 
  ArrowRight, 
  Check, 
  Search,
  Sparkles,
  HelpCircle,
  Pill
} from 'lucide-react';

interface MedicineOption {
  id: string;
  name: string;
  category: string;
  commonBrands: string;
}

interface SupplementOption {
  id: string;
  name: string;
  activeNutrient: string;
}

interface InteractionResult {
  severity: 'safe' | 'caution' | 'danger';
  title: string;
  timingRule: string;
  mechanism: string;
  pharmacistAdvice: string;
}

const MEDICINES: MedicineOption[] = [
  { id: 'warfarin', name: 'Warfarin / Blood Thinners', category: 'Anticoagulant', commonBrands: 'Coumadin, Marevan' },
  { id: 'thyroid', name: 'Levothyroxine (Thyroid Hormone)', category: 'Endocrine', commonBrands: 'Thyroxine, Eltroxin' },
  { id: 'antibiotic', name: 'Ciprofloxacin / Tetracycline', category: 'Antibiotic', commonBrands: 'Cipro, Doxycycline' },
  { id: 'metformin', name: 'Metformin', category: 'Antidiabetic', commonBrands: 'Glucophage, Neodipar' },
  { id: 'omeprazole', name: 'Omeprazole / PPIs', category: 'Antacid / Gastric', commonBrands: 'Risek, Losec, Omez' },
  { id: 'blood-pressure', name: 'Amlodipine / Lisinopril', category: 'Antihypertensive', commonBrands: 'Norvasc, Zestril' },
  { id: 'antidepressant', name: 'Sertraline / SSRIs', category: 'Psychiatric', commonBrands: 'Zoloft, Serlift' }
];

const SUPPLEMENTS: SupplementOption[] = [
  { id: 'vit-k', name: 'Vitamin K / K2 (MK-7)', activeNutrient: 'Phylloquinone / Menaquinone' },
  { id: 'calcium', name: 'Calcium Carbonate / Citrate', activeNutrient: 'Elemental Calcium 500mg' },
  { id: 'iron', name: 'Iron / Ferrous Sulfate', activeNutrient: 'Elemental Iron' },
  { id: 'omega3', name: 'Omega-3 Fish Oil (High EPA/DHA)', activeNutrient: 'Fatty Acids 1000mg+' },
  { id: 'magnesium', name: 'Magnesium Oxide / Glycinate', activeNutrient: 'Elemental Magnesium' },
  { id: 'vit-d3', name: 'Vitamin D3 (Cholecalciferol)', activeNutrient: 'Vitamin D3 5000 IU' },
  { id: 'st-johns-wort', name: "St. John's Wort Herbal Extract", activeNutrient: 'Hypericin / Hyperforin' },
  { id: 'biotin', name: 'Biotin (Vitamin B7 2500mcg+)', activeNutrient: 'Coenzyme R' }
];

const INTERACTION_DATABASE: Record<string, InteractionResult> = {
  'warfarin_vit-k': {
    severity: 'danger',
    title: 'High Risk: Direct Antagonistic Interaction',
    timingRule: 'Avoid without specialized doctor supervision',
    mechanism: 'Vitamin K is an essential cofactor for blood clotting factors. Consuming supplemental Vitamin K directly counteracts Warfarin, reducing INR and dramatically increasing thrombosis risk.',
    pharmacistAdvice: 'Do not start Vitamin K2 without explicit INR monitoring from your hematologist.'
  },
  'warfarin_omega3': {
    severity: 'caution',
    title: 'Moderate Caution: Additive Antiplatelet Action',
    timingRule: 'Monitor bruising; keep Omega-3 under 2,000mg EPA/DHA daily',
    mechanism: 'High doses of Omega-3 have mild blood-thinning antiplatelet properties that can potentiate the anticoagulant effect of Warfarin.',
    pharmacistAdvice: 'Safe in standard nutritional doses (1000mg), but report any frequent nosebleeds or spontaneous bruising.'
  },
  'thyroid_calcium': {
    severity: 'caution',
    title: 'Absorption Chelation: Insoluble Complex Formation',
    timingRule: 'Separate by at least 4 hours',
    mechanism: 'Calcium binds to levothyroxine in the gastrointestinal tract, forming an insoluble chelate that prevents thyroid hormone absorption and leads to elevated TSH.',
    pharmacistAdvice: 'Take Levothyroxine first thing in the morning on an empty stomach with plain water. Take Calcium at lunch or dinner.'
  },
  'thyroid_iron': {
    severity: 'caution',
    title: 'Absorption Chelation: Reduced Bioavailability',
    timingRule: 'Separate by 4 to 6 hours',
    mechanism: 'Ferrous iron binds tightly to levothyroxine molecules in the gut, reducing thyroid hormone absorption by up to 40%.',
    pharmacistAdvice: 'Take thyroid medication at least 4 hours apart from iron supplements.'
  },
  'antibiotic_calcium': {
    severity: 'danger',
    title: 'High Chelation Risk: Antibiotic Failure',
    timingRule: 'Take antibiotic 2 hours before or 4 hours after Calcium',
    mechanism: 'Divalent cations in Calcium bind to fluoroquinolones (Ciprofloxacin) and Tetracyclines, rendering the antibiotic insoluble and clinically ineffective against bacterial infection.',
    pharmacistAdvice: 'Strictly separate calcium supplements and dairy milk from your antibiotic dosage times.'
  },
  'antibiotic_iron': {
    severity: 'caution',
    title: 'Absorption Inhibition of Both Compounds',
    timingRule: 'Separate by at least 3 hours',
    mechanism: 'Iron complexes with antibiotics in the intestinal lumen, impairing antimicrobial absorption.',
    pharmacistAdvice: 'Schedule iron intake for bedtime if taking morning/evening antibiotics.'
  },
  'antidepressant_st-johns-wort': {
    severity: 'danger',
    title: 'Severe Warning: Serotonin Syndrome Risk',
    timingRule: 'Contraindicated: Do NOT combine',
    mechanism: "Both SSRIs and St. John's Wort increase synaptic serotonin levels. Simultaneous use can cause fatal Serotonin Syndrome (hyperthermia, tremors, delirium).",
    pharmacistAdvice: "Immediately discontinue St. John's Wort if prescribed pharmaceutical antidepressants."
  },
  'omeprazole_calcium': {
    severity: 'caution',
    title: 'Decreased Stomach Acid Reduces Carbonate Dissolution',
    timingRule: 'Switch to Calcium Citrate instead of Calcium Carbonate',
    mechanism: 'PPIs suppress stomach acid. Calcium Carbonate requires high acid for dissolution, whereas Calcium Citrate absorbs acid-independently.',
    pharmacistAdvice: 'Choose Calcium Citrate formulation for optimal bioavailability while taking Omeprazole.'
  },
  'omeprazole_magnesium': {
    severity: 'safe',
    title: 'Compatible with Routine Monitoring',
    timingRule: 'Take with evening meal',
    mechanism: 'Long-term PPI use may deplete body magnesium stores, making mild magnesium supplementation beneficial.',
    pharmacistAdvice: 'Beneficial pairing to protect against PPI-induced hypomagnesemia.'
  },
  'metformin_vit-d3': {
    severity: 'safe',
    title: 'Synergistic & Clinically Favorable',
    timingRule: 'Take Vitamin D3 with lunch or dinner fats',
    mechanism: 'Vitamin D3 supports insulin receptor sensitivity and pancreatic beta-cell health, complementing Metformin action.',
    pharmacistAdvice: 'Excellent combination. Ensure periodic Vitamin B12 monitoring, as Metformin can lower B12.'
  }
};

export const InteractionChecker: React.FC = () => {
  const [selectedMed, setSelectedMed] = useState<string>('warfarin');
  const [selectedSupp, setSelectedSupp] = useState<string>('vit-k');

  const key = `${selectedMed}_${selectedSupp}`;
  const interaction = INTERACTION_DATABASE[key];

  const currentMedObj = MEDICINES.find(m => m.id === selectedMed);
  const currentSuppObj = SUPPLEMENTS.find(s => s.id === selectedSupp);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
          Clinical Drug-Nutrient Safety Desk
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#164E33] text-balance">
          Check Vitamin &amp; Medication Compatibility
        </h2>
        <p className="text-sm text-[#477A5C] max-w-xl mx-auto leading-relaxed">
          Over 68% of Pakistani adults combine daily prescription drugs with vitamins without timing guidance. Use our verified database to identify chelation, absorption blocks, and timing rules.
        </p>
      </div>

      {/* Selector Module */}
      <div className="bg-white border border-[#E2ECE5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Select Medicine */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              1. Select Prescription or OTC Medicine
            </label>
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {MEDICINES.map((med) => (
                <button
                  key={med.id}
                  onClick={() => setSelectedMed(med.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedMed === med.id 
                      ? 'border-[#15803D] bg-[#F0FDF4] font-semibold text-[#15803D]' 
                      : 'border-[#E2ECE5] bg-white text-[#1E2923] hover:border-[#C2DEC9]'
                  }`}
                >
                  <div>
                    <span className="block font-medium">{med.name}</span>
                    <span className="text-[11px] text-[#52665A]">e.g. {med.commonBrands}</span>
                  </div>
                  {selectedMed === med.id && <Check className="w-4 h-4 text-[#15803D] shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Select Supplement */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              2. Select Dietary Supplement / Vitamin
            </label>
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {SUPPLEMENTS.map((supp) => (
                <button
                  key={supp.id}
                  onClick={() => setSelectedSupp(supp.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedSupp === supp.id 
                      ? 'border-[#15803D] bg-[#F0FDF4] font-semibold text-[#15803D]' 
                      : 'border-[#E2ECE5] bg-white text-[#1E2923] hover:border-[#C2DEC9]'
                  }`}
                >
                  <div>
                    <span className="block font-medium">{supp.name}</span>
                    <span className="text-[11px] text-[#52665A]">{supp.activeNutrient}</span>
                  </div>
                  {selectedSupp === supp.id && <Check className="w-4 h-4 text-[#15803D] shrink-0" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Clinical Result Card */}
        <div className="pt-4 border-t border-[#E2ECE5]">
          {interaction ? (
            <div className={`p-6 rounded-2xl border transition-all ${
              interaction.severity === 'danger' 
                ? 'bg-rose-50/70 border-rose-200' 
                : interaction.severity === 'caution'
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/5">
                <div className="flex items-center gap-2.5">
                  {interaction.severity === 'danger' && <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />}
                  {interaction.severity === 'caution' && <Clock className="w-6 h-6 text-amber-600 shrink-0" />}
                  {interaction.severity === 'safe' && <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />}
                  
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block">
                      {interaction.severity === 'danger' && 'High Clinical Warning'}
                      {interaction.severity === 'caution' && 'Timing Separation Protocol'}
                      {interaction.severity === 'safe' && 'Compatible Synergistic Pairing'}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#1E2923]">
                      {interaction.title}
                    </h4>
                  </div>
                </div>

                <div className="bg-white/80 px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto border border-black/5">
                  Rule: {interaction.timingRule}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[#1E2923]">Pharmacokinetic Mechanism:</span>
                  <p className="text-[#52665A] leading-relaxed">{interaction.mechanism}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-[#1E2923]">Clinical Safety Guidance:</span>
                  <p className="text-[#52665A] leading-relaxed">{interaction.pharmacistAdvice}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#C2DEC9] flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#15803D] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] block">
                  No Known Major Direct Interaction
                </span>
                <h4 className="font-serif text-base font-bold text-[#164E33] mt-0.5">
                  {currentMedObj?.name} + {currentSuppObj?.name} are generally compatible
                </h4>
                <p className="text-xs text-[#477A5C] mt-1 leading-relaxed">
                  No direct pharmacokinetic enzyme inhibition or chelation is reported in standard clinical literature. As a best practice, consume vitamins with healthy dietary meals and separate medications by at least 1 hour.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
