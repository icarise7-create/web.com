import React from 'react';
import { ArrowUpRight, Lock, ShieldCheck, QrCode } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  isOwnerMode?: boolean;
  onOpenOwnerModal?: () => void;
  onToggleOwnerMode?: () => void;
  onOpenQrModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate,
  isOwnerMode = false,
  onOpenOwnerModal,
  onToggleOwnerMode,
  onOpenQrModal
}) => {
  return (
    <footer className="bg-[#F4F9F5] border-t border-[#E2ECE5] mt-20 pt-16 pb-12 px-4 sm:px-8 text-xs text-[#52665A]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E2ECE5]">
        
        {/* Brand */}
        <div className="md:col-span-1 space-y-3">
          <span className="font-serif text-xl font-bold text-[#164E33] block">
            Eco Medicines &amp; Vitamin
          </span>
          <p className="leading-relaxed text-[#52665A]">
            Pakistan's trusted digital destination for pure nutraceuticals, certified dietary vitamins, clinical tele-pharmacy, and verified over-the-counter medicine. DRAP enlisted and cGMP audited.
          </p>
          <div className="pt-2 flex flex-col items-start gap-2">
            <button
              onClick={onOpenQrModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-full border border-[#C2DEC9] shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Website Link &amp; QR Code</span>
            </button>

            {!isOwnerMode ? (
              <button
                onClick={onOpenOwnerModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-full border border-[#C2DEC9] shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Store Owner Portal</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('seller')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-full border border-[#86EFAC] shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Open Seller &amp; Inventory Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Clinical Services */}
        <div>
          <h4 className="font-semibold text-xs text-[#1E2923] uppercase tracking-wider mb-3">
            Patient &amp; Clinical Services
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('assessment')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Personalized Health &amp; Vitamin Quiz
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('prescription')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Digital Prescription Upload &amp; Review
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('interactions')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Drug-Nutrient Interaction Checker
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('routine')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Daily Dosage &amp; Habit Timetable
              </button>
            </li>
          </ul>
        </div>

        {/* Quality & Dispensary */}
        <div>
          <h4 className="font-semibold text-xs text-[#1E2923] uppercase tracking-wider mb-3">
            Assurance &amp; Delivery
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('catalog')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Dispensary Formulations Catalog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('account')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Nationwide Live Order Tracking
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('wishlist')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Saved Wishlist Items
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('policies')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                Safe Packaging &amp; Quality Returns
              </button>
            </li>
            <li>
              <a 
                href="/eco-medicines-storefront.html" 
                download="eco-medicines-storefront.html"
                className="hover:text-[#15803D] transition-colors inline-flex items-center gap-1 font-semibold text-[#15803D]"
                title="Download full standalone offline HTML website"
              >
                <span>📥 Download Standalone HTML</span>
                <span className="text-[9px] bg-[#DCFCE7] text-[#15803D] font-bold px-1.5 py-0.2 rounded-full">OFFLINE</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Apothecary Standards */}
        <div>
          <h4 className="font-semibold text-xs text-[#1E2923] uppercase tracking-wider mb-3">
            Standards &amp; Certifications
          </h4>
          <p className="leading-relaxed mb-3 text-[#52665A]">
            All wellness and dietary formulas are 100% Halal certified, cGMP compliant, and quality verified for maximum purity.
          </p>
          <span className="inline-block text-[11px] text-[#15803D] font-medium bg-[#EAF6EE] px-2.5 py-1 rounded-md border border-[#C2DEC9]">
            Tamper-evident sealing on every order.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© 2026 Eco Medicines and Vitamin. Pure Nutraceuticals &amp; Certified Dispensary.</p>
        <div className="flex gap-6">
          <button onClick={() => onNavigate('policies')} className="hover:text-[#1E2923] cursor-pointer">
            Shipping &amp; Delivery Standards
          </button>
          <button onClick={() => onNavigate('policies')} className="hover:text-[#1E2923] cursor-pointer">
            Quality Compliance &amp; Authenticity
          </button>
          <button onClick={() => onNavigate('policies')} className="hover:text-[#1E2923] cursor-pointer">
            Privacy &amp; Safety Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
