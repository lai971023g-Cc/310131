import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* The Forza Flash Overlay */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.5 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        style={{ willChange: "transform, opacity" }}
        className="fixed inset-0 z-[100] pointer-events-none bg-black flex items-center justify-center overflow-hidden"
      >
        <img 
          src="./transition-animation.png" 
          alt="Transition" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "circOut" }}
        style={{ willChange: "transform, opacity" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
