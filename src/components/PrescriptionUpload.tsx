import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  User, 
  Phone, 
  Building2, 
  FileCheck2,
  Calendar,
  Lock
} from 'lucide-react';

interface PrescriptionUploadProps {
  onSuccessToast?: (msg: string) => void;
}

export const PrescriptionUpload: React.FC<PrescriptionUploadProps> = ({ onSuccessToast }) => {
  const [patientName, setPatientName] = useState('Ayesha Malik');
  const [patientAge, setPatientAge] = useState('32');
  const [patientPhone, setPatientPhone] = useState('0300-4591024');
  const [doctorName, setDoctorName] = useState('Dr. Salman Qureshi (MBBS, FCPS)');
  const [hospitalName, setHospitalName] = useState('Shaukat Khanum / Doctors Hospital Lahore');
  const [notes, setNotes] = useState('Please check if substitute brand for calcium carbonate is available.');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; previewUrl?: string } | null>({
    name: 'Dr_Salman_Prescription_Sep2026.pdf',
    size: '1.4 MB'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert('Please attach a prescription image or PDF.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `RX-PKR-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: ticketId,
        time: 'Just now'
      });
      if (onSuccessToast) {
        onSuccessToast(`Prescription submitted! Verification ticket: ${ticketId}`);
      }
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
          Digital Prescription Dispensary Counter
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#164E33] text-balance">
          Upload Doctor's Prescription for Certified Verification
        </h2>
        <p className="text-sm text-[#477A5C] max-w-xl mx-auto leading-relaxed">
          In accordance with pharmacy and healthcare regulations, all prescription-grade medicines require authentic physician orders. Slips are verified promptly by clinical staff.
        </p>
      </div>

      {submittedTicket ? (
        <div className="bg-[#F0FDF4] border border-[#C2DEC9] rounded-2xl p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-[#15803D] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <FileCheck2 className="w-8 h-8 text-[#86EFAC]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
              Prescription Successfully Enqueued
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#164E33]">
              Reference Ticket: {submittedTicket.id}
            </h3>
            <p className="text-xs sm:text-sm text-[#477A5C] max-w-md mx-auto">
              Clinical dispensary staff has been assigned to verify your prescription dosage and drug safety.
            </p>
          </div>

          {/* Review Status Stepper */}
          <div className="max-w-md mx-auto bg-white p-4 rounded-xl border border-[#D2E7DA] text-left space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2ECE5]">
              <span className="font-semibold text-[#1E2923]">Patient: {patientName} ({patientAge} yrs)</span>
              <span className="text-[#15803D] font-bold">15 min SLA</span>
            </div>
            <div className="space-y-2 text-[#52665A]">
              <div className="flex items-center gap-2 text-[#15803D] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Document Image &amp; Signature Validated</span>
              </div>
              <div className="flex items-center gap-2 text-[#15803D] font-semibold">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Clinical Verification of Contraindications</span>
              </div>
              <div className="flex items-center gap-2 text-[#8CA094]">
                <div className="w-4 h-4 rounded-full border border-dashed border-[#8CA094] flex items-center justify-center text-[10px]">3</div>
                <span>Dispensary Packing &amp; Dispatch</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setSubmittedTicket(null)}
              className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
            >
              Upload Another Prescription
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#E2ECE5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* File Upload Zone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              1. Prescription Document / Photo (JPEG, PNG, or PDF) *
            </label>
            
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                uploadedFile 
                  ? 'border-[#15803D] bg-[#F0FDF4]/50' 
                  : 'border-[#C2DEC9] bg-[#F9FBFA] hover:border-[#15803D]'
              }`}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-between max-w-md mx-auto bg-white p-3 rounded-lg border border-[#C2DEC9]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#15803D]" />
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#1E2923] truncate max-w-[200px]">{uploadedFile.name}</p>
                      <p className="text-[11px] text-[#52665A]">{uploadedFile.size} · Uploaded</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="p-1.5 text-rose-600 hover:text-rose-800 rounded-md hover:bg-rose-50 cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-10 h-10 text-[#15803D] mx-auto" />
                  <p className="text-xs font-semibold text-[#1E2923]">
                    Drag &amp; drop your prescription slip here, or{' '}
                    <label className="text-[#15803D] hover:underline cursor-pointer">
                      browse files
                      <input 
                        type="file" 
                        accept="image/*,application/pdf" 
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                  </p>
                  <p className="text-[11px] text-[#52665A]">
                    Ensure physician name, clinic stamp, patient name, and medicines are legible.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Patient Details Grid */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              2. Patient &amp; Prescribing Physician Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Patient Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                    placeholder="e.g. Ayesha Malik"
                  />
                  <User className="w-4 h-4 text-[#728A7A] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Patient Age (Years) *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                    placeholder="e.g. 32"
                  />
                  <Calendar className="w-4 h-4 text-[#728A7A] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Contact Phone Number (For Verification Call) *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                    placeholder="e.g. 0300-4591024"
                  />
                  <Phone className="w-4 h-4 text-[#728A7A] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">Prescribing Doctor &amp; Hospital</label>
                <div className="relative">
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                    placeholder="e.g. Dr. Salman Qureshi"
                  />
                  <Building2 className="w-4 h-4 text-[#728A7A] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#52665A] mb-1">
                Special Instructions or Allergies (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-lg text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                placeholder="List known allergies (e.g. penicillin, sulfa) or generic preference..."
              />
            </div>
          </div>

          {/* Privacy & Regulatory Trust Callout */}
          <div className="bg-[#EAF6EE] rounded-xl p-4 border border-[#C2DEC9] flex items-center justify-between gap-4 text-xs text-[#164E33]">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                Encrypted medical upload protected under Healthcare Data Confidentiality. Slips are retained strictly for dispensing audit.
              </span>
            </div>
            <span className="hidden sm:inline font-bold shrink-0">Dispensary Certified</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Validating with Dispensary...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
                  <span>Submit Prescription for Review</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
};
