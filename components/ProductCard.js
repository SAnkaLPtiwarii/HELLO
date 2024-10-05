import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ title, imageSrc, onAddToCart, onAddToFavorites }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
        <div className="relative overflow-hidden">
            <img
                src={imageSrc}
                alt={title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <button
                onClick={onAddToFavorites}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-purple-100 transition-colors duration-300"
                aria-label="Add to favorites"
            >
                <Heart size={20} className="text-purple-600" />
            </button>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>
            <button
                onClick={onAddToCart}
                className="mt-2 w-full bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center hover:bg-purple-700 transition-colors duration-300"
            >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
            </button>
        </div>
    </div>
);

export default ProductCard;