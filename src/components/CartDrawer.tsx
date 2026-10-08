import React from 'react';
import { CartItem } from '../types';
import { formatPKR, FREE_SHIPPING_THRESHOLD_PKR, STANDARD_SHIPPING_PKR } from '../utils/currency';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = FREE_SHIPPING_THRESHOLD_PKR;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCF9] border-l border-[#E9E4D6] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E9E4D6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-semibold text-[#2B2B26]">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-[#F5F3EC] text-[#1F4A3A] font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#726E60] hover:text-[#2B2B26] hover:bg-[#F5F3EC] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#726E60]">
                <div className="w-16 h-16 rounded-full bg-[#F5F3EC] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#1F4A3A]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2B2B26] mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs max-w-xs mb-6">
                  Explore our certified medicine cabinet, botanical skincare, or artisanal makeup.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1F4A3A] text-white text-xs font-semibold rounded-full hover:bg-[#2E664F] transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-[#E9E4D6] rounded-xl relative group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#F5F3EC] border border-[#E9E4D6] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#2B2B26] line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[#726E60] hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#726E60] block">
                        {product.tag} {product.restricted && '· Regulated Limit 2'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E9E4D6] rounded-full bg-[#F5F3EC] overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#E9E4D6] transition-colors text-[#2B2B26]"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold tabular-nums text-[#2B2B26]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          disabled={product.restricted && quantity >= 2}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#E9E4D6] transition-colors text-[#2B2B26] disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#2B2B26] tabular-nums">
                        {formatPKR(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E9E4D6] space-y-4">
              <div className="space-y-1.5 text-xs text-[#726E60]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2B2B26] tabular-nums">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-[#2B2B26]">
                    {formatPKR(STANDARD_SHIPPING_PKR)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2B2B26] pt-2 border-t border-[#E9E4D6]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {formatPKR(subtotal + STANDARD_SHIPPING_PKR)}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1F4A3A] hover:bg-[#2E664F] text-white font-semibold text-sm rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#726E60]">
                Encrypted checkout · Tamper-evident pharmacy sealing
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
