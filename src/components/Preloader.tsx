import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    if (!isExiting) {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          <motion.div
            initial={{ scale: 1.0 }}
            exit={{ scale: 1.5, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="w-full h-full relative flex items-center justify-center"
          >
            {/* The background image */}
            <img 
              src="./transition-animation.png" 
              alt="Loading" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Click to Start Text */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap flex items-center gap-4 md:gap-6">
              <style>{`
                @keyframes ui-flicker {
                  0%, 100% { opacity: 1; }
                  32% { opacity: 1; }
                  33% { opacity: 0.3; }
                  34% { opacity: 1; }
                  35% { opacity: 0.3; }
                  36% { opacity: 1; }
                  70% { opacity: 1; }
                  71% { opacity: 0.5; }
                  72% { opacity: 1; }
                  89% { opacity: 1; }
                  90% { opacity: 0.2; }
                  91% { opacity: 1; }
                }
                .game-ui-text {
                  animation: ui-flicker 4s infinite;
                }
              `}</style>
              
              {/* Left Tech Line */}
              <div className="w-12 md:w-24 h-[1px] bg-white/40 game-ui-text"></div>
              
              <h2 
                className="font-orbitron font-bold italic uppercase game-ui-text"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.2rem',
                  letterSpacing: '8px',
                  textShadow: '0 0 12px rgba(255, 183, 197, 0.8), 0 0 24px rgba(255, 183, 197, 0.4)' 
                }}
              >
                CLICK TO START
              </h2>

              {/* Right Tech Line */}
              <div className="w-12 md:w-24 h-[1px] bg-white/40 game-ui-text"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
