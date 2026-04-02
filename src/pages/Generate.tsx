import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Download, Share2, Loader2, Sparkles, Flame, Info } from 'lucide-react';
import { generateBurgerImage } from '../lib/gemini';
import { cn } from '../lib/utils';

export const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await generateBurgerImage(prompt, size);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to generate burger. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `my-dream-burger-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-bk-cream pb-20">
      {/* Header */}
      <div className="bg-bk-red text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-xs font-black italic mb-6">
            <Sparkles className="w-4 h-4" />
            AI BURGER GENERATOR
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-none">
            DREAM IT. <br />
            GENERATE IT.
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Describe your ultimate burger and let our AI bring it to life with professional food photography.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 hidden lg:block">
          <img
            src="https://picsum.photos/seed/ai-bg/800/800"
            alt="AI Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-bk-brown/5 h-fit">
            <div className="space-y-8">
              <div>
                <label className="block font-black italic text-xl mb-4 tracking-tight">DESCRIBE YOUR BURGER</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A massive triple-decker burger with melting cheddar, crispy bacon, caramelized onions, and a spicy chipotle sauce on a toasted brioche bun."
                  className="w-full h-40 p-6 bg-bk-cream/30 rounded-2xl border border-bk-brown/10 focus:outline-none focus:ring-2 focus:ring-bk-orange/20 font-medium resize-none text-lg"
                />
              </div>

              <div>
                <label className="block font-black italic text-xl mb-4 tracking-tight">IMAGE QUALITY</label>
                <div className="grid grid-cols-3 gap-4">
                  {(["1K", "2K", "4K"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "py-3 rounded-xl font-bold transition-all border-2",
                        size === s 
                          ? "bg-bk-orange border-bk-orange text-white shadow-md" 
                          : "bg-white border-bk-brown/10 text-bk-brown hover:bg-bk-brown/5"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-bk-brown/40 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Higher quality takes longer to generate.
                </p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                {loading ? 'Generating Your Burger...' : 'Generate My Burger'}
              </button>

              {error && (
                <div className="p-4 bg-bk-red/10 border border-bk-red/20 text-bk-red rounded-xl text-sm font-bold">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-6">
            <div className="bg-bk-brown aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative flex items-center justify-center border-[12px] border-white">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-12"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 border-4 border-bk-orange/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-t-bk-orange rounded-full animate-spin" />
                      <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-bk-orange animate-pulse" />
                    </div>
                    <h3 className="text-white font-black italic text-2xl tracking-tighter mb-2">GRILLING YOUR BURGER...</h3>
                    <p className="text-white/60">Our AI chef is carefully assembling your creation.</p>
                  </motion.div>
                ) : generatedImage ? (
                  <motion.img
                    key="image"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={generatedImage}
                    alt="Generated Burger"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-12"
                  >
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Sparkles className="w-12 h-12 text-white/20" />
                    </div>
                    <h3 className="text-white font-black italic text-2xl tracking-tighter mb-2">READY TO GRILL</h3>
                    <p className="text-white/40">Enter a description and click generate to see your burger.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {generatedImage && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <button
                  onClick={downloadImage}
                  className="flex-1 bg-white text-bk-brown py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-bk-brown/5 transition-all shadow-md"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    navigator.share?.({
                      title: 'My FlameGrilled AI Burger',
                      text: `Check out this burger I generated: ${prompt}`,
                      url: window.location.href
                    }).catch(() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    });
                  }}
                  className="flex-1 bg-white text-bk-brown py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-bk-brown/5 transition-all shadow-md"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
