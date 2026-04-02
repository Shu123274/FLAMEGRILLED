import React from 'react';
import { Plus, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { FoodItem } from '../types';
import { useCart } from '../hooks/useCart';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-bk-brown/5 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-bk-orange text-white text-[10px] font-black italic px-2 py-1 rounded-full flex items-center gap-1">
          <Flame className="w-3 h-3" />
          FLAME-GRILLED
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-xl italic tracking-tight leading-tight">{item.name}</h3>
          <span className="font-black text-bk-red text-lg">£{item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-bk-brown/70 mb-4 line-clamp-2 flex-grow">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-bold text-bk-brown/50">{item.calories} Cal</span>
          <button
            onClick={() => addToCart(item)}
            className="bg-bk-red text-white p-2 rounded-full hover:bg-opacity-90 transition-all active:scale-90"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
