import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getLiveStoreUrl, getSharedStoreUrl } from '../utils/publicUrl';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  ExternalLink, 
  Smartphone, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Calendar,
  AlertCircle,
  HelpCircle,
  Globe,
  Radio
} from 'lucide-react';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

interface DestinationOption {
  id: string;
  name: string;
  subpath: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ShareQrModal: React.FC<ShareQrModalProps> = ({ 
  isOpen, 
  onClose,
  url
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string>('home');
  const [linkMode, setLinkMode] = useState<'live' | 'shared'>('live');
  const [showErrorExplainer, setShowErrorExplainer] = useState(false);
  const [qrSize, setQrSize] = useState<number>(170);

  if (!isOpen) return null;

  // Compute live active URL vs shared URL
  const liveBaseUrl = getLiveStoreUrl();
  const sharedBaseUrl = getSharedStoreUrl();
  const activeBaseUrl = url && url.trim() ? url : (linkMode === 'live' ? liveBaseUrl : sharedBaseUrl);

  // Available link options with deep links
  const LINK_OPTIONS: DestinationOption[] = [
    {
      id: 'home',
      name: 'Storefront Homepage (Main)',
      subpath: '',
      description: 'Public storefront overview, dispensary status, and health pillars',
      icon: Sparkles
    },
    {
      id: 'assessment',
      name: 'Personalized Health & Vitamin Quiz',
      subpath: '#assessment',
      description: 'Direct link to 4-step personalized regimen builder',
      icon: Sparkles
    },
    {
      id: 'prescription',
      name: 'Digital Prescription Upload',
      subpath: '#prescription',
      description: 'Direct link for patients to upload doctor slips for rapid review',
      icon: FileText
    },
    {
      id: 'interactions',
      name: 'Drug-Nutrient Interaction Checker',
      subpath: '#interactions',
      description: 'Direct compatibility verification for vitamins and medications',
      icon: ShieldCheck
    },
    {
      id: 'routine',
      name: 'Daily Dosage & Habit Planner',
      subpath: '#routine',
      description: 'Direct patient timetable for morning & night supplements',
      icon: Calendar
    }
  ];

  const currentOption = LINK_OPTIONS.find(o => o.id === selectedDestination) || LINK_OPTIONS[0];
  const activeUrl = `${activeBaseUrl}${currentOption.subpath}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const svgElement = document.getElementById('storefront-qr-code');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `eco-medicines-${selectedDestination}-qr.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Scrollable Modal Container with smooth styled scrollbar */}
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#C2DEC9] relative space-y-4 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto custom-scrollbar">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#52665A] hover:text-[#1E2923] rounded-full hover:bg-[#F4F9F5] transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-11 h-11 rounded-2xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D]">
            Direct Customer Access &amp; Sharing Desk
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#164E33]">
            Website Link &amp; QR Code
          </h3>
          <p className="text-xs text-[#52665A] max-w-sm mx-auto leading-relaxed">
            Open this website directly in Google Chrome, Safari, or on mobile. Choose your preferred link type below.
          </p>
        </div>

        {/* Download Standalone HTML Card */}
        <div className="bg-[#EAF6EE] border-2 border-[#15803D]/30 rounded-2xl p-4 text-xs space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-[#164E33]">
              <div className="w-7 h-7 rounded-lg bg-[#15803D] text-white flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold">Download Offline HTML Website</span>
                <span className="text-[10px] text-[#15803D] font-medium">Standalone single-file edition</span>
              </div>
            </div>
            <span className="text-[9px] bg-[#15803D] text-white font-bold px-2 py-0.5 rounded-full">
              NO SERVER NEEDED
            </span>
          </div>
          <p className="text-[11px] text-[#14532D] leading-relaxed">
            Need a local copy? Download the complete website as a single self-contained <strong className="font-mono">.html</strong> file. It runs instantly on any laptop, tablet, or phone in Chrome/Safari with full catalog, cart, and offline WhatsApp order generator!
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="/eco-medicines-storefront.html"
              download="eco-medicines-storefront.html"
              className="flex-1 py-2 px-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .HTML File</span>
            </a>
            <a
              href="/eco-medicines-storefront.html"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-white hover:bg-[#F0FDF4] text-[#15803D] border border-[#C2DEC9] text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>

        {/* No-Login Public Access Guidance */}
        <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-2xl p-3.5 text-xs text-[#14532D] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#164E33]">
            <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
            <span>How to make this website open WITHOUT login:</span>
          </div>
          <p className="text-[11px] text-[#166534] leading-relaxed">
            By default, Google protects your editing workspace. To let anyone open this website without logging in:
          </p>
          <ol className="text-[11px] space-y-1 list-decimal list-inside text-[#14532D] bg-white/70 p-2.5 rounded-xl border border-[#C2DEC9]">
            <li>Click the <strong className="text-[#15803D]">"Share"</strong> button at the top-right corner of Google AI Studio.</li>
            <li>Change the permission to <strong className="text-[#15803D]">"Anyone with the link"</strong>.</li>
            <li>Click <strong className="text-[#15803D]">"Publish" / "Save"</strong>.</li>
          </ol>
          <p className="text-[10px] text-[#227242]">
            After clicking Share once, the Public Share URL will open immediately on any phone or browser with <strong>zero sign-in required</strong>!
          </p>
        </div>
        <div className="bg-[#F4F9F5] p-2.5 rounded-2xl border border-[#D2E7DA] space-y-2">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-[#164E33] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#15803D]" />
              Select Link Format:
            </span>
            <button
              type="button"
              onClick={() => setShowErrorExplainer(!showErrorExplainer)}
              className="text-[11px] text-[#15803D] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Why Google gave 404 error?</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setLinkMode('live')}
              className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                linkMode === 'live'
                  ? 'bg-white border-[#15803D] text-[#164E33] shadow-xs'
                  : 'bg-transparent border-transparent hover:bg-white/60 text-[#52665A]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Radio className={`w-3.5 h-3.5 ${linkMode === 'live' ? 'text-[#15803D]' : 'text-gray-400'}`} />
                <span className="text-xs font-bold">Live Active Link</span>
                <span className="text-[9px] bg-[#EAF6EE] text-[#15803D] font-bold px-1.5 py-0.2 rounded-full">ACTIVE</span>
              </div>
              <p className="text-[10px] text-[#52665A] leading-tight">
                Currently running instance. Always opens immediately.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setLinkMode('shared')}
              className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                linkMode === 'shared'
                  ? 'bg-white border-[#15803D] text-[#164E33] shadow-xs'
                  : 'bg-transparent border-transparent hover:bg-white/60 text-[#52665A]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Radio className={`w-3.5 h-3.5 ${linkMode === 'shared' ? 'text-[#15803D]' : 'text-gray-400'}`} />
                <span className="text-xs font-bold">Public Share URL</span>
              </div>
              <p className="text-[10px] text-[#52665A] leading-tight">
                Requires clicking "Share" in AI Studio to activate.
              </p>
            </button>
          </div>

          {/* Error Explainer Accordion */}
          {showErrorExplainer && (
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 space-y-1.5 animate-in fade-in-50 duration-150">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Fixing "Google Error: 404 Page not found"</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-900/90">
                1. <strong>Why it happens:</strong> Google Cloud assigns a shared preview URL (<code className="bg-amber-100 px-1 py-0.5 rounded text-[10px]">ais-pre-...</code>), but Google only turns it ON after you click the <strong>"Share"</strong> button at the top-right of your AI Studio screen. Until then, Google shows error 404.
              </p>
              <p className="text-[11px] leading-relaxed text-amber-900/90">
                2. <strong>The solution:</strong> Use the <strong>Live Active Link</strong> selected above! It connects directly to your live instance and opens without showing the 404 error.
              </p>
            </div>
          )}
        </div>

        {/* Section 1: Scrollable Link & QR Destination Options */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#52665A]">
              Choose Page Destination
            </label>
            <span className="text-[10px] font-semibold text-[#15803D] bg-[#EAF6EE] px-2 py-0.5 rounded-full">
              {LINK_OPTIONS.length} Available
            </span>
          </div>

          {/* Scrollable Options List with Custom Scrollbar */}
          <div className="max-h-28 overflow-y-auto custom-scrollbar border border-[#D2E7DA] rounded-xl p-1.5 space-y-1 bg-[#F9FBFA]">
            {LINK_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedDestination === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDestination(opt.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected 
                      ? 'bg-white border border-[#15803D] text-[#15803D] font-bold shadow-2xs' 
                      : 'hover:bg-white text-[#1E2923] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#15803D]' : 'text-[#52665A]'}`} />
                    <div className="truncate">
                      <span className="block truncate">{opt.name}</span>
                      <span className="text-[10px] text-[#52665A] block truncate">{opt.description}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: QR Code Canvas with size toggle */}
        <div className="bg-[#F9FBFA] p-3 sm:p-4 rounded-2xl border border-[#D2E7DA] flex flex-col items-center justify-center space-y-2.5">
          
          {/* Active Option Label */}
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] block">
              QR Code Destination
            </span>
            <span className="text-xs font-bold text-[#1E2923]">
              {currentOption.name}
            </span>
          </div>

          {/* QR Code Graphic with high contrast */}
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#E2ECE5]">
            <QRCodeSVG
              id="storefront-qr-code"
              value={activeUrl}
              size={qrSize}
              level="M"
              fgColor="#164E33"
              bgColor="#FFFFFF"
              includeMargin={false}
            />
          </div>

          <div className="flex items-center justify-between w-full max-w-xs text-xs">
            <div className="flex items-center gap-1.5 text-[#15803D] font-semibold text-[11px]">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Scan with mobile camera</span>
            </div>

            {/* QR Size Toggle */}
            <div className="flex items-center gap-1 bg-white border border-[#D2E7DA] p-0.5 rounded-lg text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setQrSize(140)}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${qrSize === 140 ? 'bg-[#15803D] text-white' : 'text-[#52665A]'}`}
              >
                S
              </button>
              <button
                type="button"
                onClick={() => setQrSize(170)}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${qrSize === 170 ? 'bg-[#15803D] text-white' : 'text-[#52665A]'}`}
              >
                M
              </button>
              <button
                type="button"
                onClick={() => setQrSize(210)}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${qrSize === 210 ? 'bg-[#15803D] text-white' : 'text-[#52665A]'}`}
              >
                L
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Link with Horizontal Scrollbar & 1-Click Copy */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#52665A]">
              Direct Website URL
            </label>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#15803D] hover:underline font-bold flex items-center gap-1"
            >
              <span>Open Link Now</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Link box with horizontal scrollbar */}
          <div className="flex items-center gap-2 bg-[#F4F9F5] border border-[#D2E7DA] p-2 rounded-xl">
            <div className="flex-1 overflow-x-auto custom-scrollbar py-1">
              <span className="text-xs text-[#1E2923] font-mono select-all whitespace-nowrap block px-1">
                {activeUrl}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                copied 
                  ? 'bg-[#15803D] text-white shadow-xs' 
                  : 'bg-white text-[#15803D] hover:bg-[#EAF6EE] border border-[#C2DEC9]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
          <span className="text-[10px] text-[#52665A] block">
            Click "Open Link Now" to test immediately in your browser.
          </span>
        </div>

        {/* Section 4: Action Buttons (WhatsApp, Test Open & Download SVG) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${currentOption.name} on Eco Medicines & Vitamin: ${activeUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </a>

          <button
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#D2E7DA] hover:bg-[#F4F9F5] text-[#1E2923] text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Download QR SVG</span>
          </button>
        </div>

      </div>
    </div>
  );
};
