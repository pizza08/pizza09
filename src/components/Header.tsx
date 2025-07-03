import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
interface HeaderProps {
  cartItemCount?: number;
}
const Header = ({
  cartItemCount = 0
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="relative">
              <Crown className="w-8 h-8 text-orange-500" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Forno Nobre</h1>
              <p className="text-xs text-orange-500">Delivery Premium</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Início
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Cardápio
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Sobre
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Contato
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>}
            </Link>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Início
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Cardápio
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Sobre
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
            </div>
          </nav>}
      </div>
    </header>;
};
export default Header;