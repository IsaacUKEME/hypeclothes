export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
  description: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Graphic Tee',
    price: 45,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isNew: true,
    description: 'Heavyweight cotton oversized tee with bold back graphic. Drop shoulder fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White']
  },
  {
    id: '2',
    name: 'Cargo Parachute Pants',
    price: 85,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    isTrending: true,
    description: 'Wide-leg parachute pants with adjustable toggles at the ankle. Multiple utility pockets.',
    sizes: ['S', 'M', 'L'],
    colors: ['Olive', 'Black', 'Grey']
  },
  {
    id: '3',
    name: 'Chunky Sole Sneakers',
    price: 120,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isTrending: true,
    description: 'Retro-inspired chunky sneakers with mixed material upper and exaggerated sole.',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['White/Green', 'Black']
  },
  {
    id: '4',
    name: 'Distressed Denim Jacket',
    price: 110,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    description: 'Vintage wash denim jacket with heavy distressing and raw hem.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Light Blue', 'Washed Black']
  },
  {
    id: '5',
    name: 'Tech-Knit Beanie',
    price: 25,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    rating: 4.2,
    description: 'Ribbed knit beanie with rubberized logo patch.',
    sizes: ['OS'],
    colors: ['Neon Green', 'Black', 'Orange']
  },
  {
    id: '6',
    name: 'Boxy Zip-Up Hoodie',
    price: 75,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    isNew: true,
    description: 'Ultra-heavyweight zip hoodie with a cropped, boxy fit and double-lined hood.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Heather Grey', 'Black']
  },
  {
    id: '7',
    name: 'Straight Leg Washed Jeans',
    price: 95,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    description: 'Classic straight leg fit with a vintage stone wash finish.',
    sizes: ['30', '32', '34', '36'],
    colors: ['Vintage Blue', 'Black']
  },
  {
    id: '8',
    name: 'Crossbody Utility Bag',
    price: 45,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isTrending: true,
    description: 'Water-resistant nylon crossbody with matte black hardware and adjustable strap.',
    sizes: ['OS'],
    colors: ['Black']
  }
];
