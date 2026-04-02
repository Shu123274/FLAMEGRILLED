import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOOD_ITEMS } from '../constants';
import { FoodCard } from '../components/FoodCard';
import { cn } from '../lib/utils';

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Burgers', 'Chicken', 'Sides', 'Drinks', 'Deals'];

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bk-cream pb-20">
      {/* Header */}
      <div className="bg-bk-brown text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">OUR MENU</h1>
          <p className="text-bk-cream/70 text-xl max-w-2xl">
            From our legendary flame-grilled Whopper® to our crispy fries, find all your favourites here.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-[64px] z-40 bg-bk-cream/80 backdrop-blur-md border-b border-bk-brown/10 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all",
                  activeCategory === cat 
                    ? "bg-bk-orange text-white shadow-md" 
                    : "bg-white text-bk-brown hover:bg-bk-brown/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bk-brown/40" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-bk-brown/10 focus:outline-none focus:ring-2 focus:ring-bk-orange/20 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <FoodCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="w-10 h-10 text-bk-brown/20" />
              </div>
              <h3 className="text-2xl font-black italic mb-2">NO ITEMS FOUND</h3>
              <p className="text-bk-brown/60">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Burger Generator Promo */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="bg-bk-red rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-xs font-black italic mb-6">
              <Flame className="w-4 h-4" />
              AI POWERED
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 leading-none">
              DREAM IT. <br />
              GENERATE IT.
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Can't find your perfect burger? Use our AI generator to visualize your ultimate flame-grilled creation.
            </p>
            <Link to="/generate" className="bg-white text-bk-red px-8 py-4 rounded-full font-bold text-lg hover:bg-bk-cream transition-all inline-block">
              Try AI Generator
            </Link>
          </div>
          <div className="flex-1 relative z-10">
            <img
              src="https://picsum.photos/seed/ai-burger/600/600"
              alt="AI Burger"
              className="w-full max-w-md mx-auto drop-shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-bk-orange/30 rounded-full blur-3xl -mr-20 -mt-20" />
        </div>
      </div>
    </div>
  );
};
