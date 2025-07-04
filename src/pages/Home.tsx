
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star } from 'lucide-react';
import WhatsAppOrder from '../components/WhatsAppOrder';
import LeadCaptureModal from '../components/LeadCaptureModal';
import CartRecoverySystem from '../components/CartRecoverySystem';
import { useLeadCapture } from '../hooks/useLeadCapture';
import { pizzas } from '../data/pizzas';

const Home = () => {
  const { showLeadModal, customerData, isPersonalized, handleLeadCaptured, closeLeadModal } = useLeadCapture();
  // Buscar pizzas mais populares do banco de dados
  const popularPizzas = pizzas
    .filter(p => p.popular || p.rating >= 4.7)
    .slice(0, 3)
    .map(pizza => ({
      name: pizza.name,
      price: pizza.price,
      description: pizza.description,
      image: pizza.image
    }));

  // Se não houver pizzas populares suficientes, pegar as primeiras 3
  const displayPizzas = popularPizzas.length >= 3 ? popularPizzas : pizzas.slice(0, 3).map(pizza => ({
    name: pizza.name,
    price: pizza.price,
    description: pizza.description,
    image: pizza.image
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section Simplificado */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            {isPersonalized ? `Olá ${customerData.name}! ` : ''}As Melhores Pizzas
            <span className="text-orange-500 block">da Região</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pizzas artesanais feitas com ingredientes frescos e muito amor. 
            Entrega rápida na sua casa!
          </p>

          {/* Informações Importantes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Entrega Rápida</h3>
              <p className="text-gray-600">30-45 minutos</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Frete Grátis</h3>
              <p className="text-gray-600">Acima de R$ 50</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Star className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Top Avaliado</h3>
              <p className="text-gray-600">4.8/5 estrelas</p>
            </div>
          </div>

          {/* CTAs Principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <WhatsAppOrder 
              text="Pedir via WhatsApp"
              className="text-lg px-8 py-4"
            />
            
            <Link 
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              🍕 Ver Cardápio Completo
            </Link>
          </div>

          {/* Preview Rápido das Pizzas Populares */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pizzas Mais Pedidas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayPizzas.map((pizza, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-orange-100"
                  />
                  <h3 className="font-semibold text-lg text-gray-800">{pizza.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{pizza.description}</p>
                  <p className="text-orange-600 font-bold text-xl mb-3">
                    R$ {pizza.price.toFixed(2).replace('.', ',')}
                  </p>
                  <WhatsAppOrder 
                    variant="quick"
                    text="Pedir Agora"
                    pizzaName={pizza.name}
                    pizzaPrice={pizza.price}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modais e sistemas */}
      <LeadCaptureModal 
        isOpen={showLeadModal}
        onClose={closeLeadModal}
        onLeadCaptured={handleLeadCaptured}
      />
      <CartRecoverySystem />
    </div>
  );
};

export default Home;
