import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { user, login } = useAuth();
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Deals', path: '/deals' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Locations', path: '/locations' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-bk-cream border-b border-bk-brown/10 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-bk-red rounded-full flex items-center justify-center text-white font-black text-xl italic">
              FG
            </div>
            <span className="text-2xl font-black italic tracking-tighter hidden md:block">FLAMEGRILLED</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-bold text-lg hover:text-bk-orange transition-colors",
                  location.pathname === link.path ? "text-bk-orange" : "text-bk-brown"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/checkout" className="relative p-2 hover:bg-bk-brown/5 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-bk-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bk-cream">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <Link to="/rewards" className="flex items-center gap-2 p-1 pr-3 bg-bk-brown/5 rounded-full hover:bg-bk-brown/10 transition-colors">
              <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full" />
              <span className="font-bold text-sm hidden sm:block">{user.displayName?.split(' ')[0]}</span>
            </Link>
          ) : (
            <button onClick={login} className="hidden sm:flex items-center gap-2 font-bold hover:text-bk-orange transition-colors">
              <User className="w-5 h-5" />
              Sign In
            </button>
          )}

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 flex flex-col gap-4 pb-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-bold text-xl",
                  location.pathname === link.path ? "text-bk-orange" : "text-bk-brown"
                )}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <button onClick={() => { login(); setIsOpen(false); }} className="flex items-center gap-2 font-bold text-xl">
                <User className="w-6 h-6" />
                Sign In
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
