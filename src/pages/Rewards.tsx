import React from 'react';
import { motion } from 'motion/react';
import { Star, Flame, Trophy, Gift, ArrowRight, User as UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { REWARDS } from '../constants';
import { cn } from '../lib/utils';

export const Rewards = () => {
  const { user, login } = useAuth();

  return (
    <div className="min-h-screen bg-bk-cream pb-20">
      {/* Hero */}
      <div className="bg-bk-brown text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-bk-orange text-white px-4 py-1 rounded-full text-xs font-black italic mb-6">
            <Trophy className="w-4 h-4" />
            BK REWARDS
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-none">
            EARN CROWNS. <br />
            GET FREE FOOD.
          </h1>
          <p className="text-xl text-bk-cream/70 max-w-2xl">
            Join BK Rewards and earn 10 crowns for every £1 spent. Redeem them for your favourite flame-grilled treats!
          </p>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img
            src="https://picsum.photos/seed/rewards-bg/800/800"
            alt="Rewards Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-bk-brown/5 h-fit">
              <div className="flex items-center gap-4 mb-8">
                <img src={user.photoURL} alt={user.displayName} className="w-16 h-16 rounded-full border-4 border-bk-orange" />
                <div>
                  <h3 className="text-xl font-black italic tracking-tight">{user.displayName}</h3>
                  <p className="text-sm text-bk-brown/50">{user.email}</p>
                </div>
              </div>
              
              <div className="bg-bk-cream p-6 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-bk-brown/60">Current Balance</span>
                  <Star className="w-5 h-5 text-bk-orange fill-bk-orange" />
                </div>
                <div className="text-4xl font-black italic tracking-tighter text-bk-brown">
                  {user.crowns} <span className="text-lg">CROWNS</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Next Reward</span>
                  <span className="text-bk-orange">150 Crowns</span>
                </div>
                <div className="w-full h-3 bg-bk-cream rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((user.crowns / 150) * 100, 100)}%` }}
                    className="h-full bg-bk-orange"
                  />
                </div>
                <p className="text-xs text-bk-brown/40 text-center">
                  You're {Math.max(150 - user.crowns, 0)} crowns away from a free drink!
                </p>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-black italic tracking-tight mb-8">AVAILABLE REWARDS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REWARDS.map((reward) => (
                  <div 
                    key={reward.id}
                    className={cn(
                      "bg-white rounded-3xl p-6 border border-bk-brown/5 shadow-sm flex flex-col h-full",
                      user.crowns < reward.cost && "opacity-60"
                    )}
                  >
                    <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                      <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 right-3 bg-bk-orange text-white px-3 py-1 rounded-full text-xs font-black italic flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        {reward.cost}
                      </div>
                    </div>
                    <h3 className="text-xl font-black italic mb-2">{reward.name}</h3>
                    <p className="text-sm text-bk-brown/60 mb-6 flex-grow">{reward.description}</p>
                    <button 
                      disabled={user.crowns < reward.cost}
                      className={cn(
                        "w-full py-3 rounded-xl font-bold transition-all",
                        user.crowns >= reward.cost 
                          ? "bg-bk-red text-white hover:bg-opacity-90" 
                          : "bg-bk-brown/5 text-bk-brown/40 cursor-not-allowed"
                      )}
                    >
                      {user.crowns >= reward.cost ? 'Redeem Now' : `Need ${reward.cost - user.crowns} More Crowns`}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-bk-brown/5 text-center max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-bk-cream rounded-full flex items-center justify-center mx-auto mb-8">
              <UserIcon className="w-12 h-12 text-bk-brown/20" />
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter mb-4">JOIN THE CROWN CLUB</h2>
            <p className="text-xl text-bk-brown/60 mb-10">
              Sign in to start earning crowns on every order. Plus, get a free side with your first order over £5!
            </p>
            <button 
              onClick={login}
              className="btn-primary px-12 py-5 text-xl flex items-center gap-3 mx-auto"
            >
              <UserIcon className="w-6 h-6" />
              Sign In to Join
            </button>
          </div>
        )}

        {/* How it works */}
        <div className="mt-24">
          <h2 className="text-3xl font-black italic tracking-tight text-center mb-16">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Gift className="w-10 h-10" />, title: 'SIGN UP', desc: 'Create an account and join BK Rewards for free.' },
              { icon: <Flame className="w-10 h-10" />, title: 'ORDER & EARN', desc: 'Earn 10 crowns for every £1 you spend on our menu.' },
              { icon: <Star className="w-10 h-10" />, title: 'REDEEM', desc: 'Exchange your crowns for your favourite flame-grilled food.' }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md border border-bk-brown/5 group-hover:scale-110 transition-transform text-bk-orange">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black italic mb-3 tracking-tight">{step.title}</h3>
                <p className="text-bk-brown/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
