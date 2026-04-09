import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

export default function Home() {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden brutal-border-b">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="font-display text-7xl md:text-9xl text-white uppercase tracking-tighter leading-none mb-6 transform -skew-x-6">
            Upgrade Your <br/>
            <span className="text-neon">Style Game</span>
          </h1>
          <p className="font-sans text-xl md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto">
            The latest trends in male fashion. Bold, unapologetic, and ready for the streets.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-neon text-black font-display text-2xl uppercase px-8 py-4 brutal-border hover:bg-white transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Shop Now <ArrowRight size={28} />
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-neon brutal-border-b py-3 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 items-center font-display text-2xl uppercase tracking-wider">
          <span>🔥 Free shipping on orders over $100</span>
          <span>•</span>
          <span>New arrivals dropping every Friday</span>
          <span>•</span>
          <span>🔥 Free shipping on orders over $100</span>
          <span>•</span>
          <span>New arrivals dropping every Friday</span>
          <span>•</span>
          <span>🔥 Free shipping on orders over $100</span>
          <span>•</span>
          <span>New arrivals dropping every Friday</span>
        </div>
      </div>

      {/* Trending Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">Trending <br/><span className="text-neon stroke-black" style={{ WebkitTextStroke: '2px black' }}>Now</span></h2>
          <Link to="/shop?sort=trending" className="hidden md:flex items-center gap-2 font-bold uppercase hover:text-neon transition-colors">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/shop?sort=trending" className="md:hidden mt-8 flex items-center justify-center gap-2 font-bold uppercase brutal-btn w-full">
          View All <ArrowRight size={20} />
        </Link>
      </section>

      {/* Promo Banner */}
      <section className="bg-black text-white brutal-border-y">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center items-start">
            <span className="bg-neon text-black font-bold uppercase px-4 py-1 mb-6 brutal-border">Limited Time</span>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-6">
              Summer <br/>Essentials
            </h2>
            <p className="font-sans text-xl text-gray-300 mb-8 max-w-md">
              Get up to 40% off on selected summer items. Don't miss out on the heat.
            </p>
            <Link to="/shop?category=Summer" className="brutal-btn bg-white text-black hover:bg-neon">
              Shop Sale
            </Link>
          </div>
          <div className="h-[400px] md:h-auto brutal-border-l-0 md:brutal-border-l border-white">
            <img 
              src="https://images.unsplash.com/photo-1516826957135-700ede19c6ce?auto=format&fit=crop&q=80&w=1000" 
              alt="Summer Sale" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">New <br/>Arrivals</h2>
          <Link to="/shop?sort=newest" className="hidden md:flex items-center gap-2 font-bold uppercase hover:text-neon transition-colors">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
