/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartModal, { CartItem } from './components/CartModal';
import { Product } from './data/mockData';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }

      return [...prev, { product, quantity: 1, size, color }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        (item.product.id === productId && item.size === size && item.color === color)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    setCartItems(prev => 
      prev.filter(item => 
        !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-black font-sans selection:bg-neon selection:text-black">
        <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          </Routes>
        </main>

        <Footer />

        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </Router>
  );
}

