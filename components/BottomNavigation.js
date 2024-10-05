import React from 'react';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';

const BottomNavigation = ({ activeTab, setActiveTab }) => (
    <nav className="bg-white shadow-lg rounded-t-xl">
        <ul className="flex justify-around py-2">
            {[
                { name: 'home', icon: Home, label: 'Home' },
                { name: 'explore', icon: Search, label: 'Explore' },
                { name: 'cart', icon: ShoppingCart, label: 'Cart' },
                { name: 'favorites', icon: Heart, label: 'Favorites' },
                { name: 'account', icon: User, label: 'Account' },
            ].map(({ name, icon: Icon, label }) => (
                <li key={name} onClick={() => setActiveTab(name)} className="cursor-pointer flex flex-col items-center">
                    <div className={`p-2 rounded-full ${activeTab === name ? 'bg-purple-100' : ''}`}>
                        <Icon
                            size={20}
                            className={`${activeTab === name ? 'text-purple-600' : 'text-gray-500'} transition-colors duration-300`}
                        />
                    </div>
                    <span className={`text-xs mt-1 ${activeTab === name ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                        {label}
                    </span>
                </li>
            ))}
        </ul>
    </nav>
);

export default BottomNavigation;