import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 brutal-border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-display text-4xl tracking-tight uppercase mb-4 block">
              HYPE<span className="text-neon">BOY</span>
            </Link>
            <p className="font-sans text-gray-400 max-w-md">
              Upgrade your style game. The ultimate destination for modern, bold, and trendy male fashion.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-xl uppercase tracking-wider mb-4 text-neon">Shop</h3>
            <ul className="space-y-2 font-sans font-medium text-gray-300">
              <li><Link to="/shop?category=Tops" className="hover:text-white transition-colors">Tops</Link></li>
              <li><Link to="/shop?category=Bottoms" className="hover:text-white transition-colors">Bottoms</Link></li>
              <li><Link to="/shop?category=Footwear" className="hover:text-white transition-colors">Footwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl uppercase tracking-wider mb-4 text-neon">Help</h3>
            <ul className="space-y-2 font-sans font-medium text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t-2 border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-sans text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HYPEBOY. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-neon transition-colors font-bold uppercase text-sm">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-neon transition-colors font-bold uppercase text-sm">TikTok</a>
            <a href="#" className="text-gray-500 hover:text-neon transition-colors font-bold uppercase text-sm">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
