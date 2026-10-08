import React from 'react';
import { ShieldCheck, Truck, RotateCcw, AlertCircle } from 'lucide-react';

export const PoliciesView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4A3A]">
          Apothecary Standards
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2B2B26] mt-2 mb-3">
          Shipping, Compliance &amp; Returns
        </h1>
        <p className="text-xs sm:text-sm text-[#726E60] leading-relaxed">
          How we ensure safe pharmacy sealing, tamper protection, and responsible customer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-[#E9E4D6] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#EAF6F1] text-[#1F4A3A] flex items-center justify-center mb-2">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#2B2B26]">Shipping Protocol</h3>
          <p className="text-xs text-[#726E60] leading-relaxed">
            All orders are processed within 24 business hours. Dispatched nationwide with serialized tamper-evident security tape.
          </p>
        </div>

        <div className="bg-white border border-[#E9E4D6] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FCEEF3] text-[#E0759A] flex items-center justify-center mb-2">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#2B2B26]">30-Day Return Policy</h3>
          <p className="text-xs text-[#726E60] leading-relaxed">
            Unopened cosmetics and wellness formulas in original factory sealing may be returned within 30 days of delivery. For hygiene and safety reasons, opened cosmetics or OTC medicines cannot be restocked.
          </p>
        </div>

        <div className="bg-white border border-[#E9E4D6] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#EAF6F1] text-[#1F4A3A] flex items-center justify-center mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#2B2B26]">Formulation Quality Assurance</h3>
          <p className="text-xs text-[#726E60] leading-relaxed">
            Our dispensary catalog features pure wellness monographs. Every formulation specifies active ingredients, contraindications, and recommended daily values.
          </p>
        </div>

        <div className="bg-white border border-[#E9E4D6] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FBF0E4] text-[#8A5A1E] flex items-center justify-center mb-2">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#2B2B26]">Regulated Compound Limits</h3>
          <p className="text-xs text-[#726E60] leading-relaxed">
            Certain cold and sinus decongestants are subject to quantity limits (max 2 units per order) and require purchaser age verification in accordance with federal anti-diversion regulations.
          </p>
        </div>
      </div>
    </div>
  );
};
