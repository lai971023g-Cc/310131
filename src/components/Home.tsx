import Hero from './Hero';
import { motion, AnimatePresence } from 'motion/react';
import { Play, MapPin, Flag, Camera, Compass, Car, X, Flower, Clock, Trophy, Gift, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import React, { useState, lazy, Suspense } from 'react';
import ImageWithFallback from './ImageWithFallback';

const JapanMap = lazy(() => import('./JapanMap'));

export default function Home() {
  useScrollReveal();

  return (
    <div className="flex flex-col bg-transparent relative overflow-hidden">
      {/* Faint Car Silhouette Background */}
      <div className="absolute top-96 -left-64 w-[800px] opacity-[0.03] pointer-events-none -rotate-12 z-0">
        <img src="./supra MK4.jpg" alt="Supra Silhouette" className="w-full h-auto grayscale contrast-200" />
      </div>
      <div className="absolute bottom-[800px] -right-64 w-[800px] opacity-[0.03] pointer-events-none transform -scale-x-100 rotate-12 z-0">
        <img src="./skyline-r34.jpg" alt="Skyline Silhouette" className="w-full h-auto grayscale contrast-200" />
      </div>

      <Hero />
      
      {/* Shared Background Container for Mt. Fuji & Map Sections - Removed for Glass Window effect */}
      <div className="relative w-full">
        {/* Mt. Fuji Parallax / Feature Section */}
        <section 
          className="relative py-32 text-[#D0D0D0] overflow-hidden reveal-section border border-white/10 rounded-3xl mb-[50px] bg-[#121212]" 
          style={{ 
            minHeight: '100dvh',
            backgroundImage: 'url("./Japan mountain.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            backgroundAttachment: 'fixed',
            zIndex: 10,
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            WebkitMaskImage: '-webkit-linear-gradient(top, black 90%, transparent 100%)'
          }}
        >
          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10"></div>

          <div className="relative z-20 max-w-6xl mx-auto px-6">
            <div className="max-w-2xl slide-in-left">
              <h2 
                className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-[#D0D0D0] leading-tight heading-italic text-shadow-strong"
              >
                Conquer the <br />
                <span className="text-red-500 text-shadow-strong">Sacred Mountain</span>
              </h2>
              <p 
                className="text-xl text-[#D0D0D0] mb-8 leading-relaxed font-medium bg-black/40 backdrop-blur-[12px] p-6 rounded-2xl border border-white/10 shadow-lg"
              >
                Experience the ultimate touge battles on the winding roads of Hakone, with the breathtaking Mount Fuji as your backdrop. Check out my latest tuning guides specifically optimized for these high-altitude drops.
              </p>
              <button className="bg-black/40 text-[#D0D0D0] border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-[#FFB7C5] hover:text-black hover:border-[#FFB7C5] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] flex items-center gap-2 group burnout-btn backdrop-blur-sm">
                <div className="bg-red-600/20 text-red-500 p-1 rounded-full group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4" />
                </div>
                Watch the Touge Guide
              </button>
            </div>
          </div>
        </section>

        {/* Japan Map Discovery Section */}
        <section 
          className="py-24 min-h-[100dvh] bg-[#121212] relative overflow-hidden reveal-section border border-white/10 rounded-3xl mb-[50px]"
          style={{
            zIndex: 10,
            backgroundImage: 'url("https://images.unsplash.com/photo-1542051812871-7575058f4081?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            WebkitMaskImage: '-webkit-linear-gradient(top, black 90%, transparent 100%)',
            willChange: 'transform',
            contain: 'layout'
          }}
        >
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 slide-in-left">
              <h2 className="text-4xl md:text-5xl font-black text-[#D0D0D0] tracking-tight mb-4 heading-italic text-shadow-strong">Explore <span className="text-red-500 text-shadow-strong">Japan</span></h2>
              <p className="text-[#D0D0D0] font-medium text-lg max-w-2xl mx-auto text-shadow-strong">Discover the iconic locations featured in Forza Horizon 6. Click on the hotspots to see more.</p>
            </div>
            
            {/* Interactive Map Container */}
            <div className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] slide-in-right">
              <Suspense fallback={<div className="w-full h-full bg-white/5 backdrop-blur-[12px] rounded-3xl animate-pulse flex items-center justify-center border border-white/10 shadow-2xl"><div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div></div>}>
                <JapanMap />
              </Suspense>
            </div>
          </div>
        </section>
      </div>

      {/* Seasonal Event Calendar */}
      <section className="py-24 min-h-[60dvh] bg-zinc-950/40 backdrop-blur-sm border border-white/10 rounded-3xl mb-[50px] reveal-section relative z-10">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="mb-12 slide-in-left">
            <div className="flex items-center gap-3 mb-4">
              <Flower className="w-8 h-8 text-[#FFB7C5]" />
              <h2 className="text-4xl font-black text-[#D0D0D0] tracking-tight heading-italic">Spring Season <span className="text-[#FFB7C5]">Challenges</span></h2>
            </div>
            <p className="text-[#D0D0D0] font-medium text-lg">The Horizon Festival is heating up. Complete these events before time runs out.</p>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar slide-in-right snap-x">
            {/* Card 1 */}
            <div className="min-w-[300px] md:min-w-[400px] bg-black/40 backdrop-blur-[12px] border border-white/10 rounded-2xl p-6 flex flex-col snap-start hover:border-[#FFB7C5] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] transition-all duration-300 group hover:z-50 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFB7C5]" />
                  <span className="text-sm font-bold text-[#D0D0D0] font-mono">03:14:22:05</span>
                </div>
                <Flower className="w-6 h-6 text-[#FFB7C5] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 heading-italic text-shadow-strong">Hakone Downhill Sprint</h3>
              <p className="text-zinc-400 mb-6 italic flex-grow">A high-speed technical descent. Bring a well-tuned drift or grip monster.</p>
              <div className="bg-zinc-900/80 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/30 group-hover:border-[#FFB7C5]/50 transition-colors duration-300">
                  <Trophy className="w-5 h-5 text-red-500 group-hover:text-[#FFB7C5] group-hover:drop-shadow-[0_0_10px_rgba(255,183,197,0.8)] transition-all duration-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Reward</p>
                  <p className="text-white font-bold font-orbitron">20 PTS</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[300px] md:min-w-[400px] bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col snap-start hover:border-[#FFB7C5] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] transition-all duration-300 group hover:z-50 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFB7C5]" />
                  <span className="text-sm font-bold text-[#D0D0D0] font-mono">03:14:22:05</span>
                </div>
                <Flower className="w-6 h-6 text-[#FFB7C5] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 heading-italic">Mt. Fuji Speed Trap</h3>
              <p className="text-zinc-400 mb-6 italic flex-grow">Hit the target speed of 220 MPH before the braking zone.</p>
              <div className="bg-zinc-900/80 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30 group-hover:border-[#FFB7C5]/50 transition-colors duration-300">
                  <Gift className="w-5 h-5 text-yellow-500 group-hover:text-[#FFB7C5] group-hover:drop-shadow-[0_0_10px_rgba(255,183,197,0.8)] transition-all duration-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Reward</p>
                  <p className="text-white font-bold font-orbitron">Super Wheelspin</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="min-w-[300px] md:min-w-[400px] bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col snap-start hover:border-[#FFB7C5] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] transition-all duration-300 group hover:z-50 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFB7C5]" />
                  <span className="text-sm font-bold text-[#D0D0D0] font-mono">03:14:22:05</span>
                </div>
                <Flower className="w-6 h-6 text-[#FFB7C5] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 heading-italic">Kyoto Night Drift</h3>
              <p className="text-zinc-400 mb-6 italic flex-grow">Score 150,000 drift points through the historic streets.</p>
              <div className="bg-zinc-900/80 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover:border-[#FFB7C5]/50 transition-colors duration-300">
                  <Star className="w-5 h-5 text-purple-500 group-hover:text-[#FFB7C5] group-hover:drop-shadow-[0_0_10px_rgba(255,183,197,0.8)] transition-all duration-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Reward</p>
                  <p className="text-white font-bold font-orbitron">Rare Emote</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Videos / Content Grid */}
      <section className="py-24 min-h-[100dvh] bg-zinc-950/40 backdrop-blur-sm border border-white/10 rounded-3xl mb-[50px] reveal-section relative z-10">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-12 slide-in-left">
            <div>
              <h2 className="text-4xl font-black text-[#D0D0D0] tracking-tight mb-4 heading-italic text-shadow-strong">Latest Drops</h2>
              <p className="text-[#D0D0D0] font-medium text-lg text-shadow-strong">My newest FH6 cinematic edits and gameplay.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-red-600 font-bold hover:text-[#FFB7C5] hover:drop-shadow-[0_0_10px_rgba(255,183,197,0.5)] transition-all duration-300 burnout-btn">
              View All <Flag className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 slide-in-right">
            {/* Video Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative rounded-3xl overflow-hidden aspect-video mb-6 shadow-lg shadow-black/50 border border-white/10 bg-[#121212] min-h-[200px]">
                <ImageWithFallback 
                  src="./Forza-Horizon-6.jpg" 
                  alt="Drift Video" 
                  fallbackText="Drift Video"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-700 opacity-80"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform shadow-lg shadow-red-600/30">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-[#D0D0D0] text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
                  12:45
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#D0D0D0] mb-2 group-hover:text-white transition-colors heading-italic">The Ultimate Hakone Downhill Drift</h3>
              <p className="text-[#D0D0D0] font-medium opacity-70">125K views • 2 days ago</p>
            </div>

            {/* Video Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative rounded-3xl overflow-hidden aspect-video mb-6 shadow-lg shadow-black/50 border border-white/10 bg-[#121212] min-h-[200px]">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Car Meet Video" 
                  fallbackText="Car Meet Video"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-700 opacity-80"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform shadow-lg shadow-red-600/30">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-[#D0D0D0] text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
                  08:20
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#D0D0D0] mb-2 group-hover:text-white transition-colors heading-italic">Tokyo Highway Night Run - 4K 60FPS</h3>
              <p className="text-[#D0D0D0] font-medium opacity-70">89K views • 1 week ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
