import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  HelpCircle, 
  Sparkles, 
  Award, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import pharmacistImg from '../assets/images/pharmacist_doctor_consult_1790695137119.jpg';

interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FREQUENT_QUESTIONS: QAItem[] = [
  {
    id: 'q1',
    category: 'Vitamins & Timing',
    question: 'Should I take multivitamins in the morning or at night before bed?',
    answer: 'Multivitamins should almost always be taken with breakfast or lunch. B-complex vitamins and ginseng are metabolic catalysts that convert food into ATP energy, which can cause insomnia if taken right before bedtime. Fat-soluble vitamins (A, D, E, K) also absorb significantly better alongside the dietary fats in a cooked morning meal.'
  },
  {
    id: 'q2',
    category: 'Halal Certification',
    question: 'Are your Omega-3 softgels and vitamin capsules 100% Halal certified in Pakistan?',
    answer: 'Yes, 100%. All softgel capsules dispensed by Eco Medicines & Vitamin use certified bovine gelatin processed exclusively from Halal-slaughtered cattle under SANHA Halal / Jamia Ashrafia certification, adhering to DRAP S.R.O. regulations. No porcine gelatin is ever utilized.'
  },
  {
    id: 'q3',
    category: 'Hair Fall & Biotin',
    question: 'How long does it take for Biotin 2500mcg to stop active hair shedding?',
    answer: 'The human hair growth cycle (anagen phase) requires approximately 8 to 12 weeks of consistent nutritional therapy to reflect noticeable improvements. Keratin synthesis begins strengthening the follicle bulb within 3 weeks, followed by reduced brush shedding by week 6.'
  },
  {
    id: 'q4',
    category: 'Vitamin D3 & Calcium',
    question: 'Why does my doctor prescribe Vitamin D3 together with Vitamin K2 (MK-7)?',
    answer: 'Vitamin D3 accelerates calcium absorption from the intestine into the bloodstream. However, without Vitamin K2 (specifically MK-7), that absorbed calcium can calcify and harden in your arterial walls rather than bones. MK-7 activates osteocalcin, navigating calcium safely into bone tissue.'
  }
];

export const PharmacistConsultDesk: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'pharmacist'; text: string; time: string }>>([
    {
      sender: 'pharmacist',
      text: 'Salam! I am Dr. Farah Tariq (Pharm.D), Senior Clinical Pharmacist at Eco Medicines Pakistan. How can I assist you with your prescriptions, vitamin dosages, or supplement timing today?',
      time: '10:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: timeStr }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you for sharing your query. In clinical pharmacology, timing, gastric pH, and dietary co-factors are vital for optimal bioavailability. Please ensure you take any fat-soluble formulations with a meal containing healthy fats. If this is linked to a prescription drug, our dispensary team can review your medical slip anytime via our Prescription Upload desk!";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('pregnant') || lower.includes('pregnancy')) {
        reply = "During pregnancy and lactation, all active nutraceuticals must be cleared with your obstetrician. We specifically formulate DRAP-enlisted Folic Acid (400mcg) and elemental Iron with Vitamin C for optimal fetal neural tube support.";
      } else if (lower.includes('kidney') || lower.includes('stone') || lower.includes('calcium')) {
        reply = "For individuals prone to calcium oxalate kidney stones, Calcium Citrate is preferred over Carbonate, and adequate daily hydration (2.5L minimum water) alongside Vitamin B6 and K2 helps prevent mineral precipitation.";
      } else if (lower.includes('timing') || lower.includes('when')) {
        reply = "General clinical rule: Water-soluble vitamins (Vitamin C, B-complex) and Multivitamins: Morning with breakfast. Mineral relaxants (Magnesium Glycinate): 45 minutes prior to bedtime. Separate calcium from iron by at least 2 hours.";
      }

      setMessages(prev => [...prev, { 
        sender: 'pharmacist', 
        text: reply, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1200);
  };

  const handleSelectPreloadedQ = (item: QAItem) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: item.question, time: timeStr },
      { sender: 'pharmacist', text: item.answer, time: timeStr }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
          Live Clinical Tele-Pharmacy
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#164E33] text-balance">
          Ask a Certified Clinical Pharmacist (Pharm.D)
        </h2>
        <p className="text-sm text-[#477A5C] max-w-xl mx-auto leading-relaxed">
          Receive confidential, evidence-based guidance on formulation dosages, drug interactions, DRAP enlistment validity, and administration timing directly from licensed pharmacists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Pharmacist Bio Card & Common Topics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E2ECE5] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#15803D] shrink-0">
                <img 
                  src={pharmacistImg} 
                  alt="Dr. Farah Tariq Clinical Pharmacist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1E2923]">Dr. Farah Tariq</h3>
                <p className="text-xs text-[#15803D] font-semibold">Pharm.D, M.Phil Clinical Pharmacy</p>
                <p className="text-[11px] text-[#52665A]">PPC License # 1482-PB · 12 Yrs Experience</p>
              </div>
            </div>

            <div className="text-xs text-[#52665A] space-y-2 border-t border-[#E2ECE5] pt-3">
              <div className="flex items-center gap-2 text-[#15803D] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>On-Duty Clinical Supervising Pharmacist</span>
              </div>
              <p>
                Available daily 9:00 AM – 11:00 PM PKT for dosage calibrations, maternal health advice, and prescription auditing.
              </p>
            </div>
          </div>

          {/* Quick Frequent Questions */}
          <div className="bg-[#F0FDF4] border border-[#C2DEC9] rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] block">
              Popular Clinical Inquiries (Click to Ask)
            </span>
            <div className="space-y-2">
              {FREQUENT_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectPreloadedQ(q)}
                  className="w-full text-left p-2.5 rounded-lg bg-white border border-[#D2E7DA] hover:border-[#15803D] text-xs font-medium text-[#1E2923] hover:text-[#15803D] transition-colors cursor-pointer flex items-center justify-between gap-2"
                >
                  <span className="truncate">{q.question}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Chat Box */}
        <div className="lg:col-span-7 bg-white border border-[#E2ECE5] rounded-2xl shadow-xs overflow-hidden flex flex-col h-[520px]">
          
          {/* Top Bar */}
          <div className="bg-[#F9FBFA] px-5 py-3.5 border-b border-[#E2ECE5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <div>
                <span className="text-xs font-bold text-[#1E2923] block leading-none">Clinical Tele-Desk Online</span>
                <span className="text-[10px] text-[#52665A]">Average Response: &lt; 2 Minutes</span>
              </div>
            </div>
            <span className="text-[11px] bg-[#EAF6EE] text-[#15803D] px-2.5 py-0.5 rounded-full font-bold">
              100% Confidential
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FCFDFC]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#15803D] text-white rounded-br-xs'
                      : 'bg-[#F0FDF4] text-[#1E2923] border border-[#C2DEC9] rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-[#8CA094] mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#52665A] bg-[#F0FDF4] p-3 rounded-xl border border-[#C2DEC9] w-fit">
                <Clock className="w-3.5 h-3.5 animate-spin text-[#15803D]" />
                <span>Dr. Farah is reviewing clinical references...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E2ECE5] bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about vitamin dosages, pregnancy safety, timing..."
              className="flex-1 px-4 py-2.5 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-full text-[#1E2923] focus:outline-none focus:border-[#15803D]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-full transition-colors cursor-pointer disabled:opacity-40"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
