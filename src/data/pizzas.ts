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
  // 10 Pizzas Tradicionais - Médio e Grande
  {
    id: '1',
    name: 'Margherita',
    description: 'A clássica italiana com molho de tomate, mussarela e manjericão fresco.',
    basePrice: 35.00,
    price: 35.00,
    rating: 4.8,
    image: '/lovable-uploads/da1bfc92-183f-4824-8252-8659edf59b84.png',
    category: 'Tradicionais',
    popular: true,
    ingredients: ['mussarela', 'tomate', 'manjericão'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 28.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 35.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 45.00, slices: 8 }
    }
  },
  {
    id: '2',
    name: 'Calabresa',
    description: 'Calabresa defumada, cebola e azeitonas sobre mussarela.',
    basePrice: 38.00,
    price: 38.00,
    rating: 4.7,
    image: '/lovable-uploads/b961fbfe-0549-4b81-ab07-ae70ae60ea7c.png',
    category: 'Tradicionais',
    popular: true,
    ingredients: ['calabresa', 'cebola', 'azeitonas', 'mussarela'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 30.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 38.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 48.00, slices: 8 }
    }
  },
  {
    id: '3',
    name: 'Pepperoni',
    description: 'Pepperoni italiano sobre mussarela cremosa.',
    basePrice: 42.00,
    price: 42.00,
    rating: 4.9,
    image: '/lovable-uploads/3a62ede2-6346-49a0-853c-f66f565cb068.png',
    category: 'Tradicionais',
    popular: true,
    ingredients: ['pepperoni', 'mussarela'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 33.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 42.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 52.00, slices: 8 }
    }
  },
  {
    id: '4',
    name: 'Frango com Catupiry',
    description: 'Frango desfiado temperado com o original Catupiry.',
    basePrice: 40.00,
    price: 40.00,
    rating: 4.8,
    image: '/lovable-uploads/29ff1d73-c14b-4752-887e-36d57da30f20.png',
    category: 'Tradicionais',
    ingredients: ['frango', 'catupiry', 'mussarela'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 32.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 40.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 50.00, slices: 8 }
    }
  },
  {
    id: '5',
    name: 'Portuguesa',
    description: 'Presunto, ovos, cebola, azeitonas, ervilha e pimentão.',
    basePrice: 44.00,
    price: 44.00,
    rating: 4.6,
    image: '/lovable-uploads/34a95641-9469-4c85-a7ab-92c446378e0e.png',
    category: 'Tradicionais',
    ingredients: ['presunto', 'ovos', 'cebola', 'azeitonas', 'ervilha', 'pimentão'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 35.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 44.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 54.00, slices: 8 }
    }
  },
  {
    id: '6',
    name: 'Quatro Queijos',
    description: 'Mussarela, parmesão, gorgonzola e provolone.',
    basePrice: 46.00,
    price: 46.00,
    rating: 4.7,
    image: '/lovable-uploads/77df0bee-998a-4f21-9d4e-fc611504eaac.png',
    category: 'Tradicionais',
    ingredients: ['mussarela', 'parmesão', 'gorgonzola', 'provolone'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 37.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 46.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 56.00, slices: 8 }
    }
  },
  {
    id: '7',
    name: 'Bacon',
    description: 'Bacon crocante sobre mussarela cremosa.',
    basePrice: 41.00,
    price: 41.00,
    rating: 4.5,
    image: '/lovable-uploads/848b9fa8-f7ff-4272-9ddf-07edb815c4c4.png',
    category: 'Tradicionais',
    ingredients: ['bacon', 'mussarela'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 33.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 41.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 51.00, slices: 8 }
    }
  },
  {
    id: '8',
    name: 'Vegetariana',
    description: 'Berinjela, abobrinha, pimentão, tomate e rúcula.',
    basePrice: 39.00,
    price: 39.00,
    rating: 4.4,
    image: '/lovable-uploads/a28dffad-6aa1-4424-b36a-e5f43b172d4e.png',
    category: 'Tradicionais',
    ingredients: ['berinjela', 'abobrinha', 'pimentão', 'tomate', 'rúcula'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 31.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 39.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 49.00, slices: 8 }
    }
  },
  {
    id: '9',
    name: 'Atum',
    description: 'Atum, cebola, azeitonas e mussarela.',
    basePrice: 43.00,
    price: 43.00,
    rating: 4.3,
    image: '/lovable-uploads/84e8184f-d32c-4c82-8508-011786adef80.png',
    category: 'Tradicionais',
    ingredients: ['atum', 'cebola', 'azeitonas', 'mussarela'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 34.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 43.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 53.00, slices: 8 }
    }
  },
  {
    id: '10',
    name: 'Mussarela',
    description: 'A clássica pizza de mussarela com molho de tomate.',
    basePrice: 32.00,
    price: 32.00,
    rating: 4.5,
    image: '/lovable-uploads/f787afc6-78ac-44ba-b9e8-ff6ff6462c44.png',
    category: 'Tradicionais',
    ingredients: ['mussarela', 'molho de tomate'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 25.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 32.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 42.00, slices: 8 }
    }
  },

  // 8 Pizzas Doces Gourmet
  {
    id: '11',
    name: 'M&M Supreme',
    description: 'Chocolate cremoso, M&M coloridos e chantilly. Pura diversão!',
    basePrice: 48.00,
    price: 48.00,
    rating: 4.9,
    image: '/lovable-uploads/2fe55636-6e37-49bd-a4dc-ad12e409a491.png',
    category: 'Doces',
    popular: true,
    ingredients: ['chocolate', 'M&M', 'chantilly'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 38.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 48.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 58.00, slices: 8 }
    }
  },
  {
    id: '12',
    name: 'Nutella com Morango',
    description: 'Nutella cremosa com morangos frescos e leite condensado.',
    basePrice: 52.00,
    price: 52.00,
    rating: 4.8,
    image: '/lovable-uploads/d63fa0a8-fbca-47e7-b19d-1ccc8f0e4db6.png',
    category: 'Doces',
    popular: true,
    ingredients: ['nutella', 'morangos', 'leite condensado'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 42.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 52.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 62.00, slices: 8 }
    }
  },
  {
    id: '13',
    name: 'Chocolate Branco',
    description: 'Chocolate branco derretido com coco ralado e cerejas.',
    basePrice: 45.00,
    price: 45.00,
    rating: 4.6,
    image: '/lovable-uploads/0f1ad279-94da-458c-9416-fa7e12d11c09.png',
    category: 'Doces',
    ingredients: ['chocolate branco', 'coco', 'cerejas'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 36.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 45.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 55.00, slices: 8 }
    }
  },
  {
    id: '14',
    name: 'Brigadeiro',
    description: 'Chocolate ao leite, granulado e leite condensado. Nostalgia brasileira!',
    basePrice: 44.00,
    price: 44.00,
    rating: 4.7,
    image: '/lovable-uploads/f06b10fa-82fe-49e9-a6b7-04374b407dd1.png',
    category: 'Doces',
    ingredients: ['chocolate ao leite', 'granulado', 'leite condensado'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 35.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 44.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 54.00, slices: 8 }
    }
  },
  {
    id: '15',
    name: 'Romeu e Julieta',
    description: 'Queijo cremoso com goiabada derretida. Clássico brasileiro!',
    basePrice: 41.00,
    price: 41.00,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1603575448878-30d5c6b88e7f?w=500&h=400&fit=crop&crop=center&auto=format&q=80',
    category: 'Doces',
    ingredients: ['queijo', 'goiabada'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 33.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 41.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 51.00, slices: 8 }
    }
  },
  {
    id: '16',
    name: 'Banana com Canela',
    description: 'Banana caramelizada, canela e açúcar cristal.',
    basePrice: 38.00,
    price: 38.00,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500&h=400&fit=crop&crop=center&auto=format&q=80',
    category: 'Doces',
    ingredients: ['banana', 'canela', 'açúcar cristal'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 30.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 38.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 48.00, slices: 8 }
    }
  },
  {
    id: '17',
    name: 'Prestígio',
    description: 'Chocolate, coco ralado e leite condensado. Sabor irresistível!',
    basePrice: 46.00,
    price: 46.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&h=400&fit=crop&crop=center&auto=format&q=80',
    category: 'Doces',
    ingredients: ['chocolate', 'coco', 'leite condensado'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 37.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 46.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 56.00, slices: 8 }
    }
  },
  {
    id: '18',
    name: 'Chocolate com Morango',
    description: 'Chocolate cremoso com morangos frescos e chantilly.',
    basePrice: 49.00,
    price: 49.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop&crop=center&auto=format&q=80',
    category: 'Doces',
    ingredients: ['chocolate', 'morangos', 'chantilly'],
    sizes: {
      small: { name: 'Pequena (25cm)', price: 39.00, slices: 4 },
      medium: { name: 'Média (30cm)', price: 49.00, slices: 6 },
      large: { name: 'Grande (35cm)', price: 59.00, slices: 8 }
    }
  }
];

export const categories = [
  'Todas',
  'Tradicionais',
  'Doces'
];
