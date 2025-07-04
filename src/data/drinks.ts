
export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'refrigerante' | 'suco' | 'cerveja' | 'agua';
  size?: string;
  popular?: boolean;
}

export const drinks: Drink[] = [
  // Refrigerantes
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'Refrigerante de cola tradicional, gelado e refrescante.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '350ml',
    popular: true
  },
  {
    id: 'guarana',
    name: 'Guaraná Antarctica',
    description: 'O sabor genuinamente brasileiro do guaraná.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1624517452488-04f6135a0a0b?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '350ml',
    popular: true
  },
  {
    id: 'sprite',
    name: 'Sprite',
    description: 'Refrigerante de limão refrescante e cítrico.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '350ml'
  },
  {
    id: 'fanta',
    name: 'Fanta Laranja',
    description: 'Refrigerante sabor laranja doce e refrescante.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '350ml'
  },

  // Sucos
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja',
    description: 'Suco natural de laranja, rico em vitamina C.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center',
    category: 'suco',
    size: '300ml',
    popular: true
  },
  {
    id: 'suco-uva',
    name: 'Suco de Uva',
    description: 'Suco integral de uva tinto, doce e nutritivo.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
    category: 'suco',
    size: '300ml'
  },
  {
    id: 'suco-maracuja',
    name: 'Suco de Maracujá',
    description: 'Suco refrescante de maracujá com sabor tropical.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=300&h=300&fit=crop&crop=center',
    category: 'suco',
    size: '300ml'
  },

  // Cervejas
  {
    id: 'heineken',
    name: 'Heineken',
    description: 'Cerveja premium holandesa com sabor único.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=300&fit=crop&crop=center',
    category: 'cerveja',
    size: '330ml',
    popular: true
  },
  {
    id: 'skol',
    name: 'Skol',
    description: 'Cerveja pilsen brasileira, leve e refrescante.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
    category: 'cerveja',
    size: '350ml'
  },
  {
    id: 'brahma',
    name: 'Brahma',
    description: 'A cerveja que desce redondo, sabor marcante.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=300&fit=crop&crop=center',
    category: 'cerveja',
    size: '350ml'
  },

  // Águas
  {
    id: 'agua-crystal',
    name: 'Água Crystal',
    description: 'Água mineral natural cristalina.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1560963604-6e9e3e4b3050?w=300&h=300&fit=crop&crop=center',
    category: 'agua',
    size: '500ml'
  },
  {
    id: 'agua-gas',
    name: 'Água com Gás',
    description: 'Água mineral gaseificada refrescante.',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop&crop=center',
    category: 'agua',
    size: '500ml'
  }
];

export const drinkCategories = [
  { id: 'todas', name: 'Todas', count: drinks.length },
  { id: 'refrigerante', name: 'Refrigerantes', count: drinks.filter(d => d.category === 'refrigerante').length },
  { id: 'suco', name: 'Sucos', count: drinks.filter(d => d.category === 'suco').length },
  { id: 'cerveja', name: 'Cervejas', count: drinks.filter(d => d.category === 'cerveja').length },
  { id: 'agua', name: 'Águas', count: drinks.filter(d => d.category === 'agua').length }
];
