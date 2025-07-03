
export interface Pizza {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  price: number; // For backward compatibility
  rating: number; // Add missing rating property
  image: string;
  category: string;
  popular?: boolean;
  ingredients: string[];
  sizes: {
    small: { name: string; price: number; slices: number };
    medium: { name: string; price: number; slices: number };
    large: { name: string; price: number; slices: number };
  };
}

// Add missing interfaces and constants for PizzaCustomizationModal
export interface PizzaSize {
  id: string;
  name: string;
  description: string;
  multiplier: number;
}

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  category: 'cheese' | 'meat' | 'vegetable' | 'sauce';
}

export const pizzaSizes: PizzaSize[] = [
  { id: 'small', name: 'Pequena', description: '25cm - 4 fatias', multiplier: 0.8 },
  { id: 'medium', name: 'Média', description: '30cm - 6 fatias', multiplier: 1.0 },
  { id: 'large', name: 'Grande', description: '35cm - 8 fatias', multiplier: 1.3 },
  { id: 'family', name: 'Família', description: '40cm - 12 fatias', multiplier: 1.6 }
];

export const availableIngredients: Ingredient[] = [
  // Queijos
  { id: 'mussarela', name: 'Mussarela Extra', price: 3.50, category: 'cheese' },
  { id: 'catupiry', name: 'Catupiry', price: 4.00, category: 'cheese' },
  { id: 'cheddar', name: 'Cheddar', price: 3.50, category: 'cheese' },
  { id: 'gorgonzola', name: 'Gorgonzola', price: 5.00, category: 'cheese' },
  
  // Carnes
  { id: 'pepperoni', name: 'Pepperoni', price: 4.50, category: 'meat' },
  { id: 'calabresa', name: 'Calabresa', price: 3.50, category: 'meat' },
  { id: 'bacon', name: 'Bacon', price: 4.00, category: 'meat' },
  { id: 'frango', name: 'Frango', price: 3.50, category: 'meat' },
  
  // Vegetais
  { id: 'champignon', name: 'Champignon', price: 3.00, category: 'vegetable' },
  { id: 'azeitona', name: 'Azeitona', price: 2.50, category: 'vegetable' },
  { id: 'tomate', name: 'Tomate', price: 2.00, category: 'vegetable' },
  { id: 'cebola', name: 'Cebola', price: 2.00, category: 'vegetable' },
  
  // Molhos
  { id: 'barbecue', name: 'Molho Barbecue', price: 2.50, category: 'sauce' },
  { id: 'pesto', name: 'Molho Pesto', price: 3.00, category: 'sauce' }
];

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita Suprema',
    description: 'A clássica que conquistou o mundo! Molho de tomate artesanal, mussarela derretida e manjericão fresco.',
    basePrice: 32.90,
    price: 32.90,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    category: 'Clássicas',
    popular: true,
    ingredients: ['mussarela', 'tomate', 'manjericão', 'azeite'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 32.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 42.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 52.90, slices: 8 }
    }
  },
  {
    id: '2',
    name: 'Pepperoni Premium',
    description: 'Irresistível! Fatias generosas de pepperoni italiano sobre mussarela cremosa. Um clássico americano.',
    basePrice: 38.90,
    price: 38.90,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
    category: 'Carnes',
    popular: true,
    ingredients: ['pepperoni', 'mussarela', 'molho de tomate'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 38.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 48.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 58.90, slices: 8 }
    }
  },
  {
    id: '3',
    name: 'Quatro Queijos Gourmet',
    description: 'Para os amantes de queijo! Mussarela, parmesão, gorgonzola e provolone. Cremosidade em cada mordida.',
    basePrice: 45.90,
    price: 45.90,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
    category: 'Gourmet',
    ingredients: ['mussarela', 'parmesão', 'gorgonzola', 'provolone'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 45.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 55.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 65.90, slices: 8 }
    }
  },
  {
    id: '4',
    name: 'Calabresa Especial',
    description: 'A favorita do brasileiro! Calabresa defumada, cebola caramelizada e azeitonas. Tradição em cada fatia.',
    basePrice: 36.90,
    price: 36.90,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
    category: 'Clássicas',
    popular: true,
    ingredients: ['calabresa', 'cebola', 'azeitonas', 'mussarela'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 36.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 46.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 56.90, slices: 8 }
    }
  },
  {
    id: '5',
    name: 'Frango com Catupiry',
    description: 'O sabor que todo mundo ama! Frango desfiado temperado com o original Catupiry. Impossível resistir.',
    basePrice: 39.90,
    price: 39.90,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    category: 'Carnes',
    ingredients: ['frango', 'catupiry', 'mussarela', 'milho'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 39.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 49.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 59.90, slices: 8 }
    }
  },
  {
    id: '6',
    name: 'Portuguesa Completa',
    description: 'A mais completa! Presunto, ovos, cebola, azeitonas, ervilha e pimentão. Generosa como você merece.',
    basePrice: 42.90,
    price: 42.90,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
    category: 'Especiais',
    ingredients: ['presunto', 'ovos', 'cebola', 'azeitonas', 'ervilha', 'pimentão'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 42.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 52.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 62.90, slices: 8 }
    }
  },
  {
    id: '7',
    name: 'Veggie Supreme',
    description: 'Saudável e saborosa! Berinjela, abobrinha, pimentão, tomate seco e rúcula. Para quem ama sabores naturais.',
    basePrice: 37.90,
    price: 37.90,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center',
    category: 'Vegetarianas',
    ingredients: ['berinjela', 'abobrinha', 'pimentão', 'tomate seco', 'rúcula'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 37.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 47.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 57.90, slices: 8 }
    }
  },
  {
    id: '8',
    name: 'Bacon Lovers',
    description: 'Para os carnívoros de plantão! Bacon crocante, linguiça calabresa e cheddar derretido. Pura indulgência.',
    basePrice: 46.90,
    price: 46.90,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop&crop=center',
    category: 'Carnes',
    ingredients: ['bacon', 'linguiça', 'cheddar', 'cebola roxa'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 46.90, slices: 4 },
      medium: { name: 'Média (30cm)', price: 56.90, slices: 6 },
      large: { name: 'Grande (35cm)', price: 66.90, slices: 8 }
    }
  }
];

export const categories = [
  'Todas',
  'Clássicas',
  'Carnes',
  'Gourmet',
  'Especiais',
  'Vegetarianas'
];
