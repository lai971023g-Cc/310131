import { motion, AnimatePresence } from 'motion/react';
import { Settings, Trophy, Star, X, Gauge, Wrench, Zap } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ImageWithFallback from './ImageWithFallback';

const categories = ['All', 'JDM', 'EURO', 'EXOTIC'];

const vehicles = [
  {
    id: 'supra',
    brand: 'Toyota',
    name: 'Supra MK4',
    category: 'JDM',
    image:'./supra MK4.jpg',
    class: 'S1 900',
    type: 'JDM Icon / Drift',
    description: 'The undisputed JDM Icon. Renowned for its legendary 2JZ engine and limitless tuning potential. This build is a tribute to its classic status, pushing massive horsepower to the rear wheels for perfect sideways action.',
    specs: {
      engine: '3.0L Twin-Turbo I6 (2JZ-GTE)',
      power: '850 HP',
      drivetrain: 'RWD',
      weight: '1,420 kg'
    },
    performance: {
      speed: 8.2,
      handling: 7.5,
      acceleration: 8.8,
      braking: 7.0,
      offroad: 4.5
    },
    horizonFeatures: [
      'Custom Widebody Kit',
      'Advanced Drift Suspension',
      'Sequential Gearbox Upgrade',
      'Anti-Lag System'
    ],
    rating: 4.9,
    reviews: 1240
  },
  {
    id: 'skyline',
    brand: 'Nissan',
    name: 'Skyline GT-R R34',
    category: 'JDM',
    image: './skyline-r34.jpg',
    class: 'S1 898',
    type: 'Street / Grip',
    description: 'The legendary "Godzilla". Equipped with the advanced ATTESA E-TS All-Wheel Drive system, it grips the asphalt like nothing else, dominating the winding mountain passes and Tokyo highways alike.',
    specs: {
      engine: '2.6L Twin-Turbo I6 (RB26DETT)',
      power: '720 HP',
      drivetrain: 'AWD',
      weight: '1,560 kg'
    },
    performance: {
      speed: 7.8,
      handling: 9.2,
      acceleration: 8.5,
      braking: 8.8,
      offroad: 5.0
    },
    horizonFeatures: [
      'Nismo Z-Tune Aero',
      'Race Tire Compound',
      'Upgraded Twin Turbos',
      'Track-Tuned AWD'
    ],
    rating: 4.9,
    reviews: 2150
  },
  {
    id: 'gt3rs',
    brand: 'Porsche',
    name: '911 GT3 RS',
    category: 'EURO',
    image: './911 GT3 RS.webp',
    class: 'S2 998',
    type: 'Track Precision',
    description: 'Born for the apex. The GT3 RS delivers extreme track handling, aerodynamic perfection, and features its iconic massive rear wing to keep it glued to the tarmac at terrifying speeds.',
    specs: {
      engine: '4.0L Naturally Aspirated Flat-6',
      power: '520 HP',
      drivetrain: 'RWD',
      weight: '1,430 kg'
    },
    performance: {
      speed: 8.5,
      handling: 9.8,
      acceleration: 9.0,
      braking: 10.0,
      offroad: 3.5
    },
    horizonFeatures: [
      'Active Aerodynamics',
      'Carbon Ceramic Brakes',
      'Racing Slicks',
      'Weight Reduction Stage 3'
    ],
    rating: 4.8,
    reviews: 856
  },
  {
    id: 'revuelto',
    brand: 'Lamborghini',
    name: 'Revuelto',
    category: 'EXOTIC',
    image: './Lamborghini_Revuelto.jpg',
    class: 'X 999',
    type: 'Hybrid Hypercar',
    description: 'The next generation of raging bulls. As a high-tech plug-in hybrid supercar, the Revuelto combines a screaming V12 with electric motors for instant torque and unparalleled futuristic performance.',
    specs: {
      engine: '6.5L V12 Hybrid',
      power: '1,001 HP',
      drivetrain: 'AWD',
      weight: '1,772 kg'
    },
    performance: {
      speed: 9.8,
      handling: 9.0,
      acceleration: 10.0,
      braking: 9.5,
      offroad: 4.0
    },
    horizonFeatures: [
      'Hybrid Powertrain Tuning',
      'Active Aero Wing',
      'Race Transmission',
      'Custom Forged Wheels'
    ],
    rating: 4.7,
    reviews: 630
  },
  {
    id: 'bronco',
    brand: 'Ford',
    name: 'Bronco Raptor',
    category: 'EXOTIC',
    image: './Bronco Raptor.jpg',
    class: 'A 800',
    type: 'Offroad Monster',
    description: 'Built for the wild. The Bronco Raptor is a high-speed off-road beast, equipped with massive tires and long-travel suspension to conquer any terrain the Horizon festival throws at it.',
    specs: {
      engine: '3.0L Twin-Turbo V6',
      power: '418 HP',
      drivetrain: '4WD',
      weight: '2,600 kg'
    },
    performance: {
      speed: 6.5,
      handling: 6.0,
      acceleration: 7.2,
      braking: 6.5,
      offroad: 10.0
    },
    horizonFeatures: [
      'Offroad Race Suspension',
      'All-Terrain Tires',
      'Reinforced Chassis',
      'Winch & Recovery Gear'
    ],
    rating: 4.6,
    reviews: 1850
  },
  {
    id: 'f40',
    brand: 'Ferrari',
    name: 'F40',
    category: 'EXOTIC',
    image: './f40.jpg',
    class: 'S2 900',
    type: 'Retro Supercar',
    description: 'The ultimate analog supercar. Built to celebrate Ferrari\'s 40th anniversary, the F40 is a twin-turbocharged V8 masterpiece that demands absolute respect and skill to master on the Horizon festival roads.',
    specs: {
      engine: '2.9L Twin-Turbo V8',
      power: '471 HP',
      drivetrain: 'RWD',
      weight: '1,254 kg'
    },
    performance: {
      speed: 8.8,
      handling: 8.5,
      acceleration: 8.2,
      braking: 8.0,
      offroad: 3.0
    },
    horizonFeatures: [
      'Carbon Kevlar Body',
      'Race Twin Turbos',
      'Track Suspension',
      'Weight Reduction'
    ],
    rating: 4.9,
    reviews: 1420
  }
];

const Garage = React.memo(function Garage() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);

  const filteredVehicles = React.useMemo(() => {
    return vehicles.filter(v => 
      activeCategory === 'All' ? true : v.category === activeCategory
    ).sort((a, b) => {
      const classOrder: Record<string, number> = { 'X': 7, 'S2': 6, 'S1': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1 };
      const classA = a.class.split(' ')[0];
      const classB = b.class.split(' ')[0];
      const scoreA = (classOrder[classA] || 0) * 1000 + parseInt(a.class.split(' ')[1] || '0');
      const scoreB = (classOrder[classB] || 0) * 1000 + parseInt(b.class.split(' ')[1] || '0');
      
      if (scoreB !== scoreA) {
        return scoreB - scoreA; // Descending by class
      }
      return a.brand.localeCompare(b.brand); // Ascending by brand if class is same
    });
  }, [activeCategory]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedVehicle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVehicle]);

  return (
    <div className="flex flex-col bg-transparent relative overflow-hidden" style={{ willChange: 'transform', contain: 'layout' }}>
      <div className="min-h-[100dvh] bg-zinc-950/40 backdrop-blur-sm border border-white/10 rounded-3xl mb-[50px] pt-24 pb-12 px-6 relative overflow-hidden reveal-section z-10">
        {/* Faint Car Silhouette Background */}
      <div className="absolute top-40 -right-64 w-[800px] opacity-[0.03] pointer-events-none transform -scale-x-100 rotate-12">
        <img src="./skyline-r34.jpg" alt="Skyline Silhouette" className="w-full h-auto grayscale contrast-200" />
      </div>
      <div className="absolute bottom-20 -left-64 w-[800px] opacity-[0.03] pointer-events-none -rotate-12">
        <img src="./supra MK4.jpg" alt="Supra Silhouette" className="w-full h-auto grayscale contrast-200" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center slide-in-left">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black text-[#D0D0D0] mb-4 tracking-tight drop-shadow-md heading-italic text-shadow-strong">
            My <span className="text-red-600 text-shadow-strong">Garage</span>
          </h1>
          <p className="text-[#D0D0D0] opacity-70 text-xl max-w-2xl mx-auto italic text-shadow-strong">
            Explore my curated collection of vehicles, tuned specifically for the diverse environments of Forza Horizon 6.
          </p>
        </div>

        {/* Filter Nav */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 slide-in-right">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-sm font-orbitron font-bold uppercase tracking-wider transition-all duration-300 transform -skew-x-12 burnout-btn ${
                activeCategory === category
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                  : 'bg-black/40 text-[#D0D0D0] hover:text-[#FFB7C5] hover:bg-black/60 border border-white/10 hover:border-[#FFB7C5] hover:shadow-[0_0_15px_rgba(255,183,197,0.5)]'
              }`}
            >
              <span className="block transform skew-x-12">{category}</span>
            </button>
          ))}
        </div>

        {/* Grid Layout - Changed to 2 columns for wider cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 slide-in-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-black/40 border border-white/10 backdrop-blur-[12px] rounded-2xl overflow-hidden flex flex-col shadow-lg hover:border-[#FFB7C5] hover:shadow-[0_0_30px_rgba(255,183,197,0.5)] transition-all duration-500 hover:z-50"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[21/9] md:aspect-[16/9] overflow-hidden flex items-center justify-center bg-[#121212] car-glow-treatment"
                >
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={vehicle.name}
                    fallbackText={`${vehicle.brand} ${vehicle.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1"
                    referrerPolicy="no-referrer"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_black] z-10" />
                  
                  {/* Brand Logo Overlay */}
                  <div className="absolute top-4 left-6 z-20 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <span className="text-5xl md:text-7xl font-orbitron font-black text-white uppercase tracking-widest drop-shadow-sm heading-italic">
                      {vehicle.brand}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent -mt-20 pt-20">
                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-3">
                      <h3 className="text-3xl md:text-4xl font-orbitron font-black text-white group-hover:text-[#FFB7C5] transition-colors duration-300 drop-shadow-sm heading-italic">
                        {vehicle.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      {/* Class Badge */}
                      <div className="bg-red-600 text-white px-4 py-1 rounded-sm font-black italic text-sm shadow-[0_0_10px_rgba(220,38,38,0.3)] transform -skew-x-12">
                        <span className="block transform skew-x-12">{vehicle.class}</span>
                      </div>
                      <p className="text-red-500 font-bold text-sm uppercase tracking-widest italic">{vehicle.type}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm md:text-base line-clamp-3 mb-8 flex-grow italic leading-relaxed">
                    {vehicle.description}
                  </p>
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="w-full bg-black/60 text-[#D0D0D0] hover:bg-[#FFB7C5] hover:text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform group-hover:scale-[1.02] burnout-btn border border-white/10 hover:border-[#FFB7C5] hover:shadow-[0_0_15px_rgba(255,183,197,0.5)]"
                  >
                    <Settings className="w-5 h-5" />
                    View Tuning Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-black/60 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Modal Header / Image */}
              <div className="relative h-64 md:h-96 shrink-0 bg-[#121212] car-glow-treatment">
                <ImageWithFallback
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  fallbackText={`${selectedVehicle.brand} ${selectedVehicle.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_black] z-10" />
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="absolute top-4 right-4 bg-zinc-900/50 hover:bg-[#FFB7C5] hover:text-black text-white p-2 rounded-full backdrop-blur-md transition-all duration-300 z-20 hover:shadow-[0_0_15px_rgba(255,183,197,0.8)]"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-red-600 text-white px-4 py-1 rounded-sm font-black italic text-sm shadow-[0_0_10px_rgba(220,38,38,0.3)] transform -skew-x-12">
                        <span className="block transform skew-x-12">{selectedVehicle.class}</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-sm text-zinc-300 px-3 py-1 rounded-sm font-bold text-sm border border-white/10 italic uppercase">
                        {selectedVehicle.type}
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white drop-shadow-sm heading-italic">
                      {selectedVehicle.brand} {selectedVehicle.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-transparent">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-orbitron font-bold text-white mb-3 flex items-center gap-2 heading-italic">
                        <Settings className="w-5 h-5 text-red-500" />
                        Tuner's Notes
                      </h3>
                      <p className="text-zinc-400 leading-relaxed italic">
                        {selectedVehicle.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-orbitron font-bold text-white mb-4 flex items-center gap-2 heading-italic">
                        <Trophy className="w-5 h-5 text-red-500" />
                        Horizon Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedVehicle.horizonFeatures.map((feature, index) => (
                          <div key={index} className="bg-black/40 border border-white/10 p-3 rounded-xl flex items-center gap-3 text-zinc-300">
                            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            <span className="text-sm font-medium italic">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Specs & Performance */}
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/10 h-fit">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-6 flex items-center gap-2 heading-italic">
                      <Gauge className="w-5 h-5 text-red-500" />
                      Vehicle Specs
                    </h3>
                    <div className="space-y-4 mb-8">
                      {Object.entries(selectedVehicle.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                          <span className="text-zinc-400 capitalize italic">{key}</span>
                          <span className="text-white font-mono font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Performance Bars */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-white mb-2 heading-italic">Performance</h4>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">
                          <span>Speed</span>
                          <span>{selectedVehicle.performance.speed}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${selectedVehicle.performance.speed * 10}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">
                          <span>Handling</span>
                          <span>{selectedVehicle.performance.handling}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${selectedVehicle.performance.handling * 10}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">
                          <span>Acceleration</span>
                          <span>{selectedVehicle.performance.acceleration}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${selectedVehicle.performance.acceleration * 10}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">
                          <span>Braking</span>
                          <span>{selectedVehicle.performance.braking}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${selectedVehicle.performance.braking * 10}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">
                          <span>Offroad</span>
                          <span>{selectedVehicle.performance.offroad}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${selectedVehicle.performance.offroad * 10}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-zinc-400 flex items-center gap-2 font-medium italic">
                        <Star className="w-4 h-4 text-yellow-500" /> Community Rating
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-orbitron font-black text-xl">{selectedVehicle.rating}</span>
                        <span className="text-zinc-500 text-sm">({selectedVehicle.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* The Tuning Lab Section */}
      <section className="min-h-[80dvh] bg-zinc-950/40 backdrop-blur-sm border border-white/10 rounded-3xl mb-[50px] py-24 px-6 relative overflow-hidden reveal-section z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center slide-in-left">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wrench className="w-8 h-8 text-red-600" />
              <h2 className="text-4xl md:text-6xl font-orbitron font-black text-[#D0D0D0] tracking-tight heading-italic text-shadow-strong">
                The Tuning <span className="text-red-600 text-shadow-strong">Lab</span>
              </h2>
            </div>
            <p className="text-[#D0D0D0] opacity-70 text-xl max-w-2xl mx-auto italic">
              Deep dive into the telemetry and performance specs of my featured builds.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center slide-in-right">
            {/* Left Side: High-res Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 group bg-[#121212] car-glow-treatment">
              <ImageWithFallback
                src="./f40.jpg"
                alt="Ferrari F40 Tuning"
                fallbackText="Ferrari F40"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_black] z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-4xl font-orbitron font-black text-white drop-shadow-md heading-italic">Ferrari F40</h3>
                <p className="text-red-500 font-bold uppercase tracking-widest italic">Track Spec / S2 900</p>
              </div>
            </div>

            {/* Right Side: Performance Spec Sheet */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
              
              <h3 className="text-2xl font-orbitron font-bold text-white mb-8 flex items-center gap-3 heading-italic border-b border-white/10 pb-4">
                <Gauge className="w-6 h-6 text-red-500" />
                Telemetry Data
              </h3>

              <div className="space-y-6 mb-10 relative z-10">
                {/* Progress Bars */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                    <span>Speed</span>
                    <span className="text-white">8.8</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: '88%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                    <span>Handling</span>
                    <span className="text-white">8.5</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                    <span>Acceleration</span>
                    <span className="text-white">8.2</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: '82%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                    <span>Launch</span>
                    <span className="text-white">8.0</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: '80%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                    <span>Braking</span>
                    <span className="text-white">8.0</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: '80%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" 
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-black/80 text-white font-orbitron font-black uppercase tracking-widest py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:bg-[#FFB7C5] hover:text-black hover:scale-[1.02] neon-pulse-border border-2 border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(255,183,197,0.8)] hover:border-[#FFB7C5]">
                <Zap className="w-6 h-6 text-red-500 group-hover:text-black transition-colors duration-300" />
                Get Tuning Code
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Garage;
