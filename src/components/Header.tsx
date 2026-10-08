import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Store, 
  Menu, 
  X, 
  Lock, 
  ShieldCheck, 
  LogOut, 
  MessageSquare,
  FileText,
  Sparkles,
  ClipboardList,
  QrCode,
  MoreVertical,
  Microscope,
  UserCheck,
  Calendar,
  Package,
  Shield,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  Pill,
  Award,
  Download
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isOwnerMode?: boolean;
  onOpenOwnerModal?: () => void;
  onToggleOwnerMode?: () => void;
  onOpenQrModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  isOwnerMode = false,
  onOpenOwnerModal,
  onToggleOwnerMode,
  onOpenQrModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreMenuOpen(false);
      }
    };

    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [moreMenuOpen]);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  return (
    <>
      {/* Top Regulatory & Announcement Bar */}
      <div className="bg-[#EAF6EE] text-[#14532D] border-b border-[#D2E7DA] text-xs py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <span className="hidden sm:inline text-[#15803D] font-semibold">
            Certified Pure Botanical &amp; Dietary Health Store
          </span>
          <p className="mx-auto sm:mx-0 text-center text-xs">
            Authentic Nutraceuticals <span className="text-[#86B99B] mx-1.5">·</span> Cash on Delivery (COD) Nationwide
          </p>
          
          {/* Owner Access / Status */}
          <div className="flex items-center gap-2">
            {!isOwnerMode ? (
              <button 
                onClick={onOpenOwnerModal}
                className="flex items-center gap-1 text-[11px] text-[#15803D] hover:text-[#0f5127] font-semibold bg-white/90 hover:bg-white px-2.5 py-0.5 rounded-full border border-[#C2DEC9] shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                title="Store owner management studio"
              >
                <Lock className="w-3 h-3 text-[#15803D]" />
                <span className="hidden md:inline">Owner Portal</span>
                <span className="md:hidden">Owner</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#15803D] text-white px-2.5 py-0.5 rounded-full font-bold shadow-2xs whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Owner Mode</span>
                </span>
                <button
                  onClick={onToggleOwnerMode}
                  className="hidden md:flex items-center gap-1 text-[11px] text-rose-700 hover:text-rose-900 bg-white/90 hover:bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 font-semibold cursor-pointer transition-colors whitespace-nowrap"
                  title="Switch to customer storefront view"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Customer View</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Header Bar following strict Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2ECE5] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Zone 1: Single-Element Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="text-left group cursor-pointer focus-visible:outline-none shrink-0"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#164E33] block leading-none group-hover:text-[#15803D] transition-colors whitespace-nowrap">
              Eco Medicines &amp; Vitamin
            </span>
          </button>

          {/* Zone 2: Navigation Links (single-line with subtle hover styling) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-[#52665A]">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-[#15803D] transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentView === 'home' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]' : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleNav('catalog')}
              className={`hover:text-[#15803D] transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentView === 'catalog' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]' : ''
              }`}
            >
              Dispensary
            </button>
            <button
              onClick={() => handleNav('assessment')}
              className={`hover:text-[#15803D] transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentView === 'assessment' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]' : ''
              }`}
            >
              Health Quiz
            </button>
            <button
              onClick={() => handleNav('prescription')}
              className={`hover:text-[#15803D] transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentView === 'prescription' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]' : ''
              }`}
            >
              Upload Rx
            </button>
            <button
              onClick={() => handleNav('interactions')}
              className={`hover:text-[#15803D] transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentView === 'interactions' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]' : ''
              }`}
            >
              Interactions
            </button>
            <button
              onClick={() => handleNav('routine')}
              className={`hover:text-[#15803D] transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentView === 'routine' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]' : ''
              }`}
            >
              Dosage Schedule
            </button>

            {isOwnerMode && (
              <button
                onClick={() => handleNav('seller')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  currentView === 'seller' 
                    ? 'bg-[#15803D] text-white' 
                    : 'bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller Studio</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search vitamins &amp; wellness..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-36 lg:w-48 pl-8 pr-3 py-1.5 text-xs bg-[#F4F9F5] border border-[#D2E7DA] rounded-full text-[#1E2923] placeholder-[#728A7A] focus:outline-none focus:border-[#15803D] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#728A7A] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-[#52665A] hover:text-[#1E2923] rounded-full hover:bg-[#F4F9F5] transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNav('wishlist')}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                currentView === 'wishlist' ? 'bg-[#F0FDF4] text-rose-600' : 'text-[#52665A] hover:text-[#1E2923] hover:bg-[#F4F9F5]'
              }`}
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* QR Code & Share Link Button */}
            <button
              onClick={onOpenQrModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EAF6EE] text-[#15803D] hover:bg-[#DCFCE7] border border-[#C2DEC9] transition-colors cursor-pointer whitespace-nowrap"
              title="Scan website QR code or copy direct link"
              aria-label="Store QR Code and Link"
            >
              <QrCode className="w-3.5 h-3.5 text-[#15803D]" />
              <span>QR &amp; Link</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#10B981] text-white font-bold px-1.5 py-0.2 rounded-full text-[11px] tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* ================= 3-DOT OPTION BUTTON & DROPDOWN MENU ================= */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                  moreMenuOpen 
                    ? 'bg-[#15803D] text-white shadow-xs' 
                    : 'text-[#52665A] hover:text-[#164E33] hover:bg-[#F4F9F5] border border-transparent hover:border-[#D2E7DA]'
                }`}
                aria-label="More Options"
                title="More Options &amp; Clinical Desks"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* 3-Dot Options Dropdown Popover */}
              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#C2DEC9] py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150 text-[#1E2923]">
                  
                  {/* Dropdown Header */}
                  <div className="px-4 py-2 border-b border-[#E2ECE5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] block">
                        Dispensary Quick Menu
                      </span>
                      <h4 className="text-xs font-bold text-[#164E33]">
                        Health Tools &amp; Services
                      </h4>
                    </div>
                    <span className="text-[10px] bg-[#EAF6EE] text-[#15803D] font-bold px-2 py-0.5 rounded-full">
                      10 Options
                    </span>
                  </div>

                  {/* Section 1: Clinical & Health Tools */}
                  <div className="p-1.5 space-y-0.5">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#728A7A]">
                      Clinical &amp; Purity Tools
                    </div>

                    {/* New Option 1: Quality Lab Certificate Lookup */}
                    <button
                      type="button"
                      onClick={() => handleNav('lab-lookup')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'lab-lookup' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                        <Microscope className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold block truncate">Quality Lab Certificate</span>
                          <span className="text-[9px] bg-[#DCFCE7] text-[#15803D] font-bold px-1.5 py-0.2 rounded-full shrink-0">NEW</span>
                        </div>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Verify batch COA, HPLC assay &amp; Halal tests
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>

                    {/* New Option 2: Pharmacist Consultation Desk */}
                    <button
                      type="button"
                      onClick={() => handleNav('pharmacist')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'pharmacist' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold block truncate">Ask a Pharmacist</span>
                          <span className="text-[9px] bg-[#DCFCE7] text-[#15803D] font-bold px-1.5 py-0.2 rounded-full shrink-0">LIVE</span>
                        </div>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Clinical dosage advice, timings &amp; FAQs
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>

                    {/* Option 3: Drug Interaction Checker */}
                    <button
                      type="button"
                      onClick={() => handleNav('interactions')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'interactions' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold block truncate">Interaction Checker</span>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Check vitamin &amp; prescription medicine clashes
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>

                    {/* Option 4: Health Quiz */}
                    <button
                      type="button"
                      onClick={() => handleNav('assessment')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'assessment' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold block truncate">Personalized Health Quiz</span>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Custom deficiency &amp; vitamin regimen generator
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>

                    {/* Option 5: Prescription Upload */}
                    <button
                      type="button"
                      onClick={() => handleNav('prescription')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'prescription' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold block truncate">Upload Doctor Prescription</span>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Quick pharmacist review &amp; doorstep fulfillment
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>

                    {/* Option 6: Daily Dosage Planner */}
                    <button
                      type="button"
                      onClick={() => handleNav('routine')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'routine' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold block truncate">Dosage Routine Timetable</span>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Morning &amp; night supplement reminder schedule
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>
                  </div>

                  {/* Section 2: Customer Care & Services */}
                  <div className="p-1.5 border-t border-[#E2ECE5] space-y-0.5">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#728A7A]">
                      Customer Care &amp; Sharing
                    </div>

                    {/* Option 7: Track Orders / Account */}
                    <button
                      type="button"
                      onClick={() => handleNav('account')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        currentView === 'account' ? 'bg-[#EAF6EE] text-[#15803D] font-bold' : 'hover:bg-[#F4F9F5] text-[#1E2923]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#F4F9F5] text-[#164E33] flex items-center justify-center shrink-0">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold block truncate">Track My Orders &amp; Account</span>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          View courier status (TCS, CallCourier) &amp; receipts
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                    </button>

                    {/* Option 8: QR & Share Link Modal */}
                    {onOpenQrModal && (
                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onOpenQrModal();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 hover:bg-[#F4F9F5] text-[#1E2923] transition-colors cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#15803D] flex items-center justify-center shrink-0">
                          <QrCode className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold block truncate">Share Website Link &amp; QR</span>
                          <span className="text-[10px] text-[#52665A] block truncate">
                            Open share desk or scan mobile QR code
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#86B99B] shrink-0" />
                      </button>
                    )}

                    {/* Option 9: Direct WhatsApp Support */}
                    <a
                      href="https://api.whatsapp.com/send?phone=923001234567&text=Assalam-o-Alaikum!%20I%20have%20a%20clinical%20question%20regarding%20supplements%20on%20Eco%20Medicines%20%26%20Vitamin."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 hover:bg-[#F0FDF4] text-[#15803D] transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                        <PhoneCall className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold block truncate">WhatsApp Pharmacist</span>
                          <span className="text-[9px] bg-[#25D366] text-white font-bold px-1.5 py-0.2 rounded-full">24/7</span>
                        </div>
                        <span className="text-[10px] text-[#52665A] block truncate">
                          Direct chat with certified dispensary staff
                        </span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#15803D] shrink-0" />
                    </a>

                    {/* Option 10: Download Offline HTML Website */}
                    <a
                      href="/eco-medicines-storefront.html"
                      download="eco-medicines-storefront.html"
                      onClick={() => setMoreMenuOpen(false)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 bg-[#EAF6EE] hover:bg-[#DCFCE7] text-[#15803D] font-semibold transition-colors cursor-pointer border border-[#C2DEC9]"
                      title="Download complete standalone HTML file to run locally without server"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Download className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold block truncate text-[#164E33]">Download HTML Website</span>
                          <span className="text-[9px] bg-[#15803D] text-white font-bold px-1.5 py-0.2 rounded-full shrink-0">STANDALONE</span>
                        </div>
                        <span className="text-[10px] text-[#14532D] block truncate">
                          Full offline file · Runs without AI Studio login
                        </span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                    </a>
                  </div>

                  {/* Section 3: Owner & Store Policies */}
                  <div className="p-1.5 border-t border-[#E2ECE5] space-y-0.5 bg-[#F9FBFA] rounded-b-2xl">
                    <button
                      type="button"
                      onClick={() => handleNav('policies')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer ${
                        currentView === 'policies' ? 'text-[#15803D] font-bold' : 'hover:bg-white text-[#52665A]'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>Policies, DRAP &amp; Halal Guarantee</span>
                    </button>

                    {!isOwnerMode ? (
                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          if (onOpenOwnerModal) onOpenOwnerModal();
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 text-[#15803D] hover:bg-white font-semibold transition-colors cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Dispensary Owner Login (PIN: 7860)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNav('seller')}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 text-[#15803D] hover:bg-white font-bold transition-colors cursor-pointer"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Open Seller Studio (Owner Active)</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#1E2923] rounded-md hover:bg-[#F4F9F5] transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#E2ECE5]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vitamins &amp; wellness..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#F4F9F5] border border-[#D2E7DA] rounded-full text-[#1E2923] placeholder-[#728A7A] focus:outline-none focus:border-[#15803D]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#728A7A] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[65px] bg-[#FCFDFC] border-b border-[#E2ECE5] p-6 shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-200 z-50 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col space-y-2.5 font-medium text-sm">
              <button
                onClick={() => handleNav('home')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'home' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Storefront Overview
              </button>

              <button
                onClick={() => handleNav('catalog')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'catalog' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Dispensary Catalog
              </button>

              <button
                onClick={() => handleNav('lab-lookup')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 flex items-center justify-between ${currentView === 'lab-lookup' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-[#15803D]" />
                  <span>Quality Lab Certificate</span>
                </div>
                <span className="text-[10px] bg-[#DCFCE7] text-[#15803D] font-bold px-2 py-0.5 rounded-full">NEW</span>
              </button>

              <button
                onClick={() => handleNav('pharmacist')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 flex items-center justify-between ${currentView === 'pharmacist' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#15803D]" />
                  <span>Ask a Pharmacist Desk</span>
                </div>
                <span className="text-[10px] bg-[#DCFCE7] text-[#15803D] font-bold px-2 py-0.5 rounded-full">LIVE</span>
              </button>

              <button
                onClick={() => handleNav('assessment')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'assessment' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Health &amp; Vitamin Quiz
              </button>

              <button
                onClick={() => handleNav('prescription')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'prescription' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Prescription Upload
              </button>

              <button
                onClick={() => handleNav('interactions')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'interactions' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Drug-Nutrient Checker
              </button>

              <button
                onClick={() => handleNav('routine')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'routine' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Daily Dosage Schedule
              </button>

              <button
                onClick={() => handleNav('account')}
                className={`text-left py-2 border-b border-[#E2ECE5]/60 ${currentView === 'account' ? 'text-[#15803D] font-bold' : 'text-[#1E2923]'}`}
              >
                Track Orders &amp; Account
              </button>

              {onOpenQrModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQrModal();
                  }}
                  className="text-left py-2 border-b border-[#E2ECE5]/60 text-[#15803D] font-semibold flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Share Website Link &amp; QR</span>
                </button>
              )}

              <a
                href="/eco-medicines-storefront.html"
                download="eco-medicines-storefront.html"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left py-2 border-b border-[#E2ECE5]/60 text-[#15803D] font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Standalone HTML (Offline)</span>
              </a>

              {isOwnerMode && (
                <button
                  onClick={() => handleNav('seller')}
                  className="text-left py-2 border-b border-[#E2ECE5]/60 text-[#15803D] font-bold flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>Seller Studio (Owner)</span>
                </button>
              )}

              <button
                onClick={() => handleNav('policies')}
                className="text-left py-2 text-[#52665A] text-xs"
              >
                Policies &amp; Certifications
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
