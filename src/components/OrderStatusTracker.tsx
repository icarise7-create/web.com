import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { 
  FileCheck2, 
  FlaskConical, 
  Truck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  ShieldCheck,
  Radio
} from 'lucide-react';

interface OrderStatusTrackerProps {
  order: Order;
}

interface MilestoneConfig {
  key: OrderStatus;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: MilestoneConfig[] = [
  {
    key: 'Processing',
    title: 'Processing',
    subtitle: 'Order Verified & Queued',
    description: 'Payment cleared, invoice cataloged, and sent to our licensed apothecary dispensary queue.',
    icon: FileCheck2
  },
  {
    key: 'Dispensing',
    title: 'Dispensing',
    subtitle: 'Apothecary Formulation',
    description: 'Formulas inspected, batch lots documented, and packaged in double-sealed tamper-evident cartons.',
    icon: FlaskConical
  },
  {
    key: 'Shipped',
    title: 'Shipped',
    subtitle: 'In Transit for Delivery',
    description: 'Package handed over to tracked dispatch service. Moving through distribution centers.',
    icon: Truck
  },
  {
    key: 'Delivered',
    title: 'Delivered',
    subtitle: 'Safely Arrived',
    description: 'Delivered to recipient address. Tamper security verification intact upon reception.',
    icon: CheckCircle2
  }
];

const STATUS_INDEX_MAP: Record<OrderStatus, number> = {
  Processing: 0,
  Dispensing: 1,
  Shipped: 2,
  Delivered: 3
};

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const currentStep = STATUS_INDEX_MAP[order.status] ?? 0;
  const isDelivered = order.status === 'Delivered';

  // Courier tracking code
  const trackingNumber = order.trackingCode || `ECO-PK-${order.id.replace(/[^0-9]/g, '')}`;

  return (
    <div className="bg-[#FDFCF9] border border-[#E9E4D6] rounded-xl overflow-hidden transition-all duration-200">
      {/* Tracker Header */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#F5F3EC]/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="flex h-3 w-3 relative">
              {!isDelivered && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F4A3A] opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isDelivered ? 'bg-emerald-600' : 'bg-[#1F4A3A]'}`} />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#726E60]">
                Live Tracking
              </span>
              <span className="text-xs text-[#726E60]">·</span>
              <span className="font-mono text-xs text-[#1F4A3A] font-semibold">{trackingNumber}</span>
            </div>

            <div className="flex items-baseline gap-2 mt-0.5">
              <h4 className="font-serif text-base font-semibold text-[#2B2B26]">
                Current Milestone: <span className="text-[#1F4A3A]">{order.status}</span>
              </h4>
              <span className="text-xs text-[#726E60]">
                (Stage {currentStep + 1} of 4)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-[#726E60] hidden md:inline">
            {isDelivered ? 'Delivery complete' : 'Estimated arrival: 2–3 business days'}
          </span>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-[#1F4A3A] bg-[#F5F3EC] px-3 py-1.5 rounded-full hover:bg-[#E9E4D6] transition-colors"
          >
            <span>{expanded ? 'Hide Timeline' : 'View Milestones'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Stepped Visual Milestones Progress Bar (Horizontal on desktop) */}
      <div className="px-4 sm:px-6 py-4 bg-white border-t border-[#E9E4D6]">
        <div className="relative">
          {/* Connecting Background Line */}
          <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-[#E9E4D6]" />
          
          {/* Active Filled Progress Line */}
          <div 
            className="hidden sm:block absolute top-5 left-6 h-0.5 bg-[#1F4A3A] transition-all duration-500"
            style={{ 
              width: `${(currentStep / (MILESTONES.length - 1)) * 88}%` 
            }}
          />

          {/* Milestone Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 relative z-10">
            {MILESTONES.map((milestone, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              const isFuture = idx > currentStep;
              const Icon = milestone.icon;

              return (
                <div 
                  key={milestone.key} 
                  className={`flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-left sm:text-center transition-all ${
                    isFuture ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      isPast
                        ? 'bg-[#1F4A3A] border-[#1F4A3A] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-white border-[#1F4A3A] text-[#1F4A3A] ring-4 ring-[#1F4A3A]/10 shadow-sm'
                        : 'bg-[#F5F3EC] border-[#E9E4D6] text-[#726E60]'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 fill-current text-[#FDFCF9]" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="min-w-0">
                    <div className="flex items-center sm:justify-center gap-1">
                      <span className={`text-xs font-semibold block ${isCurrent ? 'text-[#1F4A3A]' : 'text-[#2B2B26]'}`}>
                        {milestone.title}
                      </span>
                      {isCurrent && (
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#E0759A]" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#726E60] line-clamp-1 block sm:text-center">
                      {milestone.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded Detailed Milestone Activity Log */}
      {expanded && (
        <div className="p-4 sm:p-6 bg-[#F5F3EC]/70 border-t border-[#E9E4D6] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-[#726E60] border-b border-[#E9E4D6] pb-2">
            <span className="font-semibold text-[#2B2B26] uppercase tracking-wider text-[10px]">
              Apothecary Chain of Custody &amp; Dispatch Log
            </span>
            <span>Destination: {order.city}, {order.zip}</span>
          </div>

          <div className="space-y-3">
            {MILESTONES.map((milestone, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              const isFuture = idx > currentStep;
              const Icon = milestone.icon;

              return (
                <div
                  key={milestone.key}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                    isCurrent
                      ? 'bg-white border-[#1F4A3A] shadow-xs'
                      : isPast
                      ? 'bg-white/80 border-[#E9E4D6]'
                      : 'bg-transparent border-dashed border-[#E9E4D6] opacity-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    isCurrent 
                      ? 'bg-[#1F4A3A] text-white' 
                      : isPast 
                      ? 'bg-emerald-50 text-emerald-800' 
                      : 'bg-[#E9E4D6]/60 text-[#726E60]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold ${isCurrent ? 'text-[#1F4A3A]' : 'text-[#2B2B26]'}`}>
                        {milestone.title} — {milestone.subtitle}
                      </span>
                      <span className="text-[10px] font-medium text-[#726E60]">
                        {isPast ? 'Completed ✓' : isCurrent ? 'Active Now' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-[#726E60] mt-0.5 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#726E60]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1F4A3A]" />
              <span>Tamper-evident sealing inspection verified at dispatch.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E0759A]" />
              <span>Delivering to: {order.shippingAddress}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
