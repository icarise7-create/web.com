import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart } from 'lucide-react';

interface WishlistProps {
  products: Product[];
  wishlistIds: Record<string, boolean>;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigateHome: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  products,
  wishlistIds,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onNavigateHome
}) => {
  const wishlistedProducts = products.filter(p => wishlistIds[p.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A80]">
          Personal Cabinet
        </span>
        <h1 className="font-serif text-3xl font-semibold text-[#2B2B26] mt-1">
          Your Saved Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-[#726E60] mt-1">
          Formulas, cosmetics, and wellness remedies you've bookmarked for later.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E9E4D6] rounded-2xl p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FCEEF3] text-[#C85A80] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-[#2B2B26] mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-[#726E60] mb-6 leading-relaxed">
            Click the heart icon on any product in the store to save it here for quick reordering.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-6 py-2.5 bg-[#1F4A3A] hover:bg-[#2E664F] text-white text-xs font-semibold rounded-full shadow-xs transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
