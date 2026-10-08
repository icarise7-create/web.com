import React, { useState } from 'react';
import { Product } from '../types';
import { formatPKR } from '../utils/currency';
import { 
  Star, 
  ShieldAlert, 
  Heart, 
  ShoppingBag, 
  Check, 
  ChevronRight, 
  Package, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Truck,
  Trash2
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  isOwnerMode?: boolean;
  onDeleteProduct?: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isOwnerMode = false,
  onDeleteProduct
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'facts' | 'safety' | 'reviews'>('benefits');
  const [added, setAdded] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);

  const maxAllowed = product.restricted ? 2 : Math.min(product.stock, 99);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxAllowed) return maxAllowed;
      return next;
    });
  };

  const handleAdd = () => {
    if (product.restricted && !ageConfirmed) {
      setShowAgeGate(true);
      return;
    }
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleConfirmAgeAndAdd = () => {
    setAgeConfirmed(true);
    setShowAgeGate(false);
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // 2 bundle partners
  const bundlePartners = allProducts
    .filter(p => p.id !== product.id && (p.cat === product.cat || p.cat === 'vitamins'))
    .slice(0, 2);

  const bundleTotal = product.price + bundlePartners.reduce((s, p) => s + p.price, 0);

  const handleAddBundle = () => {
    onAddToCart(product, 1);
    bundlePartners.forEach(p => onAddToCart(p, 1));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Related products
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.healthGoal === product.healthGoal || p.cat === product.cat))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#726E60] mb-8">
        <button onClick={onBack} className="hover:text-[#1F4A3A] transition-colors cursor-pointer">
          Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#E9E4D6]" />
        <span className="capitalize">{product.cat}</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#E9E4D6]" />
        <span className="text-[#2B2B26] font-medium truncate max-w-[240px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Contiguous Purchase Module PDP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-[#E9E4D6]">
        {/* Left Column: Product Visuals & Certifications */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="aspect-square bg-[#F5F3EC] border border-[#E9E4D6] rounded-2xl overflow-hidden flex items-center justify-center p-6 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
            
            {/* Certification Stickers */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.drapNumber && (
                <span className="bg-[#1F4A3A] text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#8FD0C4]" />
                  <span>{product.drapNumber}</span>
                </span>
              )}
              <span className="bg-[#4E9C8E] text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm shadow-xs">
                100% Halal Verified
              </span>
            </div>

            {product.isUserCreated && (
              <span className="absolute top-4 right-4 bg-[#E0759A] text-white text-xs font-semibold px-3 py-1 rounded-sm">
                Merchant Uploaded
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="border border-[#E9E4D6] rounded-xl overflow-hidden p-2.5 bg-white flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-5 h-5 text-[#1F4A3A] mb-1" />
              <span className="text-[11px] font-semibold text-[#2B2B26]">cGMP Compliant</span>
              <span className="text-[9px] text-[#726E60]">ISO 9001:2015</span>
            </div>
            <div className="border border-[#E9E4D6] rounded-xl overflow-hidden p-2.5 bg-white flex flex-col items-center justify-center text-center">
              <Package className="w-5 h-5 text-[#1F4A3A] mb-1" />
              <span className="text-[11px] font-semibold text-[#2B2B26]">{product.dosageCount}</span>
              <span className="text-[9px] text-[#726E60]">{product.format}</span>
            </div>
            <div className="border border-[#E9E4D6] rounded-xl overflow-hidden p-2.5 bg-white flex flex-col items-center justify-center text-center">
              <Truck className="w-5 h-5 text-[#E0759A] mb-1" />
              <span className="text-[11px] font-semibold text-[#2B2B26]">Cash on Delivery</span>
              <span className="text-[9px] text-[#726E60]">All Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Information */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#726E60] mb-2">
              <span className="text-[#1F4A3A]">{product.format}</span>
              <span aria-hidden="true">·</span>
              <span>{product.dosageCount}</span>
              <span aria-hidden="true">·</span>
              <span>{product.sellerName || 'NutriFactor Laboratories'}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2B2B26] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center text-[#E8A73B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#2B2B26]">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-[#726E60]">({product.reviews} verified purchaser reviews)</span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#2B2B26] tabular-nums">
                {formatPKR(product.price)}
              </span>
              {product.was && (
                <span className="text-lg text-[#726E60] line-through tabular-nums">
                  {formatPKR(product.was)}
                </span>
              )}
              {product.was && (
                <span className="text-xs font-semibold text-[#C85A80] bg-[#FCEEF3] px-2 py-0.5 rounded">
                  Save {formatPKR(product.was - product.price)}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#726E60] leading-relaxed mb-6">
              {product.desc}
            </p>

            {/* Key Benefits Bullet List */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="p-4 bg-[#F5F3EC] rounded-xl border border-[#E9E4D6] mb-6 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4A3A] block mb-1">
                  Key Health Benefits:
                </span>
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#2B2B26]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1F4A3A] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stock Availability */}
            <div className="p-3 bg-white rounded-lg mb-6 border border-[#E9E4D6] text-xs">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[#2B2B26]">Warehouse Availability:</span>
                {product.stock > 10 ? (
                  <span className="text-[#4E9C8E] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#4E9C8E]" />
                    In Stock · Ships within 24 hours ({product.stock} units)
                  </span>
                ) : product.stock > 0 ? (
                  <span className="text-amber-700 font-semibold">Low Stock — Only {product.stock} remaining</span>
                ) : (
                  <span className="text-rose-600 font-semibold">Currently Out of Stock</span>
                )}
              </div>
            </div>

            {/* Regulated OTC Notice */}
            {product.restricted && (
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl mb-6 text-xs text-amber-900 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-amber-950 mb-1">
                      Regulated OTC Medicine Monograph
                    </strong>
                    Contains active decongestant compounds regulated under DRAP and international OTC guidelines. Limited to a maximum of 2 units per order. Must be 18 years or older.
                  </div>
                </div>
              </div>
            )}

            {/* Store Owner Remove Action (Only visible in Owner Mode) */}
            {isOwnerMode && (
              <div className="p-4 bg-rose-50/90 border border-rose-200 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                    👑 Store Owner Control: Remove from Catalog
                  </span>
                  <p className="text-xs text-rose-700 mt-0.5">
                    If you don't want to sell this product, remove it directly from the live storefront.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to remove "${product.name}" from Eco Medicines & Vitamin store?`)) {
                      if (onDeleteProduct) onDeleteProduct(product);
                      onBack();
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Product from Store</span>
                </button>
              </div>
            )}

            {/* Quantity Selector & Buy Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E9E4D6] rounded-full bg-white overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || product.stock <= 0}
                    className="w-10 h-10 flex items-center justify-center text-[#2B2B26] hover:bg-[#F5F3EC] transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums text-[#2B2B26]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= maxAllowed || product.stock <= 0}
                    className="w-10 h-10 flex items-center justify-center text-[#2B2B26] hover:bg-[#F5F3EC] transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                    product.stock <= 0
                      ? 'bg-[#E9E4D6] text-[#726E60] cursor-not-allowed'
                      : added
                      ? 'bg-[#E0759A] text-white shadow-sm'
                      : 'bg-[#1F4A3A] hover:bg-[#2E664F] text-white shadow-sm'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · {formatPKR(product.price * quantity)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-full border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#C85A80] text-[#C85A80] bg-[#FCEEF3]'
                      : 'border-[#E9E4D6] text-[#726E60] hover:text-[#2B2B26] bg-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          {bundlePartners.length > 0 && (
            <div className="mt-8 p-5 bg-[#F5F3EC] border border-[#E9E4D6] rounded-xl">
              <h4 className="font-serif text-sm font-semibold text-[#2B2B26] mb-3">
                Frequently Bought Together
              </h4>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#2B2B26] truncate max-w-[260px]">
                    1. {product.name} (Current item)
                  </span>
                  <span className="font-semibold tabular-nums">{formatPKR(product.price)}</span>
                </div>
                {bundlePartners.map((bp, idx) => (
                  <div key={bp.id} className="flex items-center justify-between text-xs text-[#726E60]">
                    <span className="truncate max-w-[260px]">
                      {idx + 2}. {bp.name}
                    </span>
                    <span className="font-semibold tabular-nums text-[#2B2B26]">{formatPKR(bp.price)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#E9E4D6]">
                <div>
                  <span className="text-xs text-[#726E60] block">Synergy Bundle Total:</span>
                  <span className="text-base font-bold text-[#1F4A3A] tabular-nums">
                    {formatPKR(bundleTotal)}
                  </span>
                </div>
                <button
                  onClick={handleAddBundle}
                  className="bg-white hover:bg-[#E9E4D6] border border-[#E9E4D6] text-[#1F4A3A] px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  Add All {bundlePartners.length + 1} to Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Benefits, Supplement Facts, Safety, Reviews */}
      <div className="mt-10">
        <div className="flex border-b border-[#E9E4D6] gap-6 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'benefits'
                ? 'text-[#1F4A3A] border-b-2 border-[#1F4A3A]'
                : 'text-[#726E60] hover:text-[#2B2B26]'
            }`}
          >
            Health Benefits &amp; Directions
          </button>
          
          <button
            onClick={() => setActiveTab('facts')}
            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'facts'
                ? 'text-[#1F4A3A] border-b-2 border-[#1F4A3A]'
                : 'text-[#726E60] hover:text-[#2B2B26]'
            }`}
          >
            Supplement &amp; Drug Facts
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'safety'
                ? 'text-[#1F4A3A] border-b-2 border-[#1F4A3A]'
                : 'text-[#726E60] hover:text-[#2B2B26]'
            }`}
          >
            Ingredients &amp; Warnings
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'reviews'
                ? 'text-[#1F4A3A] border-b-2 border-[#1F4A3A]'
                : 'text-[#726E60] hover:text-[#2B2B26]'
            }`}
          >
            Verified Reviews ({product.reviews})
          </button>
        </div>

        <div className="py-6 text-sm text-[#726E60] leading-relaxed">
          {activeTab === 'benefits' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#2B2B26] mb-2">
                  Nutraceutical Profile
                </h4>
                <p>{product.desc}</p>
              </div>

              {product.directions && (
                <div className="p-4 bg-[#F5F3EC] rounded-xl border border-[#E9E4D6]">
                  <h5 className="font-semibold text-xs text-[#1F4A3A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Dosage &amp; How To Use</span>
                  </h5>
                  <p className="text-xs text-[#2B2B26] leading-relaxed">
                    {product.directions}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'facts' && (
            <div className="max-w-2xl">
              <div className="border-2 border-[#1F4A3A] bg-white rounded-xl overflow-hidden p-5 shadow-xs">
                <div className="border-b-4 border-black pb-2 mb-3">
                  <h3 className="font-serif text-2xl font-bold text-black tracking-tight">
                    Supplement / Drug Facts
                  </h3>
                  <div className="text-xs text-[#726E60] flex justify-between mt-1">
                    <span>Serving Size: 1 {product.format.slice(0, -1) || 'Dose'}</span>
                    <span>Servings Per Container: {product.dosageCount}</span>
                  </div>
                </div>

                {product.supplementFacts && product.supplementFacts.length > 0 ? (
                  <table className="w-full text-xs text-left mb-4">
                    <thead>
                      <tr className="border-b-2 border-black font-bold text-black">
                        <th className="py-1">Active Ingredient</th>
                        <th className="py-1 text-center">Amount per Serving</th>
                        <th className="py-1 text-right">% Daily Value*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {product.supplementFacts.map((fact, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 font-medium text-[#2B2B26]">{fact.nutrient}</td>
                          <td className="py-1.5 text-center text-[#726E60]">{fact.amount}</td>
                          <td className="py-1.5 text-right font-semibold text-[#2B2B26]">{fact.dailyValue || '*'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-xs text-[#726E60] py-4">
                    Formulation contains active pharmaceutical / cosmetic constituents detailed on the packaging.
                  </p>
                )}

                <div className="border-t-2 border-black pt-2 text-[10px] text-[#726E60]">
                  * Percent Daily Values are based on a 2,000 calorie diet.<br />
                  {product.drapNumber && <span className="font-semibold text-[#1F4A3A]">{product.drapNumber}</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-5 bg-[#F5F3EC] rounded-xl border border-[#E9E4D6]">
                <h5 className="font-semibold text-xs text-[#1F4A3A] uppercase tracking-wider mb-2">
                  Full Formulation &amp; Excipients
                </h5>
                <p className="text-xs sm:text-sm text-[#2B2B26] leading-relaxed font-mono">
                  {product.ingredients}
                </p>
              </div>

              <div className="p-5 bg-amber-50/80 rounded-xl border border-amber-200">
                <h5 className="font-semibold text-xs text-amber-950 uppercase tracking-wider mb-2">
                  Safety, Precautions &amp; Storage Conditions
                </h5>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  {product.warnings}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-4 p-4 bg-[#F5F3EC] rounded-xl mb-6">
                <span className="font-serif text-3xl font-bold text-[#1F4A3A]">
                  {product.rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex text-[#E8A73B] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#726E60]">
                    Verified patient &amp; customer reviews from across Pakistan
                  </span>
                </div>
              </div>

              {[
                { name: 'Dr. Usman Farooq (Karachi)', text: 'Prescribed this to my patients for post-viral fatigue. Noticeable improvement in energy markers within 10 days.', rating: 5, date: 'September 2026' },
                { name: 'Saima Khan (Lahore)', text: 'Best biotin supplement in Pakistan. Hair fall reduced by almost 70% in 2 months. 100% original sealed.', rating: 5, date: 'August 2026' },
                { name: 'Bilal Ahmed (Islamabad)', text: 'Fast and prompt delivery. Authentic packaging and easy to verify lot number.', rating: 5, date: 'August 2026' }
              ].map((rev, i) => (
                <div key={i} className="p-4 border-b border-[#E9E4D6] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2B2B26]">{rev.name}</span>
                    <span className="text-[#726E60]">{rev.date}</span>
                  </div>
                  <div className="flex text-[#E8A73B]">
                    {[...Array(rev.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#726E60]">{rev.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-14 pt-10 border-t border-[#E9E4D6]">
          <h3 className="font-serif text-xl font-semibold text-[#2B2B26] mb-6">
            Recommended Synergy Formulations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="bg-white border border-[#E9E4D6] rounded-xl p-3 cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-square bg-[#F5F3EC] rounded-lg overflow-hidden mb-2">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] uppercase font-semibold text-[#726E60]">{p.dosageCount}</span>
                <h4 className="font-serif text-xs font-semibold text-[#2B2B26] line-clamp-1">{p.name}</h4>
                <span className="text-xs font-bold text-[#1F4A3A] mt-1 tabular-nums">{formatPKR(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regulated OTC Age Confirmation Dialog */}
      {showAgeGate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF9] border border-[#E9E4D6] rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-800 mb-3">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-serif text-lg font-semibold">Age &amp; Quantity Confirmation</h3>
            </div>
            <p className="text-xs text-[#726E60] leading-relaxed mb-4">
              <strong>{product.name}</strong> contains regulated active compounds limited to a maximum of 2 units per order. To proceed, please confirm you are at least 18 years old.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowAgeGate(false)}
                className="px-4 py-2 text-xs font-medium text-[#726E60] hover:text-[#2B2B26]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAgeAndAdd}
                className="px-5 py-2 bg-[#1F4A3A] hover:bg-[#2E664F] text-white text-xs font-semibold rounded-full shadow-xs"
              >
                I Confirm I Am 18+ · Add to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
