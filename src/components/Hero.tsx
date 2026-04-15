import { motion } from 'motion/react';
import { Car, MountainSnow, Gamepad2, Heart, MapPin } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // Pre-fetch heavy assets for next sections
    const assetsToPreload = [
      './Japan mountain.webp',
      'https://images.unsplash.com/photo-1542051812871-7575058f4081?q=80&w=2000&auto=format&fit=crop',
      './supra MK4.jpg',
      './skyline-r34.jpg'
    ];
    assetsToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center justify-center text-[#D0D0D0] pt-16 border border-white/10 rounded-3xl mb-[50px] overflow-hidden bg-[#121212]"
      style={{
        zIndex: 10,
        backgroundImage: 'url("./Japan stress.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%',
        backgroundAttachment: 'fixed',
        maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
        WebkitMaskImage: '-webkit-linear-gradient(top, black 90%, transparent 100%)'
      }}
    >
      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="inline-block bg-red-100 text-red-600 font-bold px-4 py-1 rounded-full text-sm mb-6 border border-red-200">
              Forza Horizon 6 Content Creator
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-[#D0D0D0] leading-tight heading-italic text-shadow-strong">
              Capturing the <br/>
              <span className="text-red-500 text-shadow-strong">Soul of Japan's</span> <br/>
              Streets.
            </h1>
            <p className="text-xl text-[#D0D0D0] mb-8 font-medium leading-relaxed max-w-lg bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg">
              Welcome to my hub. I specialize in FH6 drifting, tuning guides, and exploring the beautiful virtual recreation of Japan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="flex flex-wrap gap-4 text-sm font-bold text-[#D0D0D0]"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 shadow-sm burnout-btn cursor-pointer hover:border-[#FFB7C5] hover:text-[#FFB7C5] hover:shadow-[0_0_15px_rgba(255,183,197,0.5)] transition-all duration-300 group">
              <Gamepad2 className="w-5 h-5 text-red-600 group-hover:text-[#FFB7C5] transition-colors duration-300" />
              <span>FH6 Hype</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 shadow-sm burnout-btn cursor-pointer hover:border-[#FFB7C5] hover:text-[#FFB7C5] hover:shadow-[0_0_15px_rgba(255,183,197,0.5)] transition-all duration-300 group">
              <Heart className="w-5 h-5 text-red-600 group-hover:text-[#FFB7C5] transition-colors duration-300" />
              <span>JDM Culture</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 shadow-sm burnout-btn cursor-pointer hover:border-[#FFB7C5] hover:text-[#FFB7C5] hover:shadow-[0_0_15px_rgba(255,183,197,0.5)] transition-all duration-300 group">
              <Car className="w-5 h-5 text-red-600 group-hover:text-[#FFB7C5] transition-colors duration-300" />
              <span>Car Meets</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 shadow-sm burnout-btn cursor-pointer hover:border-[#FFB7C5] hover:text-[#FFB7C5] hover:shadow-[0_0_15px_rgba(255,183,197,0.5)] transition-all duration-300 group">
              <MountainSnow className="w-5 h-5 text-red-600 group-hover:text-[#FFB7C5] transition-colors duration-300" />
              <span>Skiing</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex-1 w-full"
        >
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden shadow-2xl shadow-zinc-200 border-4 border-white group cursor-pointer bg-[#121212] min-h-[300px] hover:border-[#FFB7C5] hover:shadow-[0_0_30px_rgba(255,183,197,0.5)] transition-all duration-300"
          >
            <ImageWithFallback 
              src="./horizon-6-cover.jpg" 
              alt="Car drifting" 
              fallbackText="Car drifting"
              className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-orbitron font-bold text-lg group-hover:text-[#FFB7C5] transition-colors duration-300 heading-italic drop-shadow-md">Latest Video: The Ultimate Touge Run</p>
              <p className="text-[#FFFFFF] font-orbitron text-sm font-medium group-hover:text-[#FFB7C5] transition-colors duration-300 drop-shadow-md">Watch now on YouTube</p>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Transition Layer: Dust/Grain Texture - Removed for Glass Window effect */}
    </section>
  );
}
