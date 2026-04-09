import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../data/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div 
      className="group relative flex flex-col brutal-border bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-4 right-4 z-10 p-2 bg-white brutal-border hover:bg-neon transition-colors"
      >
        <Heart 
          size={20} 
          className={isWishlisted ? "fill-black" : ""} 
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden brutal-border-b bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="font-sans font-bold text-lg leading-tight group-hover:text-neon transition-colors line-clamp-2">
            {product.name}
          </Link>
          <span className="font-display text-xl ml-4">${product.price}</span>
        </div>
        <p className="text-gray-500 font-medium text-sm uppercase tracking-wider mt-auto pt-4">
          {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
