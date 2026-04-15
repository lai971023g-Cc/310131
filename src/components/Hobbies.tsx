import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Snowflake, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ImageWithFallback from './ImageWithFallback';

const hobbies = [
  {
    id: 1,
    title: "Car Meets & Shows",
    shortDesc: "Attending local and international car shows, capturing the essence of JDM culture, and finding inspiration for my next FH6 livery.",
    fullDesc: "Car culture isn't just a game for me. I regularly travel to major car shows like Tokyo Auto Salon and local underground meets. I bring my camera everywhere to capture the unique builds, the atmosphere, and the people who make this community so special. These real-world experiences directly inspire the liveries and tunes I create in Forza Horizon 6. I often spend hours recreating a specific paint job or sticker slap I saw on a real drift car.",
    image: "./motorshow-0342.jpg",
    icon: Camera,
    colorClass: "bg-red-600 shadow-red-600/30"
  },
  {
    id: 2,
    title: "Winter Sports",
    shortDesc: "Hitting the slopes whenever the snow falls. Skiing gives me the same adrenaline rush as a perfect drift down a mountain pass.",
    fullDesc: "When the mountain passes are covered in snow and the cars are put away, I trade my steering wheel for skis. There's a massive parallel between carving down a snowy mountain and drifting a car—it's all about weight transfer, edge control, and finding the perfect line. I usually spend my winters in Hokkaido, enjoying the world-class powder and filming freeride segments with my friends.",
    image: "./snow.webp",
    icon: Snowflake,
    colorClass: "bg-blue-600 shadow-blue-600/30"
  }
];

export default function Hobbies() {
  useScrollReveal();
  const [selectedHobby, setSelectedHobby] = useState<typeof hobbies[0] | null>(null);

  return (
    <section className="min-h-[100dvh] pt-24 pb-12 bg-zinc-950/80 border border-white/10 rounded-3xl mb-[50px] text-[#D0D0D0] reveal-section relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 slide-in-left">
          <h2 className="text-5xl font-black mb-4 text-[#D0D0D0] tracking-tight heading-italic text-shadow-strong">Profile / <span className="text-red-600 text-shadow-strong">About Me</span></h2>
          <p className="text-[#D0D0D0] opacity-70 text-xl max-w-2xl mx-auto italic text-shadow-strong">
            Professional Forza Horizon 6 Content Creator & Livery Designer.
          </p>
        </div>

        {/* Creator Intro */}
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/10 mb-16 slide-in-right bg-diagonal-stripes">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] bg-[#121212]">
                <ImageWithFallback 
                  src="./Hto.jpg" 
                  alt="Creator Avatar" 
                  fallbackText="Creator Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-3xl font-bold text-[#D0D0D0] mb-4 heading-italic">310131</h3>
              <p className="text-[#D0D0D0] opacity-80 leading-relaxed mb-6 italic text-lg">
                I've been immersed in the Forza Horizon series since day one. With FH6 bringing us to the incredible landscapes of Japan, I've dedicated my channel to mastering the touge, creating pixel-perfect JDM liveries, and building a community of like-minded gearheads. My goal is to capture the true essence of Japanese car culture within the game.
              </p>
              <div className="flex gap-4">
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                  <span className="block text-red-600 font-black text-2xl heading-italic">500K+</span>
                  <span className="text-[#D0D0D0] opacity-60 text-sm font-bold uppercase tracking-wider">Subscribers</span>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                  <span className="block text-red-600 font-black text-2xl heading-italic">2M+</span>
                  <span className="text-[#D0D0D0] opacity-60 text-sm font-bold uppercase tracking-wider">Livery Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-16 bg-tire-tracks opacity-10 mb-16"></div>

        <div className="text-center mb-12 slide-in-left">
          <h3 className="text-3xl font-black text-[#D0D0D0] tracking-tight heading-italic text-shadow-strong">Beyond the Screen</h3>
          <p className="text-[#D0D0D0] opacity-70 italic text-shadow-strong">Real-world passions that fuel the virtual drive.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 slide-in-right">
          {hobbies.map((hobby, i) => {
            const Icon = hobby.icon;
            return (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.2) }}
                onClick={() => setSelectedHobby(hobby)}
                className="group relative overflow-hidden rounded-3xl aspect-square md:aspect-[4/3] bg-[#121212] border border-white/10 shadow-lg shadow-black/50 cursor-pointer"
              >
                <ImageWithFallback
                  src={hobby.image}
                  alt={hobby.title}
                  fallbackText={hobby.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: 'center center' }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className={`${hobby.colorClass} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-[#D0D0D0] heading-italic">{hobby.title}</h3>
                  <p className="text-[#D0D0D0] opacity-80 leading-relaxed max-w-md mb-4 line-clamp-2 italic">
                    {hobby.shortDesc}
                  </p>
                  <div className="text-red-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 group-hover:text-[#FFB7C5] transition-all duration-300 uppercase tracking-widest">
                    Read More <span>→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedHobby(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-xl rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl shadow-black/50 border border-white/10 bg-diagonal-stripes"
            >
              <div className="relative h-64 bg-[#121212]">
                <ImageWithFallback 
                  src={selectedHobby.image} 
                  alt={selectedHobby.title} 
                  fallbackText={selectedHobby.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center center' }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <button 
                  onClick={() => setSelectedHobby(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-[#FFB7C5] hover:text-black text-white p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border border-white/10 hover:shadow-[0_0_15px_rgba(255,183,197,0.8)]"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-3xl font-black text-white heading-italic">{selectedHobby.title}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-[#D0D0D0] leading-relaxed text-lg italic">
                  {selectedHobby.fullDesc}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    onClick={() => setSelectedHobby(null)}
                    className="px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-[#FFB7C5] hover:text-black transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-[0_0_20px_rgba(255,183,197,0.8)] burnout-btn uppercase tracking-widest"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
