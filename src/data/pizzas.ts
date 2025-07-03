
export interface Pizza {
  id: string;
  name: string;
  description: string;
  basePrice: number;
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

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita Suprema',
    description: 'A clássica que conquistou o mundo! Molho de tomate artesanal, mussarela derretida e manjericão fresco.',
    basePrice: 32.90,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    category: 'Clássicas',
    popular: true,
    ingredients: ['Mussarela', 'Tomate', 'Manjericão', 'Azeite'],
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
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
    category: 'Carnes',
    popular: true,
    ingredients: ['Pepperoni', 'Mussarela', 'Molho de tomate'],
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
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
    category: 'Gourmet',
    ingredients: ['Mussarela', 'Parmesão', 'Gorgonzola', 'Provolone'],
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
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
    category: 'Clássicas',
    popular: true,
    ingredients: ['Calabresa', 'Cebola', 'Azeitonas', 'Mussarela'],
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
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    category: 'Carnes',
    ingredients: ['Frango', 'Catupiry', 'Mussarela', 'Milho'],
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
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
    category: 'Especiais',
    ingredients: ['Presunto', 'Ovos', 'Cebola', 'Azeitonas', 'Ervilha', 'Pimentão'],
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
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center',
    category: 'Vegetarianas',
    ingredients: ['Berinjela', 'Abobrinha', 'Pimentão', 'Tomate seco', 'Rúcula'],
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
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop&crop=center',
    category: 'Carnes',
    ingredients: ['Bacon', 'Linguiça', 'Cheddar', 'Cebola roxa'],
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
