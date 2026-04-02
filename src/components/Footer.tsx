import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-bk-brown text-bk-cream py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-bk-red rounded-full flex items-center justify-center text-white font-black text-lg italic">
              FG
            </div>
            <span className="text-xl font-black italic tracking-tighter">FLAMEGRILLED</span>
          </div>
          <p className="text-sm text-bk-cream/70">
            Real Flame. Real Taste. Since 2026.
          </p>
          <div className="flex gap-4 mt-2">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-bk-orange transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-bk-orange transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-bk-orange transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-bk-orange transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">BK Info</h4>
          <ul className="flex flex-col gap-2 text-sm text-bk-cream/70">
            <li><Link to="/about" className="hover:text-bk-orange transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-bk-orange transition-colors">Careers</Link></li>
            <li><Link to="/franchising" className="hover:text-bk-orange transition-colors">Franchising</Link></li>
            <li><Link to="/news" className="hover:text-bk-orange transition-colors">Newsroom</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="flex flex-col gap-2 text-sm text-bk-cream/70">
            <li><Link to="/contact" className="hover:text-bk-orange transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-bk-orange transition-colors">FAQs</Link></li>
            <li><Link to="/nutrition" className="hover:text-bk-orange transition-colors">Nutrition Info</Link></li>
            <li><Link to="/allergens" className="hover:text-bk-orange transition-colors">Allergen Info</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-bk-cream/70">
            <li><Link to="/privacy" className="hover:text-bk-orange transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-bk-orange transition-colors">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-bk-orange transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-bk-cream/10 text-center text-xs text-bk-cream/50">
        TM & © 2026 FlameGrilled Corporation. All Rights Reserved.
      </div>
    </footer>
  );
};
