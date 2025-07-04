

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'refrigerante' | 'suco' | 'agua';
  size?: string;
  popular?: boolean;
}

export const drinks: Drink[] = [
  // Refrigerantes 2L
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola',
    description: 'Refrigerante de cola tradicional, gelado e refrescante.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '2L',
    popular: true
  },
  {
    id: 'guarana-2l',
    name: 'Guaraná Antarctica',
    description: 'O sabor genuinamente brasileiro do guaraná.',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1624517452488-04f6135a0a0b?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '2L',
    popular: true
  },
  {
    id: 'sprite-2l',
    name: 'Sprite',
    description: 'Refrigerante de limão refrescante e cítrico.',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '2L'
  },
  {
    id: 'fanta-2l',
    name: 'Fanta Laranja',
    description: 'Refrigerante sabor laranja doce e refrescante.',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center',
    category: 'refrigerante',
    size: '2L'
  },

  // Suco - apenas laranja
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
  { id: 'agua', name: 'Águas', count: drinks.filter(d => d.category === 'agua').length }
];

