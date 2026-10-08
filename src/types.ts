export type CategoryId = 
  | 'vitamins'
  | 'skincare' 
  | 'cosmetics' 
  | 'wellness' 
  | 'haircare' 
  | 'medicine' 
  | 'coldflu' 
  | 'firstaid';

export type HealthGoal = 
  | 'all'
  | 'hair-skin-nails'
  | 'bones-joints'
  | 'energy-immunity'
  | 'heart-vitality'
  | 'brain-sleep'
  | 'otc-medicine';

export type ProductFormat = 
  | 'Tablets'
  | 'Capsules'
  | 'Softgels'
  | 'Effervescent'
  | 'Liquid Syrup'
  | 'Drops'
  | 'Powder'
  | 'Cream / Serum';

export interface SupplementFactItem {
  nutrient: string;
  amount: string;
  dailyValue?: string;
}

export interface Product {
  id: string;
  name: string;
  cat: CategoryId;
  tag: string;
  healthGoal: HealthGoal;
  format: ProductFormat;
  dosageCount: string; // e.g. "60 Tablets", "30 Softgels", "120ml"
  drapNumber?: string; // e.g. "DRAP Enlistment # 008942"
  price: number;
  was: number | null;
  stock: number;
  rating: number;
  reviews: number;
  badge?: 'bestseller' | 'new' | 'clean' | 'artisan' | 'halal' | 'drap' | null;
  restricted?: boolean;
  desc: string;
  benefits?: string[];
  directions?: string;
  supplementFacts?: SupplementFactItem[];
  ingredients: string;
  warnings: string;
  image: string;
  color?: string;
  isUserCreated?: boolean;
  sellerName?: string;
  createdDate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'Processing' | 'Dispensing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  city: string;
  zip: string;
  paymentMethod: 'COD' | 'JazzCash/EasyPaisa' | 'Card';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  courier?: string; // e.g. 'TCS Express', 'Leopards Courier', 'Trax'
  trackingCode?: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
}
