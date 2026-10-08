import React, { useState } from 'react';
import { Order, CustomerProfile } from '../types';
import { formatPKR } from '../utils/currency';
import { OrderStatusTracker } from './OrderStatusTracker';
import { User, Package, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AccountViewProps {
  orders: Order[];
  profile: CustomerProfile;
  onUpdateProfile: (profile: CustomerProfile) => void;
  onNavigateCatalog: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  orders,
  profile,
  onUpdateProfile,
  onNavigateCatalog
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4A3A]">
          Customer Portal
        </span>
        <h1 className="font-serif text-3xl font-semibold text-[#2B2B26] mt-1">
          Account &amp; Real-Time Order Tracking
        </h1>
        <p className="text-xs sm:text-sm text-[#726E60] mt-1">
          Review personal customer details and monitor live fulfillment milestones for your apothecary orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white border border-[#E9E4D6] rounded-2xl p-6 shadow-xs h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#F5F3EC] flex items-center justify-center text-[#1F4A3A]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#2B2B26]">{profile.name}</h3>
              <span className="text-xs text-[#726E60]">Apothecary Member</span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-3 text-xs pt-2">
            <div>
              <label className="font-semibold text-[#2B2B26] block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F3EC] border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26]"
              />
            </div>
            <div>
              <label className="font-semibold text-[#2B2B26] block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F3EC] border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#1F4A3A] hover:bg-[#2E664F] text-white font-semibold text-xs rounded-full transition-colors cursor-pointer"
            >
              {saved ? 'Updated ✓' : 'Save Details'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E9E4D6] text-xs space-y-2.5 text-[#726E60]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F4A3A]" />
              <span>Tamper-evident sealing guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1F4A3A]" />
              <span>Orders ship within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Orders Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-[#E9E4D6] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-[#2B2B26]">
                Your Orders ({orders.length})
              </h3>
              <span className="text-xs text-[#726E60]">Real-Time Milestone Tracking</span>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-[#726E60]">
                <Package className="w-10 h-10 mx-auto text-[#E9E4D6] mb-2" />
                <p className="text-sm font-medium text-[#2B2B26]">No past orders found</p>
                <p className="text-xs text-[#726E60] mt-1 mb-4">
                  When you check out items from your shopping bag, order tracking will appear here.
                </p>
                <button
                  onClick={onNavigateCatalog}
                  className="px-5 py-2 bg-[#1F4A3A] text-white text-xs font-semibold rounded-full cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="border border-[#E9E4D6] rounded-2xl p-5 bg-white shadow-xs space-y-4"
                  >
                    {/* Order summary header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E4D6] pb-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base text-[#2B2B26]">
                            Order #{order.id}
                          </span>
                          <span className="text-[#726E60]">· Placed {order.date}</span>
                        </div>
                        <span className="text-[#726E60] text-[11px] block mt-0.5">
                          Delivery for {order.customerName} ({order.shippingAddress}, {order.city})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#1F4A3A] text-base tabular-nums">
                          {formatPKR(order.total)}
                        </span>
                        <span className={`inline-flex items-center gap-1 font-semibold text-[10px] uppercase px-2.5 py-0.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Dispensing'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{order.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* Visual Milestone Status Tracker */}
                    <div className="pt-1">
                      <OrderStatusTracker order={order} />
                    </div>

                    {/* Order Items Purchased Breakdown */}
                    <div className="pt-2 border-t border-[#E9E4D6]">
                      <span className="text-[11px] font-semibold text-[#726E60] uppercase tracking-wider block mb-2">
                        Package Contents ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-[#F5F3EC]/60 p-2 rounded-lg border border-[#E9E4D6]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded object-cover border border-[#E9E4D6] shrink-0"
                            />
                            <div className="text-xs min-w-0">
                              <span className="font-medium text-[#2B2B26] truncate block">{item.name}</span>
                              <span className="text-[#726E60] text-[11px]">
                                Qty: {item.quantity} · {formatPKR(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
