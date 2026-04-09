import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Star } from 'lucide-react';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';

interface ProductDetailProps {
  onAddToCart: (product: any, size: string, color: string) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedSize(null);
      setSelectedColor(product.colors[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-6xl uppercase mb-4">Product Not Found</h1>
        <Link to="/shop" className="brutal-btn">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart(product, selectedSize, selectedColor!);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 font-bold uppercase hover:text-neon transition-colors mb-8">
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        {/* Product Image */}
        <div 
          className="relative aspect-[3/4] brutal-border bg-gray-100 overflow-hidden cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-[2]' : 'scale-100'}`}
            style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-neon text-black font-display uppercase px-3 py-1 text-xs brutal-border">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-black text-white font-display uppercase px-3 py-1 text-xs brutal-border">
                Trending
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight leading-none">
              {product.name}
            </h1>
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-3 bg-white brutal-border hover:bg-neon transition-colors flex-shrink-0 ml-4"
            >
              <Heart size={24} className={isWishlisted ? "fill-black" : ""} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-4xl">${product.price}</span>
            <div className="flex items-center gap-1 text-neon bg-black px-2 py-1 brutal-border">
              <Star size={16} className="fill-neon" />
              <span className="font-bold text-sm">{product.rating}</span>
            </div>
          </div>

          <p className="font-sans text-lg text-gray-600 mb-8 border-b-2 border-black pb-8">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-2xl uppercase">Color</h3>
              <span className="font-bold text-gray-500">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 font-bold uppercase brutal-border transition-colors ${selectedColor === color ? 'bg-black text-white' : 'bg-white hover:bg-neon'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-2xl uppercase">Size</h3>
              <button className="font-bold text-gray-500 underline hover:text-black">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-14 flex items-center justify-center font-bold text-lg brutal-border transition-colors ${selectedSize === size ? 'bg-black text-white' : 'bg-white hover:bg-neon'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-red-500 font-bold mt-2 text-sm">Please select a size</p>
            )}
          </div>

          <button 
            onClick={handleAddToCart}
            className="brutal-btn w-full text-2xl py-5 mt-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t-2 border-black pt-16">
          <h2 className="font-display text-5xl uppercase tracking-tight mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
