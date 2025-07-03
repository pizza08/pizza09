
export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita Real',
    description: 'Molho de tomate, mozzarella de búfala, manjericão fresco e azeite extra virgem',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=300&fit=crop',
    rating: 4.8,
    category: 'Clássicas'
  },
  {
    id: '2',
    name: 'Pepperoni Suprema',
    description: 'Molho especial, mozzarella, pepperoni premium e orégano',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=300&fit=crop',
    rating: 4.9,
    category: 'Carnes'
  },
  {
    id: '3',
    name: 'Quatro Queijos Nobre',
    description: 'Mozzarella, gorgonzola, parmesão, provolone e nozes',
    price: 58.90,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=300&fit=crop',
    rating: 4.7,
    category: 'Queijos'
  },
  {
    id: '4',
    name: 'Calabresa Premium',
    description: 'Molho de tomate, mozzarella, calabresa artesanal, cebola roxa e azeitonas',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop',
    rating: 4.6,
    category: 'Carnes'
  },
  {
    id: '5',
    name: 'Vegetariana Deluxe',
    description: 'Molho pesto, mozzarella, abobrinha, berinjela, pimentão, tomate cereja',
    price: 46.90,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=300&fit=crop',
    rating: 4.5,
    category: 'Vegetarianas'
  },
  {
    id: '6',
    name: 'Frango Royal',
    description: 'Molho branco, mozzarella, frango desfiado, catupiry, milho e batata palha',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&h=300&fit=crop',
    rating: 4.8,
    category: 'Carnes'
  },
  {
    id: '7',
    name: 'Portuguesa Tradicional',
    description: 'Molho de tomate, mozzarella, presunto, ovos, cebola, azeitonas e orégano',
    price: 51.90,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&h=300&fit=crop',
    rating: 4.4,
    category: 'Clássicas'
  },
  {
    id: '8',
    name: 'Napolitana Especial',
    description: 'Molho de tomate, mozzarella, tomate, parmesão e manjericão',
    price: 47.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
    rating: 4.6,
    category: 'Clássicas'
  }
];

export const categories = ['Todas', 'Clássicas', 'Carnes', 'Queijos', 'Vegetarianas'];
