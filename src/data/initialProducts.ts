import { Product } from '../types';

import heroApothecaryLabImg from '../assets/images/hero_apothecary_lab_1790695118612.jpg';
import pharmacistConsultImg from '../assets/images/pharmacist_doctor_consult_1790695137119.jpg';
import qualityLabCertImg from '../assets/images/quality_lab_certificate_1790695155337.jpg';
import multivitaminBottleImg from '../assets/images/nutrifactor_multivitamin_bottle_1790522257895.jpg';
import omegaSoftgelsImg from '../assets/images/nutrifactor_omega_softgels_1790522275147.jpg';
import botanicalSerumImg from '../assets/images/product_botanical_serum_1790437104717.jpg';

// All products cleared as requested by user. Catalog starts pristine and empty.
export const INITIAL_PRODUCTS: Product[] = [];

// Curated reference formulations ready to seed on demand via "Seed Demo Formulations" or Seller Studio
export const CURATED_DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-curated-01',
    name: 'Vitamax Pure Daily Botanical Multivitamin & Zinc',
    cat: 'vitamins',
    tag: 'Immunity & Vitality',
    healthGoal: 'energy-immunity',
    format: 'Tablets',
    dosageCount: '60 Tablets',
    drapNumber: 'DRAP Enlistment # 008912',
    price: 1950,
    was: 2400,
    stock: 50,
    rating: 4.9,
    reviews: 218,
    badge: 'bestseller',
    restricted: false,
    desc: 'Pure botanical multivitamin formulation engineered with 24 essential micronutrients, Panax Ginseng, and bioactive Zinc to fuel daily physical stamina, cellular repair, and immune defence.',
    benefits: [
      'Boosts natural metabolic energy without caffeine crashes',
      'Provides high-potency Zinc and Vitamin C for seasonal resilience',
      'Supports healthy nervous system balance and mental alertness'
    ],
    directions: 'Take 1 tablet daily with breakfast or lunch alongside a full glass of water. Do not exceed the stated dose.',
    supplementFacts: [
      { nutrient: 'Vitamin A (as Acetate)', amount: '3500 IU', dailyValue: '70%' },
      { nutrient: 'Vitamin C (Ascorbic Acid)', amount: '90 mg', dailyValue: '100%' },
      { nutrient: 'Vitamin D3 (Cholecalciferol)', amount: '1000 IU', dailyValue: '125%' },
      { nutrient: 'Zinc (as Zinc Oxide)', amount: '11 mg', dailyValue: '100%' },
      { nutrient: 'Panax Ginseng Extract', amount: '50 mg', dailyValue: '*' }
    ],
    ingredients: 'Ascorbic Acid, Zinc Oxide, Cholecalciferol, Panax Ginseng, Microcrystalline Cellulose, Vegetable Magnesium Stearate.',
    warnings: 'Consult your doctor before use if you are pregnant, nursing, or taking chronic medications.',
    image: heroApothecaryLabImg,
    color: '#15803D',
    isUserCreated: false,
    sellerName: 'Eco Medicines Certified Dispensary',
    createdDate: '2026-09-29'
  },
  {
    id: 'prod-curated-02',
    name: 'Deep-Sea Omega-3 Pure Icelandic High-DHA Softgels',
    cat: 'wellness',
    tag: 'Heart & Cognitive',
    healthGoal: 'heart-vitality',
    format: 'Softgels',
    dosageCount: '60 Halal Softgels',
    drapNumber: 'DRAP Enlistment # 006523',
    price: 2650,
    was: 3100,
    stock: 40,
    rating: 4.9,
    reviews: 184,
    badge: 'halal',
    restricted: false,
    desc: 'Triple-distilled pure cold-water marine oil rich in EPA (600mg) and DHA (400mg) in 100% Halal certified softgels. Infused with natural lemon extract to eliminate fishy burps.',
    benefits: [
      'Promotes healthy arterial elasticity and cardiac rhythm',
      'Enhances mental focus, memory retention, and cognitive clarity',
      'Lubricates synovial joint tissue for pain-free mobility'
    ],
    directions: 'Take 1 to 2 softgels daily with a meal containing healthy fats, or as advised by your clinical physician.',
    supplementFacts: [
      { nutrient: 'Total Deep Sea Marine Oil', amount: '1200 mg', dailyValue: '*' },
      { nutrient: 'EPA (Eicosapentaenoic Acid)', amount: '600 mg', dailyValue: '*' },
      { nutrient: 'DHA (Docosahexaenoic Acid)', amount: '400 mg', dailyValue: '*' },
      { nutrient: 'Vitamin E (d-Alpha Tocopherol)', amount: '10 IU', dailyValue: '33%' }
    ],
    ingredients: 'Purified Marine Fish Oil, Halal Bovine Gelatin, Glycerol, Purified Water, Organic Lemon Oil.',
    warnings: 'Contains fish. Consult doctor if taking prescription blood thinners or scheduled for surgery.',
    image: omegaSoftgelsImg,
    color: '#1E6B47',
    isUserCreated: false,
    sellerName: 'Eco Medicines Certified Dispensary',
    createdDate: '2026-09-29'
  },
  {
    id: 'prod-curated-03',
    name: 'Clinical Niacinamide 10% + Zinc PCA Botanical Elixir',
    cat: 'skincare',
    tag: 'Barrier Repair',
    healthGoal: 'hair-skin-nails',
    format: 'Cream / Serum',
    dosageCount: '30ml Dropper',
    price: 2850,
    was: 3400,
    stock: 35,
    rating: 4.8,
    reviews: 142,
    badge: 'clean',
    restricted: false,
    desc: 'Medical-grade dermocosmetic botanical formulation targeting acne redness, enlarged pores, and hyperpigmentation with pharmaceutical grade Niacinamide and soothing Centella Asiatica.',
    benefits: [
      'Regulates excess sebum production and refines texture',
      'Fades post-acne erythema and sun marks within 4 weeks',
      'Fortifies skin lipid moisture barrier against environmental pollutants'
    ],
    directions: 'Dispense 3-4 drops onto cleansed damp skin every morning and evening before moisturizing creams.',
    ingredients: 'Aqua, Niacinamide (10%), Zinc PCA (1%), Hyaluronic Acid, Centella Asiatica Extract, Glycerin.',
    warnings: 'For topical cosmetic use only. Patch test on inner arm for 24 hours prior to facial use.',
    image: botanicalSerumImg,
    color: '#059669',
    isUserCreated: false,
    sellerName: 'Eco Botanicals Skincare Lab',
    createdDate: '2026-09-29'
  },
  {
    id: 'prod-curated-04',
    name: 'Bioactive Vitamin D3 5000 IU + K2 MK-7 MCT Drops',
    cat: 'wellness',
    tag: 'Bone & Immune Defense',
    healthGoal: 'bones-joints',
    format: 'Drops',
    dosageCount: '30ml Glass Dropper',
    drapNumber: 'DRAP Enlistment # 008129',
    price: 2350,
    was: 2750,
    stock: 60,
    rating: 4.9,
    reviews: 175,
    badge: 'bestseller',
    restricted: false,
    desc: 'High-absorption sublingual drops combining 5000 IU vegan Lichen Vitamin D3 with all-trans MK-7 Vitamin K2 suspended in pure organic coconut MCT oil for rapid cellular uptake.',
    benefits: [
      'Channels calcium directly into bone matrix and away from blood vessels',
      'Supports optimal mood regulation, winter energy, and immune response',
      'Sublingual oil drops bypass gastric breakdown for instant absorption'
    ],
    directions: 'Take 1 full dropper (1ml) under the tongue daily, hold for 30 seconds before swallowing, or add to a smoothie.',
    supplementFacts: [
      { nutrient: 'Vitamin D3 (from Wild Lichen)', amount: '5000 IU', dailyValue: '625%' },
      { nutrient: 'Vitamin K2 (as MK-7 Menaquinone)', amount: '100 mcg', dailyValue: '83%' },
      { nutrient: 'Organic Coconut MCT Matrix', amount: '900 mg', dailyValue: '*' }
    ],
    ingredients: 'Fractionated Coconut MCT Oil, Cholecalciferol, All-Trans Menaquinone-7, Sunflower Tocopherols.',
    warnings: 'If taking prescription blood thinners (Warfarin/Coumadin), consult your physician before use.',
    image: qualityLabCertImg,
    color: '#15803D',
    isUserCreated: false,
    sellerName: 'Eco Medicines Certified Dispensary',
    createdDate: '2026-09-29'
  }
];
