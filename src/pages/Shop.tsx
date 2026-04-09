import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
const SIZES = ['S', 'M', 'L', 'XL', 'OS', '8', '9', '10', '11', '12'];
const COLORS = ['Black', 'White', 'Grey', 'Olive', 'Neon Green', 'Orange', 'Light Blue', 'Vintage Blue'];
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popularity'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(200);
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSize, selectedColor, priceRange, sortBy]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort logic
  let filteredProducts = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedSize && !p.sizes.includes(selectedSize)) return false;
    if (selectedColor && !p.colors.includes(selectedColor)) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  filteredProducts.sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Popularity') return b.rating - a.rating;
    return 0; // Newest (default mock order)
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-black pb-6">
        <div>
          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tight leading-none mb-4">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p className="font-sans text-gray-500 font-medium">
            Showing {filteredProducts.length} results
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <button 
            className="md:hidden flex items-center gap-2 brutal-border px-4 py-2 font-bold uppercase"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={20} /> Filters
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 brutal-border px-4 py-2 font-bold uppercase bg-white">
              Sort: {sortBy} <ChevronDown size={20} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white brutal-border hidden group-hover:block z-20">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option}
                  className={`block w-full text-left px-4 py-2 font-bold hover:bg-neon transition-colors ${sortBy === option ? 'bg-black text-white hover:text-black' : ''}`}
                  onClick={() => setSortBy(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Filters Sidebar */}
        <div className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="font-display text-2xl uppercase mb-4">Category</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left font-bold uppercase text-lg transition-colors ${selectedCategory === cat ? 'text-neon underline decoration-black decoration-2 underline-offset-4' : 'text-gray-500 hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-display text-2xl uppercase mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`w-12 h-12 flex items-center justify-center font-bold brutal-border transition-colors ${selectedSize === size ? 'bg-black text-white' : 'bg-white hover:bg-neon'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="font-display text-2xl uppercase mb-4">Color</h3>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={`px-3 py-1 text-sm font-bold uppercase brutal-border transition-colors ${selectedColor === color ? 'bg-black text-white' : 'bg-white hover:bg-neon'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-display text-2xl uppercase mb-4">Max Price: ${priceRange}</h3>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-black"
              />
              <div className="flex justify-between text-sm font-bold mt-2">
                <span>$0</span>
                <span>$200+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="animate-pulse brutal-border bg-gray-100 aspect-[3/4]"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="font-display text-4xl uppercase mb-4">No products found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your filters.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSize(null);
                  setSelectedColor(null);
                  setPriceRange(200);
                }}
                className="mt-8 brutal-btn"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
