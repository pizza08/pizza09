
import React from 'react';
import { Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about-section" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Expandida */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Sobre o Forno Nobre</h3>
            <p className="text-gray-300 mb-4">
              Há mais de 10 anos servindo as melhores pizzas da cidade. Nossa paixão é criar sabores únicos com ingredientes frescos e da melhor qualidade.
            </p>
            <p className="text-gray-300 mb-4 text-sm">
              <strong className="text-orange-400">Nossa Missão:</strong> Proporcionar momentos especiais através de pizzas artesanais excepcionais.
            </p>
            <p className="text-gray-300 mb-4 text-sm">
              <strong className="text-orange-400">Nossos Valores:</strong> Qualidade, tradição e atendimento personalizado para cada cliente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">(47) 99280-9169</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-1" />
                <span className="text-gray-300">Shopping Balneário – Piso Térreo<br />Av. Santa Catarina, 1 – Balneário Camboriú</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">18h às 00h - Todos os dias</span>
              </div>
            </div>
          </div>

          {/* Diferenciais */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Nossos Diferenciais</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✓</span>
                Massa artesanal fermentada por 24h
              </li>
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✓</span>
                Ingredientes premium importados
              </li>
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✓</span>
                Entrega em 30-45 minutos
              </li>
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✓</span>
                Frete grátis acima de R$ 50
              </li>
              <li className="flex items-center">
                <span className="text-orange-400 mr-2">✓</span>
                Mais de 50.000 clientes satisfeitos
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Newsletter</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Receba nossas promoções e novidades primeiro!
            </p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
              />
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-r-lg">
                OK
              </button>
            </div>
            <p className="text-xs text-gray-400">
              *Prometemos não enviar spam e você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Forno Nobre. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
