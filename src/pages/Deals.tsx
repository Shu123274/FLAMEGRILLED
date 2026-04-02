import React from 'react';
import { motion } from 'motion/react';
import { Tag, Clock, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Deals = () => {
  const deals = [
    {
      id: 'whopper-wednesday',
      title: 'Whopper® Wednesday',
      description: 'Get a Whopper® for just £3.99 every Wednesday.',
      expiry: 'Ends in 2 days',
      image: 'https://picsum.photos/seed/deal1/600/400',
      color: 'bg-bk-orange'
    },
    {
      id: 'family-bundle',
      title: 'Family Bundle',
      description: '2 Whoppers®, 2 Royale Burgers, 4 Large Fries, and 4 Drinks.',
      expiry: 'Limited time only',
      image: 'https://picsum.photos/seed/deal2/600/400',
      color: 'bg-bk-red'
    },
    {
      id: 'student-discount',
      title: 'Student Discount',
      description: '20% off your entire order with a valid student ID.',
      expiry: 'Ongoing offer',
      image: 'https://picsum.photos/seed/deal3/600/400',
      color: 'bg-bk-brown'
    }
  ];

  return (
    <div className="min-h-screen bg-bk-cream pb-20">
      <div className="bg-bk-orange text-white py-20 px-4 md:px-8 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">HOT DEALS</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Flame-grilled goodness at prices you'll love. Grab these deals before they're gone!
          </p>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img
            src="https://picsum.photos/seed/deals-bg/800/800"
            alt="Deals Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-bk-brown/5 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-black italic text-bk-orange flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  EXCLUSIVE DEAL
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black italic tracking-tight mb-3">{deal.title}</h3>
                <p className="text-bk-brown/70 mb-6 flex-grow">{deal.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-bk-brown/40">
                    <Clock className="w-4 h-4" />
                    {deal.expiry}
                  </div>
                  <Link to="/menu" className="btn-primary px-6 py-2 text-sm">
                    Claim Deal
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Promo */}
        <div className="mt-20 bg-bk-brown rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6">WANT MORE DEALS?</h2>
            <p className="text-lg text-bk-cream/70 mb-8">
              Download the FlameGrilled app to unlock exclusive mobile-only offers and start earning crowns on every order.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-bk-brown px-6 py-3 rounded-xl font-bold text-sm">App Store</button>
              <button className="bg-white text-bk-brown px-6 py-3 rounded-xl font-bold text-sm">Google Play</button>
            </div>
          </div>
          <div className="w-full md:w-64 h-64 bg-bk-orange rounded-3xl flex items-center justify-center rotate-3">
             <Flame className="w-32 h-32 text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
