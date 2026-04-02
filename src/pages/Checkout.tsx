import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Truck, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

export const Checkout = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const handlePlaceOrder = async () => {
    if (!user) {
      login();
      return;
    }

    setLoading(true);
    try {
      // Create order in Firestore
      const orderData = {
        userId: user.uid,
        items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        total: totalPrice,
        status: 'pending',
        deliveryMethod,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'orders'), orderData);

      // Update user crowns (10 crowns per £1)
      const crownsEarned = Math.floor(totalPrice * 10);
      await updateDoc(doc(db, 'users', user.uid), {
        crowns: increment(crownsEarned)
      });

      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-bk-cream flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl border border-bk-brown/5 text-center max-w-xl w-full"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter mb-4">ORDER PLACED!</h2>
          <p className="text-xl text-bk-brown/60 mb-10">
            Your flame-grilled goodness is being prepared. We'll notify you when it's ready!
          </p>
          <Link to="/" className="btn-primary px-12 py-5 text-xl inline-block">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bk-cream flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShoppingBag className="w-12 h-12 text-bk-brown/20" />
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter mb-4">YOUR CART IS EMPTY</h2>
          <p className="text-xl text-bk-brown/60 mb-10">
            Looks like you haven't added any flame-grilled treats yet.
          </p>
          <Link to="/menu" className="btn-primary px-12 py-5 text-xl inline-block">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bk-cream pb-20">
      <div className="bg-bk-brown text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">YOUR ORDER</h1>
          <p className="text-bk-cream/70 text-xl">Review your items and complete your order.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-bk-brown/5">
              <div className="p-8 border-b border-bk-brown/5 flex justify-between items-center">
                <h3 className="text-2xl font-black italic tracking-tight">CART ITEMS ({items.length})</h3>
                <button onClick={clearCart} className="text-bk-red font-bold text-sm hover:underline">Clear All</button>
              </div>
              
              <div className="divide-y divide-bk-brown/5">
                {items.map((item) => (
                  <div key={item.id} className="p-8 flex gap-6">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-black italic tracking-tight">{item.name}</h4>
                        <span className="font-black text-bk-red">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-bk-brown/50 mb-4 line-clamp-1">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-bk-cream/50 rounded-full px-4 py-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-bk-red transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-bk-red transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-bk-brown/30 hover:text-bk-red transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-bk-brown/5">
              <h3 className="text-2xl font-black italic tracking-tight mb-6">DELIVERY METHOD</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setDeliveryMethod('delivery')}
                  className={cn(
                    "p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
                    deliveryMethod === 'delivery' ? "border-bk-orange bg-bk-orange/5" : "border-bk-brown/10 hover:bg-bk-brown/5"
                  )}
                >
                  <Truck className={cn("w-8 h-8", deliveryMethod === 'delivery' ? "text-bk-orange" : "text-bk-brown/40")} />
                  <span className="font-bold">Delivery</span>
                </button>
                <button 
                  onClick={() => setDeliveryMethod('pickup')}
                  className={cn(
                    "p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
                    deliveryMethod === 'pickup' ? "border-bk-orange bg-bk-orange/5" : "border-bk-brown/10 hover:bg-bk-brown/5"
                  )}
                >
                  <ShoppingBag className={cn("w-8 h-8", deliveryMethod === 'pickup' ? "text-bk-orange" : "text-bk-brown/40")} />
                  <span className="font-bold">Pickup</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-8">
            <div className="bg-bk-brown text-white p-8 rounded-[2rem] shadow-xl sticky top-24">
              <h3 className="text-2xl font-black italic tracking-tight mb-8">ORDER SUMMARY</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between opacity-70">
                  <span>Subtotal</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Delivery Fee</span>
                  <span>{deliveryMethod === 'delivery' ? '£2.99' : 'FREE'}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Service Fee</span>
                  <span>£0.99</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-2xl font-black italic tracking-tight">
                  <span>TOTAL</span>
                  <span>£{(totalPrice + (deliveryMethod === 'delivery' ? 2.99 : 0) + 0.99).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl mb-8 flex items-center gap-3">
                <div className="bg-bk-orange p-2 rounded-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-bold">You'll earn {Math.floor(totalPrice * 10)} Crowns</p>
                  <p className="opacity-60 text-xs">Redeem for free food later!</p>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CreditCard className="w-6 h-6" />}
                {loading ? 'Processing...' : user ? 'Place Order' : 'Sign In to Order'}
              </button>

              <p className="mt-4 text-[10px] text-center opacity-40 uppercase tracking-widest">
                Secure checkout powered by FlameGrilled Pay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
