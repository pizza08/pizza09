
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Clock, MapPin } from 'lucide-react';
import WhatsAppOrder from './WhatsAppOrder';

interface HeaderProps {
  cartItemCount: number;
}

const Header = ({ cartItemCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Barra de Informações Importantes */}
      <div className="bg-orange-500 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Entrega: 30-45min</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Frete GRÁTIS acima de R$ 50</span>
          </div>
          <div className="font-semibold">📞 (47) 99280-9169</div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/e70ae742-0551-4158-90f5-1f8aee0f479e.png" 
                alt="Forno Nobre Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold text-gray-800">Forno Nobre</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium transition-colors ${location.pathname === '/' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                Início
              </Link>
              <Link to="/menu" className={`font-medium transition-colors ${location.pathname === '/menu' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                Cardápio
              </Link>
              <Link to="/contact" className={`font-medium transition-colors ${location.pathname === '/contact' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                Contato
              </Link>
              <button 
                onClick={scrollToAbout}
                className="font-medium text-gray-700 hover:text-orange-500 transition-colors"
              >
                Sobre
              </button>
            </nav>

            {/* CTAs Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <WhatsAppOrder text="Pedir via WhatsApp" className="px-4 py-2 text-sm" />
              
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/" className="block font-medium text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Início
              </Link>
              <Link to="/menu" className="block font-medium text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Cardápio
              </Link>
              <Link to="/contact" className="block font-medium text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
              <button 
                onClick={scrollToAbout}
                className="block font-medium text-gray-700 hover:text-orange-500 transition-colors text-left"
              >
                Sobre
              </button>
              <Link to="/cart" className="flex items-center font-medium text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Carrinho {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
              <WhatsAppOrder text="🍕 Pedir via WhatsApp" className="w-full justify-center py-3" />
            </div>
          </div>}
      </header>
    </>
  );
};

export default Header;
