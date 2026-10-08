/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerProfile, CategoryId, HealthGoal } from './types';
import { INITIAL_PRODUCTS, CURATED_DEMO_PRODUCTS } from './data/initialProducts';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { SellerStudio } from './components/SellerStudio';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Wishlist } from './components/Wishlist';
import { AccountView } from './components/AccountView';
import { PoliciesView } from './components/PoliciesView';

import { HealthAssessmentQuiz } from './components/HealthAssessmentQuiz';
import { PrescriptionUpload } from './components/PrescriptionUpload';
import { InteractionChecker } from './components/InteractionChecker';
import { DosageRoutinePlanner } from './components/DosageRoutinePlanner';
import { QualityLabLookup } from './components/QualityLabLookup';
import { PharmacistConsultDesk } from './components/PharmacistConsultDesk';
import { ShareQrModal } from './components/ShareQrModal';

import heroApothecaryLabImg from './assets/images/hero_apothecary_lab_1790695118612.jpg';
import pharmacistConsultImg from './assets/images/pharmacist_doctor_consult_1790695137119.jpg';
import qualityLabCertImg from './assets/images/quality_lab_certificate_1790695155337.jpg';
import multivitaminBottleImg from './assets/images/nutrifactor_multivitamin_bottle_1790522257895.jpg';
import omegaSoftgelsImg from './assets/images/nutrifactor_omega_softgels_1790522275147.jpg';

import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Store, 
  Package, 
  Heart,
  Pill,
  Activity,
  HeartPulse,
  Brain,
  Bone,
  Flame,
  Truck,
  Trash2,
  Lock,
  LogOut,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  MessageSquare,
  Microscope,
  Calendar,
  Layers,
  Search,
  RotateCcw
} from 'lucide-react';

const STORAGE_KEYS = {
  PRODUCTS: 'eco_products_v9',
  CART: 'eco_cart_v9',
  WISHLIST: 'eco_wishlist_v9',
  ORDERS: 'eco_orders_v9',
  PROFILE: 'eco_profile_v9',
  OWNER_MODE: 'eco_owner_mode_v9'
};

const HEALTH_GOALS_LIST: { id: HealthGoal; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { id: 'all', label: 'All Formulations', icon: Pill, desc: 'Complete catalog of vitamins & wellness' },
  { id: 'energy-immunity', label: 'Energy & Immunity', icon: Flame, desc: 'Vitamax multivitamins, C 1000mg, Zinc' },
  { id: 'hair-skin-nails', label: 'Hair, Skin & Nails', icon: Sparkles, desc: 'Biotin 2500mcg, Gluta Glow, Collagen' },
  { id: 'bones-joints', label: 'Bones & Joints', icon: Bone, desc: 'Calcium, D3, Glucosamine, Magnesium' },
  { id: 'heart-vitality', label: 'Heart & Vitality', icon: HeartPulse, desc: 'Omega-3 Fish Oil, CoQ10, Garlic' },
  { id: 'brain-sleep', label: 'Brain & Sleep', icon: Brain, desc: 'Melatonin, Ginkgo Biloba, 5-HTP' },
  { id: 'otc-medicine', label: 'OTC Medicine', icon: ShieldCheck, desc: 'Panadol Extra, Cold & Sinus, First Aid' }
];

export default function App() {
  // State Initialization from LocalStorage (Starts completely empty as requested by user)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'PKR-814920',
          date: '24 Sep 2026',
          customerName: 'Ayesha Malik',
          customerEmail: 'ayesha.malik@example.com',
          customerPhone: '0300-4591024',
          shippingAddress: 'House 78, Street 5, DHA Phase 5',
          city: 'Lahore',
          zip: '54000',
          paymentMethod: 'COD',
          items: [
            {
              productId: 'prod-curated-01',
              name: 'Vitamax Pure Daily Botanical Multivitamin & Zinc',
              price: 1950,
              quantity: 1,
              image: heroApothecaryLabImg
            }
          ],
          subtotal: 1950,
          shipping: 250,
          tax: 97,
          total: 2297,
          status: 'Shipped',
          courier: 'TCS Express Pakistan',
          trackingCode: 'TCS-89214710'
        }
      ];
    } catch {
      return [];
    }
  });

  const [profile, setProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : { name: 'Zainab Fatima', email: 'zainab.fatima@example.com', phone: '0302-8491024' };
    } catch {
      return { name: 'Zainab Fatima', email: 'zainab.fatima@example.com', phone: '0302-8491024' };
    }
  });

  // Owner Mode State
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.OWNER_MODE) === 'true';
    } catch {
      return false;
    }
  });

  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [ownerPinInput, setOwnerPinInput] = useState('');
  const [ownerPinError, setOwnerPinError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Navigation & UI state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filters for Catalog
  const [healthGoalFilter, setHealthGoalFilter] = useState<HealthGoal>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // LocalStorage Sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OWNER_MODE, String(isOwnerMode));
    } catch (e) {
      console.error(e);
    }
  }, [isOwnerMode]);

  // Support direct hash navigation (e.g. #prescription, #assessment from QR codes)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const h = window.location.hash.replace('#', '');
        const validViews = ['home', 'assessment', 'prescription', 'interactions', 'routine', 'catalog', 'wishlist', 'account', 'policies'];
        if (validViews.includes(h)) {
          setCurrentView(h);
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const isW = !!prev[product.id];
      const next = { ...prev, [product.id]: !isW };
      showToast(!isW ? `Saved ${product.name} to wishlist` : `Removed from wishlist`);
      return next;
    });
  };

  // Seeding and Catalog Control
  const handleSeedDemoProducts = () => {
    setProducts(CURATED_DEMO_PRODUCTS);
    showToast('Loaded 4 pure DRAP-enlisted formulations into dispensary catalog!');
  };

  const handleClearAllProducts = () => {
    if (confirm('Are you sure you want to remove all formulations from the dispensary catalog?')) {
      setProducts([]);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
      showToast('All formulations removed from storefront.');
    }
  };

  // Add Product from Seller Studio
  const handleAddProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProd: Product = {
      ...newProdData,
      id: `prod-custom-${Date.now()}`,
      rating: 5.0,
      reviews: 1,
      isUserCreated: true,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Formulation "${newProd.name}" added to dispensary catalog!`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Formulation "${updated.name}" updated successfully!`);
  };

  const handleDeleteProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
    showToast(`Removed "${prod ? prod.name : 'Product'}" from catalog.`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} updated to ${status}.`);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerPinInput === '7860' || ownerPinInput === '1234') {
      setIsOwnerMode(true);
      setIsOwnerModalOpen(false);
      setOwnerPinInput('');
      setOwnerPinError(false);
      showToast('Store Owner Mode activated!');
    } else {
      setOwnerPinError(true);
    }
  };

  // Filter helper for products
  const filteredProducts = products.filter(p => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.ingredients.toLowerCase().includes(q) ||
        (p.drapNumber && p.drapNumber.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (healthGoalFilter !== 'all' && p.healthGoal !== healthGoalFilter) {
      return false;
    }

    if (categoryFilter !== 'all' && p.cat !== categoryFilter) {
      return false;
    }

    return true;
  });

  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const cartTotalCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const wishlistTotalCount = Object.values(wishlistIds).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFA] text-[#1E2923]">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#15803D] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        wishlistCount={wishlistTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isOwnerMode={isOwnerMode}
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
        onToggleOwnerMode={() => {
          setIsOwnerMode(!isOwnerMode);
          showToast(!isOwnerMode ? 'Store Owner Mode activated.' : 'Switched to customer view.');
        }}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Owner Management Notification Bar */}
      {isOwnerMode && (
        <div className="bg-[#15803D] text-white py-2.5 px-4 sm:px-8 text-xs shadow-md border-b border-[#166534] sticky top-[62px] z-30 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#86EFAC]" />
                Store Owner Portal Active
              </span>
              <span className="hidden sm:inline text-white/90 text-xs">
                Upload new formulations, update pricing, or manage dispensary catalog.
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setCurrentView('seller');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-[#15803D] hover:bg-[#F0FDF4] px-3.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller Studio</span>
              </button>

              <button
                onClick={handleClearAllProducts}
                className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors"
                title="Remove all products from store"
              >
                Clear All Products
              </button>

              <button
                onClick={() => {
                  setIsOwnerMode(false);
                  showToast('Switched to customer storefront view.');
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden md:inline">Exit to Customer View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Router */}
      <main className="flex-1">

        {/* ================= VIEW: HOME OVERVIEW ================= */}
        {currentView === 'home' && (
          <div className="space-y-16 pb-16">
            
            {/* Storefront Hero with Natural Botanical Aesthetic */}
            <section className="relative bg-gradient-to-br from-[#EAF6EE] via-[#F4FAF6] to-[#E2ECE5] border-b border-[#D2E7DA] overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#C2DEC9]">
                    <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                    <span>Pure Botanical Certified Dispensary</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#164E33] leading-[1.08] text-balance">
                    Pure Botanical Healthcare &amp; Clinical Tele-Pharmacy
                  </h1>

                  <p className="text-sm sm:text-base text-[#477A5C] max-w-xl leading-relaxed">
                    Pakistan's dedicated home for pure nutraceuticals, doctor-backed wellness regimens, verified prescription review, and drug-nutrient safety checking.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentView('assessment');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#86EFAC]" />
                      <span>Take Health Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('prescription');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-white text-[#15803D] border border-[#C2DEC9] hover:bg-[#F0FDF4] text-xs sm:text-sm font-semibold rounded-full shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#15803D]" />
                      <span>Upload Prescription</span>
                    </button>
                  </div>

                  {/* Trust markers */}
                  <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#52665A] border-t border-[#D2E7DA]/70">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                      100% Halal Verified Formulations
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                      Pure Laboratory Assays
                    </span>
                  </div>
                </div>

                {/* Hero Visual */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#C2DEC9] relative bg-white">
                    <img
                      src={heroApothecaryLabImg}
                      alt="Eco Medicines Clinical Laboratory Counter"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14532D]/85 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white text-xs">
                        <span className="font-bold text-sm block">Botanical Formulation Facility</span>
                        <span className="text-[#86EFAC] text-[11px]">Strict batch release protocols &amp; pure organic extracts</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Core Patient Services Showcase (4 Pillars) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
                  Certified Clinical Services
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#164E33]">
                  Everything Your Daily Wellness Journey Needs
                </h2>
                <p className="text-xs sm:text-sm text-[#477A5C] max-w-xl mx-auto">
                  Doctor-developed interactive tools designed to eliminate guesswork from your vitamins, prescriptions, and daily dosages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                
                {/* 1. Health Assessment */}
                <div 
                  onClick={() => {
                    setCurrentView('assessment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E2ECE5] hover:border-[#15803D] p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1E2923] group-hover:text-[#15803D] transition-colors">
                      Personalized Quiz
                    </h3>
                    <p className="text-xs text-[#52665A] leading-relaxed">
                      Answer 4 clinical questions to receive an evidence-based daily micronutrient schedule.
                    </p>
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                    <span>Start Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. Prescription Upload */}
                <div 
                  onClick={() => {
                    setCurrentView('prescription');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E2ECE5] hover:border-[#15803D] p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1E2923] group-hover:text-[#15803D] transition-colors">
                      Prescription Upload
                    </h3>
                    <p className="text-xs text-[#52665A] leading-relaxed">
                      Upload your physician's slip for swift review, dosage verification, and dispensary packing.
                    </p>
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                    <span>Upload Slip</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. Drug Interaction Checker */}
                <div 
                  onClick={() => {
                    setCurrentView('interactions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E2ECE5] hover:border-[#15803D] p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1E2923] group-hover:text-[#15803D] transition-colors">
                      Interaction Checker
                    </h3>
                    <p className="text-xs text-[#52665A] leading-relaxed">
                      Check if your blood thinners, thyroid meds, or antibiotics clash with vitamins.
                    </p>
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                    <span>Check Safety</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 4. Quality Lab Certificate Lookup */}
                <div 
                  onClick={() => {
                    setCurrentView('lab-lookup');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E2ECE5] hover:border-[#15803D] p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-base font-bold text-[#1E2923] group-hover:text-[#15803D] transition-colors">
                        Lab Certificate
                      </h3>
                      <span className="text-[9px] bg-[#DCFCE7] text-[#15803D] font-bold px-1.5 py-0.2 rounded-full">NEW</span>
                    </div>
                    <p className="text-xs text-[#52665A] leading-relaxed">
                      Verify batch COA, HPLC potency assays, heavy metals, and SANHA Halal tests.
                    </p>
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                    <span>Verify Batch</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 5. Pharmacist Consultation Desk */}
                <div 
                  onClick={() => {
                    setCurrentView('pharmacist');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E2ECE5] hover:border-[#15803D] p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-base font-bold text-[#1E2923] group-hover:text-[#15803D] transition-colors">
                        Ask Pharmacist
                      </h3>
                      <span className="text-[9px] bg-[#DCFCE7] text-[#15803D] font-bold px-1.5 py-0.2 rounded-full">LIVE</span>
                    </div>
                    <p className="text-xs text-[#52665A] leading-relaxed">
                      Clinical dosage advice, timings, dietary co-factors, and safety Q&amp;A.
                    </p>
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                    <span>Ask Question</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </section>

            {/* Feature Banner: Daily Routine & Habit Tracker */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="bg-[#F0FDF4] border border-[#C2DEC9] p-6 sm:p-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Wellness Timetable
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#164E33]">
                    Daily Dosage &amp; Habit Tracker
                  </h3>
                  <p className="text-xs sm:text-sm text-[#477A5C] leading-relaxed">
                    Never forget your morning multivitamin or evening supplement. Organize your daily schedule, log hydration, and build a lasting health streak.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentView('routine');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="self-start md:self-auto px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Open My Dosage Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Dispensary & Formulations Catalog Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E2ECE5]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
                    Dispensary Catalog
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#164E33]">
                    Active Pharmacy &amp; Vitamin Inventory
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {products.length === 0 ? (
                    <button
                      onClick={handleSeedDemoProducts}
                      className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#86EFAC]" />
                      <span>Seed Curated Batch (Demo)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleClearAllProducts}
                      className="px-3.5 py-1.5 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All Products</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Empty Catalog Notice as requested */}
              {products.length === 0 ? (
                <div className="mt-8 bg-white border border-[#E2ECE5] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-[#EAF6EE] text-[#15803D] flex items-center justify-center mx-auto">
                    <Pill className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-[#164E33]">
                      Fresh 2026 Batch Synthesis In Progress
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52665A] leading-relaxed">
                      All previous formulations have been cleared from this storefront to ensure 100% freshly pressed, maximum potency batches for our incoming release.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email for new batch arrival updates..."
                      className="flex-1 px-4 py-2.5 text-xs bg-[#F9FBFA] border border-[#D2E7DA] rounded-full text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                    />
                    <button
                      onClick={() => showToast('Subscribed! We will notify you when the fresh batch arrives.')}
                      className="px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-full transition-colors cursor-pointer shrink-0"
                    >
                      Notify Me
                    </button>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleSeedDemoProducts}
                      className="px-5 py-2.5 bg-[#EAF6EE] hover:bg-[#DCFCE7] text-[#14532D] border border-[#C2DEC9] text-xs font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#15803D]" />
                      <span>Preview 4 Sample Formulations (Demo)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 space-y-6">
                  {/* Category Pills & Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F9F5] border border-[#D2E7DA] rounded-xl text-xs">
                      {['all', 'energy-immunity', 'hair-skin-nails', 'bones-joints', 'heart-vitality'].map((goalId) => (
                        <button
                          key={goalId}
                          onClick={() => setHealthGoalFilter(goalId as any)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                            healthGoalFilter === goalId
                              ? 'bg-white text-[#15803D] shadow-xs'
                              : 'text-[#52665A] hover:text-[#1E2923]'
                          }`}
                        >
                          {goalId === 'all' && 'All Goals'}
                          {goalId === 'energy-immunity' && 'Energy & Immunity'}
                          {goalId === 'hair-skin-nails' && 'Hair & Skin'}
                          {goalId === 'bones-joints' && 'Bone & Joints'}
                          {goalId === 'heart-vitality' && 'Heart & Vitality'}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#52665A]">Sort:</span>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="px-3 py-1.5 bg-white border border-[#D2E7DA] rounded-lg text-xs text-[#1E2923] focus:outline-none"
                      >
                        <option value="featured">Featured First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onSelect={handleSelectProduct}
                        onAddToCart={handleAddToCart}
                        isWishlisted={!!wishlistIds[prod.id]}
                        onToggleWishlist={handleToggleWishlist}
                        isOwnerMode={isOwnerMode}
                        onDeleteProduct={(p) => handleDeleteProduct(p.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

          </div>
        )}

        {/* ================= VIEW: HEALTH ASSESSMENT QUIZ ================= */}
        {currentView === 'assessment' && (
          <HealthAssessmentQuiz onNavigateToProducts={() => setCurrentView('catalog')} />
        )}

        {/* ================= VIEW: PRESCRIPTION UPLOAD ================= */}
        {currentView === 'prescription' && (
          <PrescriptionUpload onSuccessToast={showToast} />
        )}

        {/* ================= VIEW: DRUG INTERACTION CHECKER ================= */}
        {currentView === 'interactions' && (
          <InteractionChecker />
        )}

        {/* ================= VIEW: DOSAGE ROUTINE PLANNER ================= */}
        {currentView === 'routine' && (
          <DosageRoutinePlanner />
        )}

        {/* ================= VIEW: DISPENSARY CATALOG ================= */}
        {currentView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2ECE5]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
                  Certified Dispensary
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#164E33]">
                  All Formulations &amp; Dietary Catalog
                </h1>
                <p className="text-xs text-[#52665A] mt-1">
                  100% Halal softgels, certified pure ingredients, sealed with laboratory batch verification.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {products.length === 0 ? (
                  <button
                    onClick={handleSeedDemoProducts}
                    className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#86EFAC]" />
                    <span>Seed Curated Formulations</span>
                  </button>
                ) : (
                  <button
                    onClick={handleClearAllProducts}
                    className="px-3.5 py-1.5 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Catalog</span>
                  </button>
                )}
              </div>
            </div>

            {products.length === 0 ? (
              <div className="bg-white border border-[#E2ECE5] rounded-3xl p-10 text-center space-y-4">
                <Pill className="w-12 h-12 text-[#15803D] mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#1E2923]">Dispensary Catalog Cleared</h3>
                <p className="text-xs text-[#52665A] max-w-md mx-auto">
                  All items have been removed as requested. You can seed the 4 curated formulations anytime to test shopping bag and checkout!
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleSeedDemoProducts}
                    className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                  >
                    Load 4 Curated Formulations
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                    isWishlisted={!!wishlistIds[prod.id]}
                    onToggleWishlist={handleToggleWishlist}
                    isOwnerMode={isOwnerMode}
                    onDeleteProduct={(p) => handleDeleteProduct(p.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW: PRODUCT DETAIL ================= */}
        {currentView === 'product' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('catalog')}
            onAddToCart={handleAddToCart}
            isWishlisted={!!wishlistIds[selectedProduct.id]}
            onToggleWishlist={handleToggleWishlist}
            isOwnerMode={isOwnerMode}
            onSelectProduct={handleSelectProduct}
            allProducts={products}
          />
        )}

        {/* ================= VIEW: WISHLIST ================= */}
        {currentView === 'wishlist' && (
          <Wishlist
            products={products}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigateHome={() => setCurrentView('catalog')}
          />
        )}

        {/* ================= VIEW: ACCOUNT & ORDER TRACKING ================= */}
        {currentView === 'account' && (
          <AccountView
            profile={profile}
            orders={orders}
            onUpdateProfile={setProfile}
            onNavigateCatalog={() => setCurrentView('catalog')}
          />
        )}

        {/* ================= VIEW: QUALITY LAB CERTIFICATE LOOKUP ================= */}
        {currentView === 'lab-lookup' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <QualityLabLookup />
          </div>
        )}

        {/* ================= VIEW: PHARMACIST CONSULTATION DESK ================= */}
        {currentView === 'pharmacist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <PharmacistConsultDesk />
          </div>
        )}

        {/* ================= VIEW: POLICIES ================= */}
        {currentView === 'policies' && (
          <PoliciesView />
        )}

        {/* ================= VIEW: SELLER STUDIO ================= */}
        {currentView === 'seller' && (
          <SellerStudio
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onViewProductInStore={handleSelectProduct}
            onSeedSampleCosmetics={handleSeedDemoProducts}
            onResetCatalog={handleSeedDemoProducts}
          />
        )}

      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(newOrder: Order) => {
          setOrders(prev => [newOrder, ...prev]);
          setCartItems([]);
          setIsCheckoutOpen(false);
          setCurrentView('account');
          showToast(`Order #${newOrder.id} placed successfully via ${newOrder.paymentMethod}!`);
        }}
      />

      {/* Owner Portal Authentication Modal */}
      {isOwnerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#C2DEC9] relative space-y-4">
            <button
              onClick={() => setIsOwnerModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#52665A] hover:text-[#1E2923] rounded-full hover:bg-[#F4F9F5]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#EAF6EE] text-[#15803D] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#1E2923]">
                Dispensary Owner Login
              </h3>
              <p className="text-xs text-[#52665A]">
                Authorized access for store owners and managers to manage formulations, pricing, and orders.
              </p>
            </div>

            <form onSubmit={handleOwnerLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#52665A] mb-1">
                  Owner Security PIN
                </label>
                <input
                  type="password"
                  placeholder="Enter 7860 or 1234"
                  value={ownerPinInput}
                  onChange={(e) => {
                    setOwnerPinInput(e.target.value);
                    setOwnerPinError(false);
                  }}
                  className="w-full px-3 py-2 text-center text-sm font-mono tracking-widest bg-[#F9FBFA] border border-[#D2E7DA] rounded-xl text-[#1E2923] focus:outline-none focus:border-[#15803D]"
                  autoFocus
                />
                {ownerPinError && (
                  <p className="text-[11px] text-rose-600 mt-1 text-center font-medium">
                    Invalid PIN. Use demo PIN: 7860
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Access Owner Studio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOwnerMode={isOwnerMode}
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
        onToggleOwnerMode={() => {
          setIsOwnerMode(!isOwnerMode);
          showToast(!isOwnerMode ? 'Store Owner Mode activated.' : 'Switched to customer view.');
        }}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Share & QR Code Modal */}
      <ShareQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
}
