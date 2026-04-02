import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, Search, Loader2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { findNearbyRestaurants } from '../lib/gemini';
import { cn } from '../lib/utils';

export const Locations = () => {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

  const handleFindNearby = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        try {
          const result = await findNearbyRestaurants(latitude, longitude);
          setRestaurants(result);
        } catch (err) {
          console.error(err);
          setError("Failed to find nearby restaurants. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Please enable location access to find nearby restaurants.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-bk-cream">
      {/* Hero */}
      <div className="bg-bk-brown text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">FIND A RESTAURANT</h1>
          <p className="text-xl text-bk-cream/70 max-w-2xl mb-10">
            Hungry? Find your nearest FlameGrilled restaurant and get that flame-grilled goodness in no time.
          </p>
          
          <button
            onClick={handleFindNearby}
            disabled={loading}
            className="btn-primary flex items-center gap-3 text-lg px-8 py-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Navigation className="w-6 h-6" />}
            {loading ? 'Finding Restaurants...' : 'Use My Current Location'}
          </button>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img
            src="https://picsum.photos/seed/map-bg/800/800"
            alt="Map Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bk-red/10 border border-bk-red/20 text-bk-red p-6 rounded-2xl flex items-center gap-4 mb-8"
            >
              <div className="bg-bk-red text-white p-2 rounded-full">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="font-bold">{error}</p>
            </motion.div>
          )}

          {restaurants ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-black italic tracking-tight mb-8">NEARBY LOCATIONS</h2>
                <div className="prose prose-bk max-w-none bg-white p-8 rounded-[2rem] shadow-sm border border-bk-brown/5">
                  <div className="whitespace-pre-wrap font-medium text-bk-brown/80 leading-relaxed">
                    {restaurants.text}
                  </div>
                </div>
                
                {restaurants.grounding && restaurants.grounding.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-bold text-sm text-bk-brown/40 uppercase tracking-widest mb-4">Sources & Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {restaurants.grounding.map((chunk: any, i: number) => (
                        chunk.maps?.uri && (
                          <a
                            key={i}
                            href={chunk.maps.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-bold border border-bk-brown/10 hover:bg-bk-brown/5 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {chunk.maps.title || 'View on Maps'}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-bk-orange text-white p-8 rounded-[2rem] shadow-lg">
                  <h3 className="text-2xl font-black italic mb-4">OPEN NOW?</h3>
                  <p className="mb-6 opacity-90">Most of our restaurants are open from 8am to 11pm daily. Drive-thrus may stay open later!</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">Mon - Sun: 08:00 - 23:00</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span className="font-bold">0800-FLAME-GRILLED</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-bk-brown/5 shadow-sm">
                  <h3 className="text-xl font-black italic mb-4">AMENITIES</h3>
                  <ul className="space-y-3">
                    {['Drive-Thru', 'Play King Area', 'Free Wi-Fi', 'Delivery Available', 'Click & Collect'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-bold text-bk-brown/70">
                        <div className="w-2 h-2 bg-bk-orange rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                <MapPin className="w-12 h-12 text-bk-brown/20" />
              </div>
              <h3 className="text-3xl font-black italic mb-4 tracking-tight">WHERE ARE YOU?</h3>
              <p className="text-bk-brown/60 max-w-md mx-auto mb-10">
                Click the button above to find the closest FlameGrilled restaurants to your current location.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
