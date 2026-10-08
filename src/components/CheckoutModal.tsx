import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { formatPKR, FREE_SHIPPING_THRESHOLD_PKR, STANDARD_SHIPPING_PKR } from '../utils/currency';
import { X, CheckCircle2, ShieldCheck, Truck, Lock, Phone, Banknote, CreditCard, Smartphone } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

const PAKISTANI_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Quetta',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Other City (All Pakistan)'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [name, setName] = useState('Zainab Fatima');
  const [email, setEmail] = useState('zainab.fatima@example.com');
  const [phone, setPhone] = useState('0302-8491024');
  const [address, setAddress] = useState('House 45, Street 12, F-7/2');
  const [city, setCity] = useState('Islamabad');
  const [zip, setZip] = useState('44000');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'JazzCash/EasyPaisa' | 'Card'>('COD');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = STANDARD_SHIPPING_PKR;
  const tax = Math.round(subtotal * 0.05); // 5% provincial sales tax
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || !phone) return;

    const orderId = `PKR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      city,
      zip,
      paymentMethod,
      items: items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image
      })),
      subtotal,
      shipping,
      tax,
      total,
      status: 'Processing',
      courier: 'TCS Express Pakistan',
      trackingCode: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setPlacedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFCF9] border border-[#E9E4D6] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#726E60] hover:text-[#2B2B26] rounded-full hover:bg-[#F5F3EC]"
        >
          <X className="w-5 h-5" />
        </button>

        {placedOrder ? (
          /* Confirmation State */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#1F4A3A] flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold text-[#4E9C8E] uppercase tracking-wider">
                Order Received · In Safe Hands
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2B2B26] mt-1">
                Shukriya for your order!
              </h2>
              <p className="text-sm font-mono text-[#1F4A3A] font-semibold mt-1">
                Tracking Number: {placedOrder.id}
              </p>
            </div>

            <p className="text-xs text-[#726E60] max-w-md mx-auto leading-relaxed">
              We have booked your parcel. You selected <strong>{placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : placedOrder.paymentMethod}</strong>. Your vitamins and remedies are being inspected under cGMP standards.
            </p>

            <div className="p-4 bg-[#F5F3EC] rounded-xl text-left border border-[#E9E4D6] text-xs space-y-2">
              <div className="flex justify-between font-semibold text-[#2B2B26]">
                <span>Shipping Destination:</span>
                <span>{placedOrder.shippingAddress}, {placedOrder.city}</span>
              </div>
              <div className="flex justify-between text-[#726E60]">
                <span>Delivery Method:</span>
                <span>Standard Express Dispatch (2–3 business days)</span>
              </div>
              <div className="flex justify-between text-[#726E60]">
                <span>Contact Phone:</span>
                <span>{placedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1F4A3A] pt-2 border-t border-[#E9E4D6] text-sm tabular-nums">
                <span>Total Due on Delivery:</span>
                <span>{formatPKR(placedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Assalam-o-Alaikum! I have placed an order on Eco Medicines & Vitamin:\n\nOrder ID: #${placedOrder.id}\nItems: ${placedOrder.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}\nTotal: ${formatPKR(placedOrder.total)}\nPayment: ${placedOrder.paymentMethod}\nDeliver to: ${placedOrder.shippingAddress}, ${placedOrder.city}\nPhone: ${placedOrder.customerPhone}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-full shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Order via WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs rounded-full shadow-md transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F4A3A] uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Express Checkout (Pakistan)</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-[#2B2B26]">
                Delivery &amp; Payment Details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Payment Method Selector */}
              <div>
                <label className="font-semibold text-[#2B2B26] block mb-2">
                  Select Payment Method *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-[#1F4A3A] bg-[#EAF6F1] ring-2 ring-[#1F4A3A]/20'
                        : 'border-[#E9E4D6] bg-white hover:bg-[#F5F3EC]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#1F4A3A] mb-1.5" />
                    <span className="font-bold text-xs text-[#2B2B26] block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#726E60]">Pay at your doorstep</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('JazzCash/EasyPaisa')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'JazzCash/EasyPaisa'
                        ? 'border-[#1F4A3A] bg-[#EAF6F1] ring-2 ring-[#1F4A3A]/20'
                        : 'border-[#E9E4D6] bg-white hover:bg-[#F5F3EC]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#E0759A] mb-1.5" />
                    <span className="font-bold text-xs text-[#2B2B26] block">JazzCash / EasyPaisa</span>
                    <span className="text-[10px] text-[#726E60]">Mobile account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'Card'
                        ? 'border-[#1F4A3A] bg-[#EAF6F1] ring-2 ring-[#1F4A3A]/20'
                        : 'border-[#E9E4D6] bg-white hover:bg-[#F5F3EC]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#4E9C8E] mb-1.5" />
                    <span className="font-bold text-xs text-[#2B2B26] block">Debit / Credit Card</span>
                    <span className="text-[10px] text-[#726E60]">Visa / MasterCard / PayPak</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Contact Mobile Number (for Delivery SMS/Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2B2B26] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2B2B26] block mb-1">Complete Street / House Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House / Flat #, Street, Phase / Block, Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  >
                    {PAKISTANI_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 bg-[#F5F3EC] rounded-xl border border-[#E9E4D6] space-y-2 mt-4">
                <div className="flex justify-between text-[#726E60]">
                  <span>Items Subtotal ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="font-semibold text-[#2B2B26] tabular-nums">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#726E60]">
                  <span>Delivery ({city})</span>
                  <span className="font-semibold text-[#2B2B26] tabular-nums">
                    {formatPKR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-[#726E60]">
                  <span>Sales Tax &amp; Handling</span>
                  <span className="font-semibold text-[#2B2B26] tabular-nums">{formatPKR(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2B2B26] pt-2 border-t border-[#E9E4D6]">
                  <span>Total Amount Due</span>
                  <span className="tabular-nums">{formatPKR(total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#726E60]">
                <Truck className="w-4 h-4 text-[#1F4A3A]" />
                <span>Dispatched securely with tamper-evident security tape.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1F4A3A] hover:bg-[#2E664F] text-white font-semibold text-sm rounded-full shadow-md transition-all cursor-pointer"
                >
                  Place Order {paymentMethod === 'COD' ? '(Cash on Delivery)' : ''} · {formatPKR(total)}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
