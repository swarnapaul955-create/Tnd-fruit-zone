import { MenuItem, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bowl-1',
    name: 'TND Signature Fruit Power Bowl',
    description: 'Fresh organic kiwi, exotic red pitaya, antioxidant-rich berries, sweet pomegranate seeds, and fresh mango cheeks, lightly drizzled with raw honey and organic chia seeds.',
    price: 8.50,
    category: 'Bowls & Salads',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    calories: '280 kcal',
    prepTime: '6 mins',
    tags: ['Premium Fresh', 'High Fiber', 'Skin Glow'],
    isBestSeller: true,
    isHealthy: true
  },
  {
    id: 'bowl-2',
    name: 'Avocado & Citrus Glow Salad',
    description: 'Perfectly riped avocado slices, vibrant ruby red grapefruit, organic baby spinach, dynamic mint sprigs, toasted walnuts, and our house cold-pressed citrus vine dressing.',
    price: 9.50,
    category: 'Bowls & Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    calories: '340 kcal',
    prepTime: '8 mins',
    tags: ['Superfood', 'Omega-3', 'Leafy Green'],
    isHealthy: true
  },
  {
    id: 'bowl-3',
    name: 'Antioxidant Berry Crunch Bowl',
    description: 'A lavish bed of low-fat Greek yogurt or vegan coconut yogurt topped with organic strawberries, plump blackberries, antioxidant blueberries, clean pecan granola, and pumpkin seeds.',
    price: 8.95,
    category: 'Bowls & Salads',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    calories: '310 kcal',
    prepTime: '5 mins',
    tags: ['Antioxidants', 'Protein Pack'],
    isHealthy: true
  },
  {
    id: 'bowl-4',
    name: 'Tropical Sun-Infused Bowl',
    description: 'Sweet ripened pineapples, juicy mangoes, sun-kissed banana slices, toasted unsweetened coconut shavings, and a splash of pure fresh lime juice with mint zest.',
    price: 7.95,
    category: 'Bowls & Salads',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    calories: '240 kcal',
    prepTime: '5 mins',
    tags: ['Hydration', 'Vitamin C'],
    isHealthy: true
  },
  {
    id: 'juice-1',
    name: 'Leafy Green Power Elixir',
    description: '100% cold-pressed local spinach, celery stalks, crisp green apple, zesty ginger root, and organic lemon. Liquid wellness designed to detoxify and energize.',
    price: 6.25,
    category: 'Fresh Juices',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    calories: '120 kcal',
    prepTime: '4 mins',
    tags: ['Cold Pressed', 'Detox Elixir', 'No Added Sugar'],
    isBestSeller: true,
    isHealthy: true
  },
  {
    id: 'juice-2',
    name: 'Bright Tangelo Energizer',
    description: 'Fresh squeezed sweet seasonal oranges, pure golden juice, crushed turmeric root, cold grated ginger, and a light infusion of healing wildflower honey.',
    price: 5.95,
    category: 'Fresh Juices',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    calories: '150 kcal',
    prepTime: '3 mins',
    tags: ['100% Squeezed', 'Immunity Boost'],
    isHealthy: true
  },
  {
    id: 'juice-3',
    name: 'Crimson Beet Refresh-Co',
    description: 'Earthy organic red beets, sweet carrots, crunchy Fuji apples, and key lime twist. Rich in natural nitric oxides for standard healthy physical circulation.',
    price: 6.50,
    category: 'Fresh Juices',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    calories: '140 kcal',
    prepTime: '4 mins',
    tags: ['Iron Rich', 'Pre-Workout'],
    isHealthy: true
  },
  {
    id: 'cozy-1',
    name: 'Cozy Kulhad Masala Chai',
    description: 'Authentic organic Assam CTC tea brewed slowly with hand-crushed cardamom, fresh ginger, grated nutmeg, cloves, and premium cinnamon. Served steaming hot in traditional clay soil cups (Kulhad).',
    price: 3.50,
    category: 'Chai & Maska Bun',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    prepTime: '7 mins',
    tags: ['Slow Cooked', 'Spice Infusion', 'Earthy Clay Cup'],
    isBestSeller: true,
    isCozy: true
  },
  {
    id: 'cozy-2',
    name: 'Classic Toasted Maska Bun',
    description: 'Soft, airy, sweet-kneaded milk brioche bun, sliced, perfectly toasted on iron griddle, and loaded with a lavish layer of whipped butter. Melt-in-your-mouth perfection.',
    price: 4.20,
    category: 'Chai & Maska Bun',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    prepTime: '5 mins',
    tags: ['Fresh Griddled', 'Comfort Classic', 'Fluffy Brioche'],
    isBestSeller: true,
    isCozy: true
  },
  {
    id: 'cozy-3',
    name: 'Irani Caramel Chai & Maska Bun Combo',
    description: 'The ultimate solace combo. A warm cup of creamy, caramelized, slow-condensed Irani chai tea, paired alongside our grid-marked buttery Maska Bun. An unbeatable timeless comfort experience.',
    price: 6.95,
    category: 'Chai & Maska Bun',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    prepTime: '7 mins',
    tags: ['Perfect Duo', 'Signature Cozy', 'Must Try'],
    isBestSeller: true,
    isCozy: true
  },
  {
    id: 'cozy-4',
    name: 'Nutty Almond-Cardamom Chai',
    description: 'Subtly sweet, dairy-free black tea slow-brewed with pure organic almond milk, hand-crushed green cardamom pods, and raw maple syrup.',
    price: 4.00,
    category: 'Chai & Maska Bun',
    image: 'https://images.unsplash.com/photo-1563887528406-d537fecbc6ee?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    prepTime: '6 mins',
    tags: ['Plant-Based Cozy', 'Mild Sweetness'],
    isCozy: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Arjun K.',
    rating: 5,
    date: 'May 18, 2026',
    comment: 'TND Fruit Zone has cracked the absolute dream code. Sitting here with a vibrant, nutrient-dense signature fruit power bowl in my left hand, and a hot, perfectly spiced Kulhad Masala Chai in my right is sheer perfection. The maska bun is pillow-soft!',
    tags: ['Perfect Chai', 'Fresh Cut', 'Cozy Duo'],
    avatarColor: 'bg-[#8D6E63]'
  },
  {
    id: 'rev-2',
    userName: 'Meera S.',
    rating: 5,
    date: 'May 15, 2026',
    comment: 'The Avocado & Citrus Glow Salad is ridiculously fresh. It is so hard to find high-end, cleanly cut fruits that do not taste oxidized, but TND prepares them instantly before your eyes. The citrus vinaigrette dressing is amazing.',
    tags: ['Fresh Cut', 'Superfood', 'Healthy Herb'],
    avatarColor: 'bg-[#2E7D32]'
  },
  {
    id: 'rev-3',
    userName: 'Rahul V.',
    rating: 4.8,
    date: 'May 12, 2026',
    comment: 'That warm maska bun with whipped double-salted butter melt just disintegrates on your tongue. Pair it with their Irani Caramel Chai, and you will understand why there is always a crowd at that elegant wooden counter.',
    tags: ['Comfort Classic', 'Buttery Melt'],
    avatarColor: 'bg-[#FF6D00]'
  },
  {
    id: 'rev-4',
    userName: 'Sneha P.',
    rating: 4.7,
    date: 'May 06, 2026',
    comment: 'The Leafy Green Power Elixir is liquid health. No added sugars, pure organic greens and ginger kick. I love how interactive the menu is. Very friendly service.',
    tags: ['Detox Approved', 'Ginger Kick'],
    avatarColor: 'bg-clay'
  }
];

export const DYNAMIC_REVIEW_TAGS = [
  'Perfect Chai',
  'Fresh Cut',
  'Cozy Duo',
  'Buttery Melt',
  'Detox Approved',
  'Superfood',
  'Super Friendly',
  'Cozy Ambience',
  'Fast Service'
];
