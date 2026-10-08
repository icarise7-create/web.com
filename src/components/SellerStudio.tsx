import React, { useState } from 'react';
import { Product, Order, CategoryId, HealthGoal, ProductFormat } from '../types';
import { formatPKR } from '../utils/currency';
import { getPublicStoreUrl } from '../utils/publicUrl';
import { 
  Plus, 
  Store, 
  Banknote, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Trash2, 
  Edit, 
  Eye, 
  Sparkles, 
  AlertTriangle,
  Upload,
  CheckCircle2,
  X,
  Share2,
  Copy,
  ExternalLink,
  Globe,
  Pill,
  ShieldCheck,
  FileText,
  Clock,
  Truck
} from 'lucide-react';

import multivitaminBottleImg from '../assets/images/nutrifactor_multivitamin_bottle_1790522257895.jpg';
import omegaSoftgelsImg from '../assets/images/nutrifactor_omega_softgels_1790522275147.jpg';
import botanicalSerumImg from '../assets/images/product_botanical_serum_1790437104717.jpg';
import ceramideCreamImg from '../assets/images/product_ceramide_cream_1790437119575.jpg';
import vitaminTinctureImg from '../assets/images/product_vitamin_tincture_1790437132433.jpg';

interface SellerStudioProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onViewProductInStore: (product: Product) => void;
  onSeedSampleCosmetics: () => void;
  onResetCatalog: () => void;
}

const PRESET_IMAGES = [
  { label: 'White Vitamin & Supplement Bottle', url: multivitaminBottleImg },
  { label: 'Amber Softgels & Omega Bottle', url: omegaSoftgelsImg },
  { label: 'Golden Liquid Drops Tincture', url: vitaminTinctureImg },
  { label: 'Botanical Dermo-Serum Dropper', url: botanicalSerumImg },
  { label: 'Frosted Ceramide Cream Jar', url: ceramideCreamImg }
];

export const SellerStudio: React.FC<SellerStudioProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onViewProductInStore,
  onSeedSampleCosmetics,
  onResetCatalog
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add'>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const publicStoreUrl = getPublicStoreUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicStoreUrl);
    setCopiedLink(true);
    triggerToast('Public store link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Form state for uploading vitamins, supplements, medicines
  const [formName, setFormName] = useState('');
  const [formCat, setFormCat] = useState<CategoryId>('vitamins');
  const [formTag, setFormTag] = useState('Multivitamin');
  const [formHealthGoal, setFormHealthGoal] = useState<HealthGoal>('energy-immunity');
  const [formFormat, setFormFormat] = useState<ProductFormat>('Tablets');
  const [formDosageCount, setFormDosageCount] = useState('60 Tablets');
  const [formDrapNumber, setFormDrapNumber] = useState('DRAP Enlistment # 009842');
  const [formPrice, setFormPrice] = useState('1850');
  const [formWasPrice, setFormWasPrice] = useState('2200');
  const [formStock, setFormStock] = useState('50');
  const [formSellerName, setFormSellerName] = useState('Eco Medicines & Vitamin Pakistan');
  const [formBadge, setFormBadge] = useState<'bestseller' | 'new' | 'clean' | 'artisan' | 'halal' | 'drap' | null>('drap');
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0].url);
  const [formCustomUrl, setFormCustomUrl] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formBenefits, setFormBenefits] = useState('Supports daily energy and stamina\nStrengthens immune defence\nPromotes overall wellness and vitality');
  const [formDirections, setFormDirections] = useState('Take 1 tablet daily with a glass of water after meals, or as directed by a healthcare practitioner.');
  const [formIngredients, setFormIngredients] = useState('Active Vitamins, Minerals, Microcrystalline Cellulose, Vegetable Magnesium Stearate.');
  const [formWarnings, setFormWarnings] = useState('Dietary supplements should not replace a balanced diet. Keep out of reach of children. Store below 30°C in a dry place.');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCat('vitamins');
    setFormTag('Multivitamin');
    setFormHealthGoal('energy-immunity');
    setFormFormat('Tablets');
    setFormDosageCount('60 Tablets');
    setFormDrapNumber('DRAP Enlistment # 009842');
    setFormPrice('1850');
    setFormWasPrice('2200');
    setFormStock('50');
    setFormSellerName('NutriLife Health Pakistan');
    setFormBadge('drap');
    setFormImage(PRESET_IMAGES[0].url);
    setFormCustomUrl('');
    setFormDesc('High potency daily dietary supplement formulated under audited pharmaceutical cGMP standards for optimal vitality.');
    setFormBenefits('Supports daily energy and stamina\nStrengthens immune defence\nPromotes overall wellness and vitality');
    setFormDirections('Take 1 tablet daily with water after meals, or as directed by your physician.');
    setFormIngredients('Active Vitamins, Minerals, Microcrystalline Cellulose, Vegetable Magnesium Stearate.');
    setFormWarnings('Dietary supplements should not replace a balanced diet. Keep out of reach of children. Store below 30°C in a dry place.');
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCat(p.cat);
    setFormTag(p.tag);
    setFormHealthGoal(p.healthGoal || 'energy-immunity');
    setFormFormat(p.format || 'Tablets');
    setFormDosageCount(p.dosageCount || '60 Tablets');
    setFormDrapNumber(p.drapNumber || '');
    setFormPrice(p.price.toString());
    setFormWasPrice(p.was ? p.was.toString() : '');
    setFormStock(p.stock.toString());
    setFormSellerName(p.sellerName || 'NutriLife Pakistan');
    setFormBadge(p.badge || null);
    setFormImage(p.image);
    setFormCustomUrl(p.image.startsWith('http') ? p.image : '');
    setFormDesc(p.desc);
    setFormBenefits(p.benefits ? p.benefits.join('\n') : '');
    setFormDirections(p.directions || '');
    setFormIngredients(p.ingredients);
    setFormWarnings(p.warnings);
    setShowAddModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormImage(reader.result);
          setFormCustomUrl('');
          triggerToast('Photo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const price = parseFloat(formPrice) || 1500;
    const was = formWasPrice ? parseFloat(formWasPrice) : null;
    const stock = parseInt(formStock, 10) || 20;
    const finalImage = formCustomUrl.trim() || formImage;
    const benefitsList = formBenefits.split('\n').map(b => b.trim()).filter(Boolean);

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formName.trim(),
        cat: formCat,
        tag: formTag,
        healthGoal: formHealthGoal,
        format: formFormat,
        dosageCount: formDosageCount.trim(),
        drapNumber: formDrapNumber.trim() || undefined,
        price,
        was,
        stock,
        sellerName: formSellerName.trim() || 'NutriLife Pakistan',
        badge: formBadge,
        image: finalImage,
        desc: formDesc.trim(),
        benefits: benefitsList,
        directions: formDirections.trim(),
        ingredients: formIngredients.trim(),
        warnings: formWarnings.trim()
      });
      triggerToast(`"${formName}" updated successfully!`);
    } else {
      onAddProduct({
        name: formName.trim(),
        cat: formCat,
        tag: formTag,
        healthGoal: formHealthGoal,
        format: formFormat,
        dosageCount: formDosageCount.trim(),
        drapNumber: formDrapNumber.trim() || undefined,
        price,
        was,
        stock,
        badge: formBadge,
        restricted: formCat === 'coldflu',
        desc: formDesc.trim(),
        benefits: benefitsList,
        directions: formDirections.trim(),
        ingredients: formIngredients.trim(),
        warnings: formWarnings.trim(),
        image: finalImage,
        color: '#1F4A3A',
        isUserCreated: true,
        sellerName: formSellerName.trim() || 'NutriLife Pakistan',
        createdDate: new Date().toISOString().split('T')[0]
      });
      triggerToast(`"${formName}" uploaded and published to the live storefront!`);
    }

    setShowAddModal(false);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalUnitsStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const userProductsCount = products.filter(p => p.isUserCreated).length;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.tag.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          (p.sellerName && p.sellerName.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchesCat = categoryFilter === 'all' 
      ? true 
      : categoryFilter === 'my-products' 
      ? p.isUserCreated 
      : p.cat === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#15803D] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
          <span className="text-xs sm:text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Light Hero Header */}
      <div className="bg-gradient-to-br from-[#EAF6EE] via-[#F4FAF6] to-[#E2ECE5] border border-[#C2DEC9] text-[#1E2923] rounded-3xl p-6 sm:p-8 mb-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D] mb-2">
            <Pill className="w-4 h-4" />
            <span>Eco Medicines &amp; Vitamin · Seller &amp; Inventory Studio</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#164E33] mb-3">
            Upload &amp; Manage Your Formulations
          </h1>
          <p className="text-sm sm:text-base text-[#477A5C] leading-relaxed mb-6">
            Sell certified vitamins and remedies online across Pakistan. Easily upload new products with custom bottle photos and DRAP enlistment, or remove products you no longer want to sell with one click.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Vitamin / Medicine</span>
            </button>
            <button
              onClick={() => {
                onSeedSampleCosmetics();
                triggerToast('Artisan nutraceutical formulations loaded into your store catalog!');
              }}
              className="flex items-center gap-2 bg-white text-[#15803D] border border-[#C2DEC9] hover:bg-[#F0FDF4] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#15803D]" />
              <span>Load Sample Vitamin Formulations</span>
            </button>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#15803D]/5 pointer-events-none" />
      </div>

      {/* Public Storefront Link & Customer Sharing Card */}
      <div className="bg-[#F0FDF4] border-2 border-[#86EFAC] rounded-2xl p-5 sm:p-6 mb-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D]">
            <Globe className="w-4 h-4 text-[#15803D]" />
            <span>Your Live Public Store Link</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#164E33]">
            Customers Across Pakistan Can Order Directly from this URL
          </h3>
          <p className="text-xs text-[#477A5C] leading-relaxed">
            Share this link on WhatsApp, Instagram bio, or Facebook page. Regular customers see only the clean shopping store without merchant upload controls.
          </p>
          <div className="pt-1">
            <span className="inline-block text-[11px] font-mono text-[#15803D] bg-white px-2.5 py-1 rounded border border-[#C2DEC9] truncate max-w-md">
              {publicStoreUrl}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleCopyLink}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-[#86EFAC]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Store Link'}</span>
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Order 100% Halal vitamins & medicines online from Eco Medicines & Vitamin with Cash on Delivery across Pakistan: ${publicStoreUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#E9E4D6] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#726E60] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Gross Sales</span>
            <Banknote className="w-4 h-4 text-[#1F4A3A]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#2B2B26] tabular-nums">
            {formatPKR(totalRevenue)}
          </span>
          <span className="text-[11px] text-[#4E9C8E] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> From {orders.length} placed order{orders.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="bg-white border border-[#E9E4D6] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#726E60] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Catalog Products</span>
            <Package className="w-4 h-4 text-[#1F4A3A]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#2B2B26] tabular-nums">
            {products.length}
          </span>
          <span className="text-[11px] text-[#726E60] mt-1">
            {userProductsCount} custom uploaded formulation{userProductsCount === 1 ? '' : 's'}
          </span>
        </div>

        <div className="bg-white border border-[#E9E4D6] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#726E60] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Inventory In Stock</span>
            <Store className="w-4 h-4 text-[#1F4A3A]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#2B2B26] tabular-nums">
            {totalUnitsStock}
          </span>
          <span className="text-[11px] text-[#726E60] mt-1">Units ready for dispatch</span>
        </div>

        <div className="bg-white border border-[#E9E4D6] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#726E60] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Pending Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#E0759A]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#2B2B26] tabular-nums">
            {orders.filter(o => o.status === 'Processing').length}
          </span>
          <span className="text-[11px] text-amber-700 font-medium mt-1">
            {lowStockCount} product{lowStockCount === 1 ? '' : 's'} low on stock
          </span>
        </div>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#E9E4D6] mb-6 gap-4">
        <div className="flex gap-6 sm:gap-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'text-[#1F4A3A] border-b-2 border-[#1F4A3A]'
                : 'text-[#726E60] hover:text-[#2B2B26]'
            }`}
          >
            Product Catalog &amp; Formulations ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'text-[#1F4A3A] border-b-2 border-[#1F4A3A]'
                : 'text-[#726E60] hover:text-[#2B2B26]'
            }`}
          >
            <span>Customer Orders (COD &amp; Online)</span>
            <span className="bg-[#1F4A3A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {orders.length}
            </span>
          </button>
        </div>

        <button
          onClick={handleOpenAdd}
          className="hidden sm:flex items-center gap-1.5 bg-[#1F4A3A] hover:bg-[#2E664F] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer mb-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Vitamin / Product</span>
        </button>
      </div>

      {/* Tab 1: Product Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-[#E9E4D6] rounded-xl p-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search vitamins, DRAP #, brand..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-xs bg-[#F5F3EC] border border-[#E9E4D6] rounded-lg text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#F5F3EC] border border-[#E9E4D6] rounded-lg text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
              >
                <option value="all">All Product Aisles</option>
                <option value="my-products">★ Only My Uploaded Products</option>
                <option value="vitamins">Vitamins &amp; Multivitamins</option>
                <option value="wellness">Dietary Supplements &amp; Oils</option>
                <option value="skincare">Skincare &amp; Serums</option>
                <option value="medicine">OTC Medicine &amp; Pain Relief</option>
                <option value="coldflu">Cold &amp; Sinus</option>
              </select>

              <button
                onClick={onResetCatalog}
                className="text-[11px] text-[#726E60] hover:text-rose-600 underline whitespace-nowrap ml-2 cursor-pointer"
                title="Restore default product catalog"
              >
                Reset Defaults
              </button>
            </div>
          </div>

          {/* Remove Unwanted Products Notice */}
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-rose-800">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Remove Option:</strong> If there is any product you don't want to sell, click the red <strong>Remove</strong> button on that row to immediately unlist and delete it.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-rose-700 whitespace-nowrap bg-white/70 px-2 py-0.5 rounded border border-rose-200">
              {products.length} Products Active
            </span>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-[#E2ECE5] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F9F5] text-[#52665A] uppercase tracking-wider text-[10px] font-bold border-b border-[#E2ECE5]">
                  <tr>
                    <th className="py-3 px-4">Vitamin / Medicine Details</th>
                    <th className="py-3 px-4">Dosage &amp; Format</th>
                    <th className="py-3 px-4">Price (PKR)</th>
                    <th className="py-3 px-4">Inventory Units</th>
                    <th className="py-3 px-4">Brand / Certifications</th>
                    <th className="py-3 px-4 text-right">Store Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECE5]">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-[#FDFCF9] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg border border-[#E9E4D6] shrink-0"
                          />
                          <div>
                            <span className="font-semibold text-[#2B2B26] block text-xs sm:text-sm">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-[#726E60] line-clamp-1 max-w-[280px]">
                              {p.desc}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#1F4A3A] block">{p.dosageCount}</span>
                        <span className="text-[11px] text-[#726E60]">{p.format}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-baseline gap-1 font-semibold text-[#2B2B26] tabular-nums">
                          <span>{formatPKR(p.price)}</span>
                          {p.was && (
                            <span className="text-[10px] text-[#726E60] line-through">
                              {formatPKR(p.was)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateProduct({ ...p, stock: Math.max(0, p.stock - 1) })}
                            className="w-5 h-5 rounded border border-[#E9E4D6] flex items-center justify-center hover:bg-[#F5F3EC] cursor-pointer"
                          >
                            −
                          </button>
                          <span className={`font-semibold tabular-nums ${p.stock <= 5 ? 'text-amber-700' : 'text-[#2B2B26]'}`}>
                            {p.stock}
                          </span>
                          <button
                            onClick={() => onUpdateProduct({ ...p, stock: p.stock + 5 })}
                            className="w-5 h-5 rounded border border-[#E9E4D6] flex items-center justify-center hover:bg-[#F5F3EC] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-[#2B2B26] block font-medium">
                          {p.sellerName || 'NutriFactor'}
                        </span>
                        {p.drapNumber && (
                          <span className="text-[10px] text-[#1F4A3A] font-semibold block">
                            {p.drapNumber}
                          </span>
                        )}
                        {p.isUserCreated && (
                          <span className="text-[10px] text-[#E0759A] font-semibold block">
                            ★ Custom Upload
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewProductInStore(p)}
                            title="Preview product in storefront"
                            className="p-1.5 rounded text-[#52665A] hover:text-[#15803D] hover:bg-[#F4F9F5] cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Edit full product details"
                            className="p-1.5 rounded text-[#52665A] hover:text-[#15803D] hover:bg-[#F4F9F5] cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(p)}
                            title="Remove this product from catalog"
                            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders & Customer Purchases */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E9E4D6] rounded-xl p-5">
            <h3 className="font-serif text-lg font-semibold text-[#2B2B26] mb-1">
              Customer Orders &amp; Dispatch Fulfillment
            </h3>
            <p className="text-xs text-[#726E60] mb-4">
              Real customer orders across Pakistan with Cash on Delivery (COD) or online payment. Update fulfillment milestones to notify dispatch.
            </p>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-[#726E60]">
                <ShoppingBag className="w-8 h-8 mx-auto text-[#E9E4D6] mb-2" />
                <p className="text-sm font-medium">No customer orders placed yet.</p>
                <p className="text-xs text-[#726E60] mt-1">
                  Place an order from the shopping bag to see customer purchases and shipping tracking here!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="border border-[#E9E4D6] rounded-xl p-4 bg-[#FDFCF9] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E4D6] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm text-[#2B2B26]">
                            Order #{order.id}
                          </span>
                          <span className="text-xs text-[#726E60]">· {order.date}</span>
                          <span className="text-[10px] font-semibold bg-[#EAF6F1] text-[#1F4A3A] px-2 py-0.5 rounded">
                            {order.paymentMethod || 'Cash on Delivery (COD)'}
                          </span>
                        </div>
                        <span className="text-xs text-[#726E60] block mt-1">
                          Customer: <strong className="text-[#2B2B26]">{order.customerName}</strong> ({order.customerEmail} · {order.customerPhone || 'Phone provided on parcel'})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-base text-[#1F4A3A] tabular-nums">
                          {formatPKR(order.total)}
                        </span>

                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                          className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : order.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.status === 'Dispensing'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispensing">Dispensing / Packaging</option>
                          <option value="Shipped">Shipped / Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 bg-white p-2 rounded-lg border border-[#E9E4D6]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-md border border-[#E9E4D6]"
                          />
                          <div className="text-xs min-w-0">
                            <span className="font-medium text-[#2B2B26] truncate block">{item.name}</span>
                            <span className="text-[#726E60]">
                              Qty: {item.quantity} · {formatPKR(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-[#726E60] pt-1 flex items-center justify-between">
                      <span>Shipping to: {order.shippingAddress}, {order.city} {order.zip}</span>
                      <span className="text-[#1F4A3A] font-medium">Insured Tracked Delivery</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload New Vitamin / Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFCF9] border border-[#E9E4D6] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 text-[#726E60] hover:text-[#2B2B26] rounded-full hover:bg-[#F5F3EC]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-semibold text-[#1F4A3A] uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-[#4E9C8E]" />
                <span>Nutraceutical Formulation Creator</span>
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#2B2B26]">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Upload Your Vitamin, Medicine or Supplement'}
              </h2>
              <p className="text-xs text-[#726E60] mt-1">
                Enter your dosage form, DRAP enlistment number, supplement facts, and packaging photography.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vitamax One-A-Day Multivitamin 60 Tablets"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Brand / Manufacturer Name</label>
                  <input
                    type="text"
                    placeholder="e.g. NutriLife Laboratories Pakistan"
                    value={formSellerName}
                    onChange={(e) => setFormSellerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
              </div>

              {/* Format, Dosage Count, DRAP number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Dosage Format *</label>
                  <select
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value as ProductFormat)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  >
                    <option value="Tablets">Tablets</option>
                    <option value="Softgels">Softgels (Halal)</option>
                    <option value="Capsules">Vegetarian Capsules</option>
                    <option value="Drops">Sublingual Drops / Tincture</option>
                    <option value="Liquid Syrup">Liquid Syrup</option>
                    <option value="Effervescent">Effervescent Tablets</option>
                    <option value="Powder">Powder</option>
                    <option value="Cream / Serum">Dermocosmetic Serum / Cream</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Serving Count / Size *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 60 Tablets or 30 Softgels"
                    value={formDosageCount}
                    onChange={(e) => setFormDosageCount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">DRAP Enlistment / Reg #</label>
                  <input
                    type="text"
                    placeholder="e.g. DRAP Enlistment # 008942"
                    value={formDrapNumber}
                    onChange={(e) => setFormDrapNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
              </div>

              {/* Category, Health Goal, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Store Aisle *</label>
                  <select
                    value={formCat}
                    onChange={(e) => setFormCat(e.target.value as CategoryId)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  >
                    <option value="vitamins">Vitamins &amp; Multivitamins</option>
                    <option value="wellness">Dietary Supplements &amp; Omegas</option>
                    <option value="skincare">Skincare &amp; Dermocosmetics</option>
                    <option value="medicine">OTC Medicine &amp; Pain Relief</option>
                    <option value="coldflu">Cold &amp; Flu (Decongestants)</option>
                    <option value="firstaid">First Aid Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Health Goal</label>
                  <select
                    value={formHealthGoal}
                    onChange={(e) => setFormHealthGoal(e.target.value as HealthGoal)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  >
                    <option value="energy-immunity">Energy &amp; Immunity</option>
                    <option value="hair-skin-nails">Hair, Skin &amp; Nails</option>
                    <option value="bones-joints">Bones &amp; Joints</option>
                    <option value="heart-vitality">Heart &amp; Vitality</option>
                    <option value="brain-sleep">Brain, Sleep &amp; Stress</option>
                    <option value="otc-medicine">OTC Medicine</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Badge</label>
                  <select
                    value={formBadge || ''}
                    onChange={(e) => setFormBadge((e.target.value || null) as any)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  >
                    <option value="drap">DRAP Enlisted</option>
                    <option value="halal">100% Halal</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="new">New Formula</option>
                    <option value="clean">Clean Formulation</option>
                  </select>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    required
                    placeholder="1850"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Was / Cut Price (PKR)</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    placeholder="2200"
                    value={formWasPrice}
                    onChange={(e) => setFormWasPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Inventory Units in Stock *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="50"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-sm text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
              </div>

              {/* Photo Upload & Presets */}
              <div className="p-4 bg-[#F5F3EC] rounded-xl border border-[#E9E4D6] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#2B2B26] block">
                    Product Bottle &amp; Packaging Photography
                  </label>
                  <label className="flex items-center gap-1.5 px-3 py-1 bg-[#1F4A3A] hover:bg-[#2E664F] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload From Device</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {/* Preset Options */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormImage(preset.url);
                        setFormCustomUrl('');
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        formImage === preset.url && !formCustomUrl ? 'border-[#1F4A3A] ring-2 ring-[#1F4A3A]/30' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 right-1 text-[8px] bg-black/70 text-white truncate px-1 rounded text-center">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Or paste direct image URL (e.g. https://...)"
                    value={formCustomUrl}
                    onChange={(e) => setFormCustomUrl(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26]"
                  />
                </div>
              </div>

              {/* Benefits (1 per line) */}
              <div>
                <label className="font-semibold text-[#2B2B26] block mb-1">Key Health Benefits (1 per line)</label>
                <textarea
                  rows={2}
                  placeholder="Supports stamina and combats fatigue&#10;Strengthens immune defence&#10;Promotes bone & heart wellness"
                  value={formBenefits}
                  onChange={(e) => setFormBenefits(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                />
              </div>

              {/* Directions for Use */}
              <div>
                <label className="font-semibold text-[#2B2B26] block mb-1">Directions &amp; Daily Dosage Guide</label>
                <input
                  type="text"
                  placeholder="e.g. Take 1 tablet daily with water after meals, or as advised by your physician."
                  value={formDirections}
                  onChange={(e) => setFormDirections(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-[#2B2B26] block mb-1">Full Description &amp; Clinical Details *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detail the scientific formulation, bio-availability, and health indications..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                />
              </div>

              {/* Ingredients & Warnings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Active Nutrients &amp; Ingredients</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Vitamin A 3500 IU, Vitamin C 90mg, Zinc 11mg, Ginseng Extract 50mg..."
                    value={formIngredients}
                    onChange={(e) => setFormIngredients(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B2B26] block mb-1">Safety Warnings &amp; Storage Conditions</label>
                  <textarea
                    rows={2}
                    placeholder="Consult doctor if pregnant. Keep out of reach of children. Store below 30°C."
                    value={formWarnings}
                    onChange={(e) => setFormWarnings(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E9E4D6] rounded-lg text-xs text-[#2B2B26] focus:outline-none focus:border-[#1F4A3A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E9E4D6]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#726E60] hover:text-[#2B2B26]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs rounded-full shadow-xs cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Vitamin to Live Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Remove Confirmation Dialog Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2ECE5] rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2923] mb-2">
              Remove Product from Catalog?
            </h3>
            <p className="text-xs text-[#52665A] leading-relaxed mb-4">
              Are you sure you want to remove <strong>"{productToDelete.name}"</strong>? It will immediately disappear from your Eco Medicines storefront and customers will not be able to purchase it.
            </p>
            <div className="p-3 bg-[#F4F9F5] rounded-xl border border-[#E2ECE5] mb-5 flex items-center gap-3">
              <img src={productToDelete.image} alt={productToDelete.name} className="w-12 h-12 rounded-lg object-cover bg-white" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[#1E2923] block truncate">{productToDelete.name}</span>
                <span className="text-[11px] text-[#52665A] block">{productToDelete.dosageCount} · {formatPKR(productToDelete.price)}</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-[#52665A] hover:bg-[#F4F9F5] rounded-full transition-colors cursor-pointer"
              >
                Keep in Store
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(productToDelete.id);
                  triggerToast(`Removed "${productToDelete.name}" from catalog.`);
                  setProductToDelete(null);
                }}
                className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Remove Product</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
