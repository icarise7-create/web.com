import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Award, 
  Microscope, 
  Check, 
  AlertCircle
} from 'lucide-react';
import qualityLabImg from '../assets/images/quality_lab_certificate_1790695155337.jpg';

interface LabCert {
  batchId: string;
  drapNumber: string;
  productName: string;
  manufactureDate: string;
  expiryDate: string;
  purityScore: string;
  heavyMetals: string;
  microbialStatus: string;
  halalAuthority: string;
  labAnalyst: string;
}

const CERTIFICATES: Record<string, LabCert> = {
  'DRAP-008912': {
    batchId: 'BATCH-2026-A1',
    drapNumber: 'DRAP Enlistment # 008912',
    productName: 'Vitamax Pure Daily Botanical Multivitamin & Zinc',
    manufactureDate: 'September 2026',
    expiryDate: 'August 2029',
    purityScore: '99.8% Active Potency (HPLC Validated)',
    heavyMetals: 'Lead < 0.05 ppm, Arsenic Non-Detectable (ICP-MS)',
    microbialStatus: 'USP <2021> Microbial Clearance Passed',
    halalAuthority: 'SANHA Halal / Jamia Ashrafia Certified Halal Bovine',
    labAnalyst: 'Dr. Tariq Mahmood (Senior QC Analyst, M.Phil Pharmaceutics)'
  },
  'BATCH-2026-A1': {
    batchId: 'BATCH-2026-A1',
    drapNumber: 'DRAP Enlistment # 008912',
    productName: 'Vitamax Pure Daily Botanical Multivitamin & Zinc',
    manufactureDate: 'September 2026',
    expiryDate: 'August 2029',
    purityScore: '99.8% Active Potency (HPLC Validated)',
    heavyMetals: 'Lead < 0.05 ppm, Arsenic Non-Detectable (ICP-MS)',
    microbialStatus: 'USP <2021> Microbial Clearance Passed',
    halalAuthority: 'SANHA Halal / Jamia Ashrafia Certified Halal Bovine',
    labAnalyst: 'Dr. Tariq Mahmood (Senior QC Analyst, M.Phil Pharmaceutics)'
  },
  'DRAP-006523': {
    batchId: 'BATCH-2026-B4',
    drapNumber: 'DRAP Enlistment # 006523',
    productName: 'Deep-Sea Omega-3 Pure Icelandic High-DHA Softgels',
    manufactureDate: 'September 2026',
    expiryDate: 'August 2029',
    purityScore: 'Total Omega-3 1000mg per dose (600 EPA / 400 DHA)',
    heavyMetals: 'Mercury Non-Detectable (< 0.001 ppm), PCBs Below Detection',
    microbialStatus: 'European Pharmacopoeia (Ph. Eur.) Microbial Pass',
    halalAuthority: '100% Halal Certified Bovine Gelatin Capsule',
    labAnalyst: 'Dr. Aiman Raza (Lead Analytical Chemist)'
  },
  'BATCH-2026-B4': {
    batchId: 'BATCH-2026-B4',
    drapNumber: 'DRAP Enlistment # 006523',
    productName: 'Deep-Sea Omega-3 Pure Icelandic High-DHA Softgels',
    manufactureDate: 'September 2026',
    expiryDate: 'August 2029',
    purityScore: 'Total Omega-3 1000mg per dose (600 EPA / 400 DHA)',
    heavyMetals: 'Mercury Non-Detectable (< 0.001 ppm), PCBs Below Detection',
    microbialStatus: 'European Pharmacopoeia (Ph. Eur.) Microbial Pass',
    halalAuthority: '100% Halal Certified Bovine Gelatin Capsule',
    labAnalyst: 'Dr. Aiman Raza (Lead Analytical Chemist)'
  },
  'DRAP-008129': {
    batchId: 'BATCH-2026-C2',
    drapNumber: 'DRAP Enlistment # 008129',
    productName: 'Bioactive Vitamin D3 5000 IU + K2 MK-7 MCT Drops',
    manufactureDate: 'September 2026',
    expiryDate: 'September 2028',
    purityScore: '100% All-Trans Menaquinone-7 (MK-7) Potency',
    heavyMetals: 'Compliant with USP Limits (< 0.1 ppm)',
    microbialStatus: 'Sterile sublingual lipid carrier certified',
    halalAuthority: 'Vegetarian Wild Lichen Origin / Pure MCT Base',
    labAnalyst: 'Dr. Tariq Mahmood (Senior QC Analyst)'
  }
};

export const QualityLabLookup: React.FC = () => {
  const [searchInput, setSearchInput] = useState('DRAP-008912');
  const [activeCert, setActiveCert] = useState<LabCert | null>(CERTIFICATES['DRAP-008912']);
  const [isSearched, setIsSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const match = CERTIFICATES[query] || Object.values(CERTIFICATES).find(c => 
      c.drapNumber.toUpperCase().includes(query) || 
      c.batchId.toUpperCase().includes(query) ||
      c.productName.toUpperCase().includes(query)
    );

    setActiveCert(match || null);
    setIsSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
          Regulatory Transparency &amp; Assay Verification
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#164E33] text-balance">
          DRAP Quality &amp; Lab Certificate (COA) Verification
        </h2>
        <p className="text-sm text-[#477A5C] max-w-xl mx-auto leading-relaxed">
          Every batch formulated under Eco Medicines undergoes rigorous third-party analytical testing. Verify DRAP enlistment numbers and view full Certificates of Analysis (COA).
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white border border-[#E2ECE5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter DRAP Enlistment # (e.g. DRAP-008912) or Batch Code..."
              className="w-full pl-10 pr-4 py-3 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-xl text-[#1E2923] focus:outline-none focus:border-[#15803D]"
            />
            <Search className="w-4 h-4 text-[#728A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Microscope className="w-4 h-4" />
            <span>Verify Batch COA</span>
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#52665A]">
          <span>Verified Demo Batches:</span>
          {['DRAP-008912', 'BATCH-2026-B4', 'DRAP-008129'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setSearchInput(code);
                setActiveCert(CERTIFICATES[code] || null);
              }}
              className="px-2.5 py-1 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] border border-[#C2DEC9] rounded-md font-mono text-[11px] cursor-pointer"
            >
              {code}
            </button>
          ))}
        </div>

        {/* Certificate Display */}
        {activeCert ? (
          <div className="mt-6 border border-[#C2DEC9] rounded-2xl overflow-hidden bg-[#FBFDFC]">
            <div className="bg-[#EAF6EE] p-5 border-b border-[#C2DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#86EFAC]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] block">
                    DRAP Authenticated Certificate of Analysis
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#164E33]">
                    {activeCert.productName}
                  </h4>
                </div>
              </div>

              <div className="text-right self-start sm:self-auto">
                <span className="text-xs font-mono font-bold text-[#15803D] bg-white px-2.5 py-1 rounded-md border border-[#C2DEC9]">
                  {activeCert.drapNumber}
                </span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3.5">
                <div>
                  <span className="text-[#52665A] block">Batch Identification</span>
                  <span className="font-mono font-bold text-[#1E2923] text-sm">{activeCert.batchId}</span>
                </div>
                <div>
                  <span className="text-[#52665A] block">Manufacturing &amp; Expiry Window</span>
                  <span className="font-medium text-[#1E2923]">{activeCert.manufactureDate} — Exp: {activeCert.expiryDate}</span>
                </div>
                <div>
                  <span className="text-[#52665A] block">Assay Potency Standard</span>
                  <span className="font-medium text-[#15803D]">{activeCert.purityScore}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-[#52665A] block">Heavy Metal Screening (Lead, Mercury, Arsenic)</span>
                  <span className="font-medium text-[#1E2923]">{activeCert.heavyMetals}</span>
                </div>
                <div>
                  <span className="text-[#52665A] block">Microbiological Safety</span>
                  <span className="font-medium text-[#1E2923]">{activeCert.microbialStatus}</span>
                </div>
                <div>
                  <span className="text-[#52665A] block">Halal Authority Status</span>
                  <span className="font-bold text-[#15803D]">{activeCert.halalAuthority}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#E2ECE5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#52665A]">
              <div>
                <span>Audited by: </span>
                <strong className="text-[#1E2923]">{activeCert.labAnalyst}</strong>
              </div>
              <button
                onClick={() => alert(`Certificate of Analysis for ${activeCert.batchId} verified and ready for download.`)}
                className="text-[#15803D] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sealed PDF Report</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-[#F9FBFA] rounded-xl border border-dashed border-[#C2DEC9] space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="font-serif text-base font-bold text-[#1E2923]">No Certificate Found</h4>
            <p className="text-xs text-[#52665A] max-w-sm mx-auto">
              Please verify the code entered. You can test with <strong>DRAP-008912</strong> or <strong>BATCH-2026-B4</strong> above.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
