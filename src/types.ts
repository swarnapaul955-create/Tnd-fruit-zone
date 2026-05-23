export type FoodCategory = 'All' | 'Bowls & Salads' | 'Fresh Juices' | 'Chai & Maska Bun';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<FoodCategory, 'All'>;
  image: string;
  rating: number;
  calories?: string;
  prepTime: string;
  tags: string[];
  isBestSeller?: boolean;
  isHealthy?: boolean;
  isCozy?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  tags: string[];
  avatarColor: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customization?: {
    sweetness?: 'Normal' | 'Less' | 'None';
    temperature?: 'Hot' | 'Iced';
    extraButter?: boolean;
    extraNutsAndSeeds?: boolean;
    extraHoney?: boolean;
  };
}
