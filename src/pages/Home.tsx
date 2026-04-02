import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { FOOD_ITEMS } from '../constants';
import { FoodCard } from '../components/FoodCard';

export const Home = () => {
  const featuredItems = FOOD_ITEMS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-bk-brown">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/burger-hero/1920/1080?blur=2"
            alt="Hero Burger"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bk-brown via-bk-brown/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-bk-orange text-white px-4 py-1 rounded-full text-sm font-black italic mb-6">
              <Flame className="w-4 h-4" />
              REAL FLAME. REAL TASTE.
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter leading-[0.9] mb-6">
              THE KING OF <br />
              <span className="text-bk-orange">FLAME-GRILLED</span>
            </h1>
            <p className="text-xl text-bk-cream/80 mb-8 max-w-lg">
              Experience the legendary taste of our 100% beef patties, grilled over real flames for that unmistakable smoky flavour.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/deals" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                View Deals
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[20%] hidden lg:block"
        >
          <img
            src="https://picsum.photos/seed/whopper-float/600/600"
            alt="Floating Whopper"
            className="w-[500px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Trust Bar */}
      <div className="bg-bk-red py-4 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-white font-black italic text-2xl tracking-tighter">
              <span>NO SHORTCUTS</span>
              <Star className="w-6 h-6 fill-white" />
              <span>REAL FLAME</span>
              <Star className="w-6 h-6 fill-white" />
              <span>100% BEEF</span>
              <Star className="w-6 h-6 fill-white" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Items */}
      <section className="py-20 px-4 md:px-8 bg-bk-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">FAN FAVOURITES</h2>
              <p className="text-bk-brown/60 max-w-md">Our most loved burgers, grilled to perfection and served fresh.</p>
            </div>
            <Link to="/menu" className="text-bk-red font-bold flex items-center gap-1 hover:underline">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FoodCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="py-20 px-4 md:px-8 bg-bk-orange overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-none">
              GET THE APP. <br />
              GET THE CROWNS.
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join BK Rewards and earn 10 crowns for every £1 spent. Redeem them for your favourite flame-grilled treats!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-bk-brown text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-opacity-90 transition-all">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase opacity-70">Download on the</span>
                  <span className="text-lg">App Store</span>
                </div>
              </button>
              <button className="bg-bk-brown text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-opacity-90 transition-all">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase opacity-70">Get it on</span>
                  <span className="text-lg">Google Play</span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ rotate: 10, y: 100 }}
              whileInView={{ rotate: -5, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img
                src="https://picsum.photos/seed/phone-app/400/800"
                alt="BK App"
                className="w-[300px] rounded-[3rem] border-[8px] border-bk-brown shadow-2xl mx-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16 px-4 md:px-8 border-t border-bk-brown/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-4">
            <div className="bg-bk-cream p-4 rounded-2xl">
              <Clock className="w-8 h-8 text-bk-red" />
            </div>
            <div>
              <h4 className="font-black text-xl mb-2">FAST DELIVERY</h4>
              <p className="text-bk-brown/60 text-sm">Hot and fresh burgers delivered to your doorstep in minutes.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-bk-cream p-4 rounded-2xl">
              <MapPin className="w-8 h-8 text-bk-red" />
            </div>
            <div>
              <h4 className="font-black text-xl mb-2">NEARBY STORES</h4>
              <p className="text-bk-brown/60 text-sm">Find your closest FlameGrilled restaurant with our store locator.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-bk-cream p-4 rounded-2xl">
              <Star className="w-8 h-8 text-bk-red" />
            </div>
            <div>
              <h4 className="font-black text-xl mb-2">BK REWARDS</h4>
              <p className="text-bk-brown/60 text-sm">Earn crowns on every order and redeem them for free food.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
