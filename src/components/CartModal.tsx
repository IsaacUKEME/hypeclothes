import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Product } from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, newQuantity: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
}

export default function CartModal({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartModalProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-white h-full brutal-border-l flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 brutal-border-b bg-neon">
          <h2 className="font-display text-3xl uppercase tracking-wider">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white brutal-border hover:bg-black hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="font-display text-2xl text-gray-400 uppercase">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="brutal-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex gap-4 brutal-border p-4 relative group">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-24 h-32 object-cover brutal-border"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold font-sans leading-tight pr-8">{item.product.name}</h3>
                    <button 
                      onClick={() => onRemoveItem(item.product.id, item.size, item.color)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Size: {item.size} | Color: {item.color}</p>
                  <p className="font-display text-xl mt-2">${item.product.price}</p>
                  
                  <div className="mt-auto flex items-center gap-4">
                    <div className="flex items-center brutal-border">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="p-1 hover:bg-neon transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="p-1 hover:bg-neon transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 brutal-border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans font-bold uppercase text-lg">Subtotal</span>
              <span className="font-display text-3xl">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full brutal-btn text-xl py-4">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
