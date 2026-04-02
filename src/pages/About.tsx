import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Award, Users, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export const About = () => {
  return (
    <div className="min-h-screen bg-bk-cream pb-20">
      {/* Hero */}
      <div className="bg-bk-brown text-white py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-8 leading-none">
            REAL FLAME. <br />
            <span className="text-bk-orange">REAL STORY.</span>
          </h1>
          <p className="text-xl text-bk-cream/70 max-w-3xl mx-auto">
            Since 2026, we've been on a mission to bring the authentic taste of flame-grilled beef to every corner of the digital world.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://picsum.photos/seed/about-bg/1920/1080"
            alt="About Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Flame className="w-10 h-10" />, title: 'FLAME-GRILLED', desc: 'We still grill our burgers over real flames, just like we did on day one.' },
            { icon: <Award className="w-10 h-10" />, title: 'QUALITY FIRST', desc: '100% beef, fresh vegetables, and premium ingredients in every bite.' },
            { icon: <Globe className="w-10 h-10" />, title: 'SUSTAINABILITY', desc: 'Committed to reducing our footprint and sourcing responsibly.' }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-bk-brown/5 text-center"
            >
              <div className="w-20 h-20 bg-bk-cream rounded-3xl flex items-center justify-center mx-auto mb-8 text-bk-red">
                {value.icon}
              </div>
              <h3 className="text-2xl font-black italic mb-4 tracking-tight">{value.title}</h3>
              <p className="text-bk-brown/60 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img
              src="https://picsum.photos/seed/kitchen/800/1000"
              alt="Kitchen"
              className="rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 bg-bk-orange text-white p-12 rounded-[2.5rem] shadow-2xl hidden md:block">
              <div className="text-6xl font-black italic tracking-tighter mb-2">100%</div>
              <div className="text-xl font-bold opacity-80">REAL BEEF</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none">
              NO SHORTCUTS. <br />
              NO MICROWAVES.
            </h2>
            <p className="text-xl text-bk-brown/70 leading-relaxed">
              At FlameGrilled, we believe that great taste takes time and real fire. That's why we've never used microwaves to cook our burgers. Every single patty is grilled over a real flame, locking in that smoky flavour that has made us famous.
            </p>
            <p className="text-xl text-bk-brown/70 leading-relaxed">
              Our commitment to quality extends beyond the grill. We work closely with local farmers and suppliers to ensure that every ingredient meets our high standards for freshness and sustainability.
            </p>
            <div className="flex gap-8 pt-4">
              <div className="flex flex-col items-center gap-2">
                <Users className="w-8 h-8 text-bk-red" />
                <span className="font-bold text-sm">10k+ Employees</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-8 h-8 text-bk-red" />
                <span className="font-bold text-sm">500+ Locations</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-bk-red" />
                <span className="font-bold text-sm">Certified Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-40">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-center mb-20">OUR JOURNEY</h2>
          <div className="space-y-24 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-bk-brown/10 -translate-x-1/2 hidden md:block" />
            
            {[
              { year: '2026', title: 'THE BEGINNING', desc: 'FlameGrilled was founded with a single grill and a dream of better burgers.' },
              { year: '2027', title: 'GOING DIGITAL', desc: 'We launched our first AI-powered ordering system to revolutionize fast food.' },
              { year: '2028', title: '500 STORES', desc: 'Celebrating our 500th location and millions of happy customers worldwide.' }
            ].map((item, i) => (
              <div key={i} className={cn(
                "flex flex-col md:flex-row items-center gap-12 relative",
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                <div className="flex-1 text-center md:text-right">
                  <div className={cn("hidden md:block", i % 2 === 0 ? "text-right" : "text-left")}>
                    <span className="text-8xl font-black italic text-bk-brown/5 tracking-tighter">{item.year}</span>
                    <h3 className="text-3xl font-black italic tracking-tight -mt-12 mb-4">{item.title}</h3>
                    <p className="text-bk-brown/60 max-w-md ml-auto">{item.desc}</p>
                  </div>
                  <div className="md:hidden">
                    <span className="text-6xl font-black italic text-bk-orange tracking-tighter">{item.year}</span>
                    <h3 className="text-2xl font-black italic tracking-tight mb-2">{item.title}</h3>
                    <p className="text-bk-brown/60">{item.desc}</p>
                  </div>
                </div>
                
                <div className="w-12 h-12 bg-bk-orange rounded-full border-4 border-bk-cream relative z-10 hidden md:flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                
                <div className="flex-1">
                  <img
                    src={`https://picsum.photos/seed/history-${i}/600/400`}
                    alt={item.title}
                    className="rounded-3xl shadow-xl w-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
