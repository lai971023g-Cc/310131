/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Sakura from './components/Sakura';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';

const Garage = lazy(() => import('./components/Garage'));
const Hobbies = lazy(() => import('./components/Hobbies'));
const Community = lazy(() => import('./components/Community'));

const SkeletonScreen = () => (
  <div className="min-h-[100dvh] pt-24 pb-12 px-6 flex flex-col gap-8 animate-pulse bg-zinc-950/40">
    <div className="max-w-7xl mx-auto w-full">
      <div className="h-16 w-1/3 bg-white/5 rounded-xl mb-8 border border-white/10 backdrop-blur-sm"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[400px] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"></div>
        <div className="h-[400px] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"></div>
      </div>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - React Router v6 RoutesProps doesn't explicitly include key, but AnimatePresence needs it */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/garage" element={<PageTransition><Suspense fallback={<SkeletonScreen />}><Garage /></Suspense></PageTransition>} />
        <Route path="/hobbies" element={<PageTransition><Suspense fallback={<SkeletonScreen />}><Hobbies /></Suspense></PageTransition>} />
        <Route path="/community" element={<PageTransition><Suspense fallback={<SkeletonScreen />}><Community /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      {/* Preload transition image to prevent flickering */}
      <link rel="preload" as="image" href="./transition-animation.png" />
      
      <Preloader />
      <div 
        className="bg-transparent min-h-[100dvh] font-sans selection:bg-red-500/30 text-[#D0D0D0] relative overflow-hidden bg-animated-grid"
        style={{
          borderRadius: '24px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        {location.pathname === '/' && <Sakura />}
        <Navbar />
        <main className="relative z-20">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}
