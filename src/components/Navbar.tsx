import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, cartCount }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-display text-3xl tracking-tight uppercase">
              HYPE<span className="text-neon">BOY</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/shop?category=Tops" className="font-sans font-bold uppercase tracking-wider hover:text-neon transition-colors">Tops</Link>
            <Link to="/shop?category=Bottoms" className="font-sans font-bold uppercase tracking-wider hover:text-neon transition-colors">Bottoms</Link>
            <Link to="/shop?category=Footwear" className="font-sans font-bold uppercase tracking-wider hover:text-neon transition-colors">Footwear</Link>
            <Link to="/shop?category=Accessories" className="font-sans font-bold uppercase tracking-wider hover:text-neon transition-colors">Accessories</Link>
          </div>

          {/* Prominent Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for items..." 
                className="w-full brutal-border py-2 pl-4 pr-10 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-neon transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="lg:hidden hover:text-neon transition-colors">
              <Search size={24} />
            </button>
            <button className="hidden md:block hover:text-neon transition-colors">
              <User size={24} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative hover:text-neon transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon text-black text-xs font-bold px-1.5 py-0.5 rounded-full brutal-border">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white brutal-border-b absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <Link to="/shop?category=Tops" className="font-sans font-bold text-xl uppercase tracking-wider py-2 border-b-2 border-black" onClick={() => setIsMobileMenuOpen(false)}>Tops</Link>
            <Link to="/shop?category=Bottoms" className="font-sans font-bold text-xl uppercase tracking-wider py-2 border-b-2 border-black" onClick={() => setIsMobileMenuOpen(false)}>Bottoms</Link>
            <Link to="/shop?category=Footwear" className="font-sans font-bold text-xl uppercase tracking-wider py-2 border-b-2 border-black" onClick={() => setIsMobileMenuOpen(false)}>Footwear</Link>
            <Link to="/shop?category=Accessories" className="font-sans font-bold text-xl uppercase tracking-wider py-2 border-b-2 border-black" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link>
            
            <div className="flex space-x-4 pt-4">
              <button className="flex items-center space-x-2 font-bold uppercase">
                <Search size={20} /> <span>Search</span>
              </button>
              <button className="flex items-center space-x-2 font-bold uppercase">
                <User size={20} /> <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
