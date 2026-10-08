import React, { useState } from 'react';
import { Product } from '../types';
import { formatPKR } from '../utils/currency';
import { Heart, Star, Plus, Check, ShieldCheck, Pill, CheckCircle2, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  isOwnerMode?: boolean;
  onDeleteProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isOwnerMode = false,
  onDeleteProduct
}) => {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteProduct) {
      onDeleteProduct(product);
    }
  };

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white border border-[#E2ECE5] hover:border-[#A3D9C9] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#15803D]/5 cursor-pointer relative"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3.5] bg-[#F4F9F5] overflow-hidden flex items-center justify-center p-3">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F0FDF4] to-[#E2ECE5] text-[#52665A] p-4 text-center rounded-xl">
            <Pill className="w-8 h-8 text-[#15803D] mb-1" />
            <span className="font-serif text-sm font-semibold text-[#15803D]">
              {product.name}
            </span>
            <span className="text-[10px] text-[#52665A] mt-1">{product.dosageCount}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWish}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors z-10 ${
            isWishlisted 
              ? 'bg-white text-rose-600 shadow-xs' 
              : 'bg-white/80 text-[#52665A] hover:text-[#1E2923] hover:bg-white'
          }`}
          title="Save to wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Trust Badges */}
        <div className="absolute bottom-2 left-2 flex flex-wrap items-center gap-1 z-10">
          {product.badge === 'bestseller' && (
            <span className="text-[9px] font-semibold text-white bg-[#15803D]/95 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {product.badge === 'halal' && (
            <span className="text-[9px] font-semibold text-white bg-[#0D9488]/95 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Halal
            </span>
          )}
          {product.drapNumber && (
            <span className="text-[9px] font-semibold text-white bg-[#166534]/95 px-2 py-0.5 rounded-md tracking-wider">
              DRAP Enlisted
            </span>
          )}
          {product.isUserCreated && (
            <span className="text-[9px] font-semibold text-white bg-[#059669]/95 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Custom Upload
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#52665A] uppercase tracking-wider mb-1">
            <span className="text-[#15803D] font-bold">{product.format}</span>
            <span aria-hidden="true">·</span>
            <span>{product.dosageCount}</span>
            {product.restricted && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#B45309] font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> OTC Limit (2)
                </span>
              </>
            )}
          </div>

          <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1E2923] group-hover:text-[#15803D] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#52665A] line-clamp-2 mt-1 leading-relaxed">
            {product.desc}
          </p>

          {product.benefits && product.benefits.length > 0 && (
            <div className="mt-2 text-[11px] text-[#0D9488] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{product.benefits[0]}</span>
            </div>
          )}
        </div>

        {/* Rating and Inventory status */}
        <div className="mt-3 pt-2.5 border-t border-[#E2ECE5] flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#52665A]">
            <div className="flex items-center text-[#F59E0B]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#1E2923]">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#52665A]">({product.reviews})</span>
          </div>

          <div>
            {isOutOfStock ? (
              <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Only {product.stock} left</span>
            ) : (
              <span className="text-[11px] font-medium text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded">In Stock · Ready</span>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 flex items-center justify-between pt-1 gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#1E2923] tabular-nums">
              {formatPKR(product.price)}
            </span>
            {product.was && (
              <span className="text-xs text-[#726E60] line-through tabular-nums">
                {formatPKR(product.was)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Owner Remove Option */}
            {isOwnerMode && (
              <button
                onClick={handleDelete}
                title="Remove this product from Eco Medicines store"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">Remove</span>
              </button>
            )}

            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isOutOfStock
                  ? 'bg-[#E2ECE5] text-[#726E60] cursor-not-allowed'
                  : added
                  ? 'bg-[#059669] text-white shadow-xs'
                  : 'bg-[#15803D] hover:bg-[#166534] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
