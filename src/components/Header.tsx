
import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileCartDrawer from './MobileCartDrawer';
import { useIsMobile } from '../hooks/use-mobile';

interface HeaderProps {
  cartItemCount?: number;
}

const Header = ({ cartItemCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleWhatsAppContact = () => {
    const phone = "5511999999999"; // Substitua pelo número real
    const message = "Olá! Gostaria de fazer um pedido de pizza 🍕";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Banner de Informações Importantes */}
      <div className="bg-green-600 text-white py-2 text-center text-sm font-medium">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Entrega 25-35min</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <button 
              onClick={handleWhatsAppContact}
              className="hover:underline font-semibold"
            >
              (11) 99999-9999
            </button>
          </div>
        </div>
      </div>

      {/* Frete Grátis Banner */}
      <div className="bg-orange-500 text-white py-3 text-center font-bold">
        <div className="container mx-auto px-4">
          🚚 FRETE GRÁTIS acima de R$ 40,00 • Peça já!
        </div>
      </div>

      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <div className="relative">
                <img src="/lovable-uploads/5f13c750-242a-42a7-9fa5-c4f873116f03.png" alt="Forno Nobre Logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Forno Nobre</h1>
                <p className="text-xs text-orange-500">Pizzaria Delivery</p>
              </div>
            </Link>

            {/* Desktop Navigation - Simplificado */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Início
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Cardápio
              </Link>
            </nav>

            {/* Ações do Header */}
            <div className="flex items-center space-x-3">
              {/* WhatsApp Button - Proeminente */}
              <button
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Pedir WhatsApp</span>
              </button>

              {/* Cart */}
              {isMobile ? (
                <MobileCartDrawer cartItemCount={cartItemCount} />
              ) : (
                <Link to="/cart" className="relative p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Simplificado */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to="/menu" 
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cardápio
                </Link>
                <button
                  onClick={() => {
                    handleWhatsAppContact();
                    setIsMenuOpen(false);
                  }}
                  className="text-green-600 hover:text-green-700 transition-colors font-medium py-2 text-left"
                >
                  📱 Pedir via WhatsApp
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
