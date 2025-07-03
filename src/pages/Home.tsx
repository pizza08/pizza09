
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, Shield, Star } from 'lucide-react';
import PizzaCard from '../components/PizzaCard';
import { pizzas } from '../data/pizzas';
import { useCart } from '../contexts/CartContext';

const Home = () => {
  const { dispatch } = useCart();

  const handleAddToCart = (pizza: any) => {
    dispatch({ type: 'ADD_ITEM', payload: pizza });
  };

  const featuredPizzas = pizzas.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                A Melhor Pizza
                <span className="block text-yellow-200">da Cidade!</span>
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                Ingredientes frescos, massa artesanal e sabores únicos. 
                Entregamos felicidade na sua porta em até 30 minutos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/menu"
                  className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center group"
                >
                  Ver Cardápio
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-500 transition-colors">
                  (11) 9999-9999
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-20 blur-3xl"></div>
              <img 
                src="/lovable-uploads/5f13c750-242a-42a7-9fa5-c4f873116f03.png" 
                alt="Pizza Royal Logo"
                className="relative z-10 w-64 h-64 mx-auto object-contain drop-shadow-2xl animate-pulse"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Sua pizza chega quentinha em até 30 minutos</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Ingredientes frescos e selecionados diariamente</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Delivery gratuito para pedidos acima de R$ 40</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossas Especialidades</h2>
            <p className="text-xl text-gray-600">Sabores únicos que conquistaram nossa cidade</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredPizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                {...pizza}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors inline-flex items-center group"
            >
              Ver Cardápio Completo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <div className="flex justify-center items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-current text-yellow-300" />
              ))}
              <span className="ml-2 text-xl font-semibold">4.8/5</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-orange-800 font-bold">
                  M
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Maria Silva</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-orange-100">
                "Melhor pizza da região! Massa crocante, ingredientes frescos e entrega super rápida. Virei cliente fiel!"
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-orange-800 font-bold">
                  J
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">João Santos</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-orange-100">
                "Atendimento impecável e sabor incrível! A Margherita Real é simplesmente perfeita."
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-orange-800 font-bold">
                  A
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Ana Costa</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-orange-100">
                "Pedido sempre chega no tempo certo e quentinho. Recomendo demais a Pizza Royal!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
