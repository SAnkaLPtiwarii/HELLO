'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Menu } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';

const MobileApp = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('explore');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      const dummyProducts = [
        { id: 1, title: 'Fresh Fruits & Vegetable', imageSrc: '/images/fruits.jpg' },
        { id: 2, title: 'Cooking Oil & Ghee', imageSrc: '/images/oil.jpg' },
        { id: 3, title: 'Meat & Fish', imageSrc: '/images/meat.jpg' },
        { id: 4, title: 'Bakery & Snacks', imageSrc: '/images/snacks.jpg' },
        { id: 5, title: 'Dairy & Eggs', imageSrc: '/images/dairy.jpg' },
        { id: 6, title: 'Beverages', imageSrc: '/images/drinks.jpg' },
      ];
      setProducts(dummyProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Load cart and favorites from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setCart(savedCart);
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    // Save cart and favorites to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [cart, favorites]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
    toast.success('Added to cart!');
  }, []);

  const addToFavorites = useCallback((product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
    toast.success('Added to favorites!');
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Discover Products</h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                  onAddToFavorites={() => addToFavorites(product)}
                />
              ))}
            </div>
          </>
        );
      case 'cart':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                  {item.title}
                </div>
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>
        );
      case 'favorites':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Favorites</h2>
            {favorites.length > 0 ? (
              favorites.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                  {item.title}
                </div>
              ))
            ) : (
              <p className="text-gray-600">You haven&apos;t added any favorites yet.</p>
            )}
          </div>
        );
      default:
        return <div>Coming Soon</div>;
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            VSell
          </h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            className="transition-transform duration-200 hover:scale-110 focus:outline-none"
          >
            <Menu size={24} className="text-gray-800" />
          </button>
        </div>
      </header>

      {/* Search bar */}
      <div className="px-4 py-3 bg-white shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Discover amazing products..."
            className="w-full py-2 px-4 pr-10 rounded-full border-2 border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-gray-50 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow p-4 overflow-y-auto pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto">
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Toast notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MobileApp;