
export interface PizzaSize {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  category: 'cheese' | 'meat' | 'vegetable' | 'sauce';
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  ingredients: string[];
}

export const pizzaSizes: PizzaSize[] = [
  {
    id: 'small',
    name: 'Pequena',
    multiplier: 0.8,
    description: '25cm - 4 pedaços'
  },
  {
    id: 'medium',
    name: 'Média',
    multiplier: 1,
    description: '30cm - 6 pedaços'
  },
  {
    id: 'large',
    name: 'Grande',
    multiplier: 1.3,
    description: '35cm - 8 pedaços'
  },
  {
    id: 'family',
    name: 'Família',
    multiplier: 1.6,
    description: '40cm - 12 pedaços'
  }
];

export const availableIngredients: Ingredient[] = [
  // Queijos
  { id: 'mozzarella', name: 'Mozzarella Extra', price: 3.50, category: 'cheese' },
  { id: 'gorgonzola', name: 'Gorgonzola', price: 4.00, category: 'cheese' },
  { id: 'parmesao', name: 'Parmesão', price: 3.50, category: 'cheese' },
  { id: 'catupiry', name: 'Catupiry', price: 4.50, category: 'cheese' },
  
  // Carnes
  { id: 'pepperoni', name: 'Pepperoni', price: 5.00, category: 'meat' },
  { id: 'calabresa', name: 'Calabresa', price: 4.50, category: 'meat' },
  { id: 'frango', name: 'Frango Desfiado', price: 4.00, category: 'meat' },
  { id: 'presunto', name: 'Presunto', price: 3.50, category: 'meat' },
  { id: 'bacon', name: 'Bacon', price: 5.50, category: 'meat' },
  
  // Vegetais
  { id: 'tomate', name: 'Tomate', price: 2.00, category: 'vegetable' },
  { id: 'cebola', name: 'Cebola', price: 1.50, category: 'vegetable' },
  { id: 'azeitonas', name: 'Azeitonas', price: 2.50, category: 'vegetable' },
  { id: 'pimentao', name: 'Pimentão', price: 2.00, category: 'vegetable' },
  { id: 'cogumelos', name: 'Cogumelos', price: 3.00, category: 'vegetable' },
  { id: 'milho', name: 'Milho', price: 1.50, category: 'vegetable' },
  
  // Molhos
  { id: 'molho-extra', name: 'Molho Extra', price: 1.00, category: 'sauce' },
  { id: 'molho-pesto', name: 'Molho Pesto', price: 2.50, category: 'sauce' }
];

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita Real',
    description: 'Molho de tomate, mozzarella de búfala, manjericão fresco e azeite extra virgem',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=300&fit=crop',
    rating: 4.8,
    category: 'Clássicas',
    ingredients: ['mozzarella', 'tomate', 'molho-extra']
  },
  {
    id: '2',
    name: 'Pepperoni Suprema',
    description: 'Molho especial, mozzarella, pepperoni premium e orégano',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=300&fit=crop',
    rating: 4.9,
    category: 'Carnes',
    ingredients: ['mozzarella', 'pepperoni', 'molho-extra']
  },
  {
    id: '3',
    name: 'Quatro Queijos Nobre',
    description: 'Mozzarella, gorgonzola, parmesão, provolone e nozes',
    price: 58.90,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=300&fit=crop',
    rating: 4.7,
    category: 'Queijos',
    ingredients: ['mozzarella', 'gorgonzola', 'parmesao']
  },
  {
    id: '4',
    name: 'Calabresa Premium',
    description: 'Molho de tomate, mozzarella, calabresa artesanal, cebola roxa e azeitonas',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop',
    rating: 4.6,
    category: 'Carnes',
    ingredients: ['mozzarella', 'calabresa', 'cebola', 'azeitonas']
  },
  {
    id: '5',
    name: 'Vegetariana Deluxe',
    description: 'Molho pesto, mozzarella, abobrinha, berinjela, pimentão, tomate cereja',
    price: 46.90,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=300&fit=crop',
    rating: 4.5,
    category: 'Vegetarianas',
    ingredients: ['mozzarella', 'pimentao', 'tomate', 'molho-pesto']
  },
  {
    id: '6',
    name: 'Frango Royal',
    description: 'Molho branco, mozzarella, frango desfiado, catupiry, milho e batata palha',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&h=300&fit=crop',
    rating: 4.8,
    category: 'Carnes',
    ingredients: ['mozzarella', 'frango', 'catupiry', 'milho']
  },
  {
    id: '7',
    name: 'Portuguesa Tradicional',
    description: 'Molho de tomate, mozzarella, presunto, ovos, cebola, azeitonas e orégano',
    price: 51.90,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&h=300&fit=crop',
    rating: 4.4,
    category: 'Clássicas',
    ingredients: ['mozzarella', 'presunto', 'cebola', 'azeitonas']
  },
  {
    id: '8',
    name: 'Napolitana Especial',
    description: 'Molho de tomate, mozzarella, tomate, parmesão e manjericão',
    price: 47.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
    rating: 4.6,
    category: 'Clássicas',
    ingredients: ['mozzarella', 'tomate', 'parmesao']
  }
];

export const categories = ['Todas', 'Clássicas', 'Carnes', 'Queijos', 'Vegetarianas'];
