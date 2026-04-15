import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sakura() {
  const [petals, setPetals] = useState<{ id: number; left: string; animationDuration: string; animationDelay: string; width: string; height: string }[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingFast, setIsScrollingFast] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Increase particle count to 50
    const newPetals = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 6 + 10}s`, // Slower fall for 50 particles
      animationDelay: `${Math.random() * 10}s`,
      width: `${Math.random() * 12 + 8}px`,
      height: `${Math.random() * 12 + 8}px`,
    }));
    setPetals(newPetals);

    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let scrollTimeout: NodeJS.Timeout;

    const observer = new IntersectionObserver((entries) => {
      // If we scroll past the first 1.5 viewport heights (e.g. past Map), pause/hide
      // We can observe the body or a specific element, but scroll is fine for global depth.
      // Actually, since we want to pause when scrolling deep, let's just use the scroll listener we already have,
      // but ensure it completely unmounts or pauses.
    });

    // Hide animation when scrolled past Hero/Map sections to save CPU
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);

      if (timeDiff > 0) {
        const speed = scrollDiff / timeDiff;
        if (speed > 2) { // Threshold for fast scrolling
          setIsScrollingFast(true);
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrollingFast(false);
          }, 150); // Reset after 150ms of no fast scrolling
        }
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;

      // Unmount if scrolled past 1.5x viewport height
      if (currentScrollY > window.innerHeight * 1.5) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll(); // Initial check

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden" style={{ opacity: isScrollingFast ? 0.2 : 1, transition: 'opacity 0.2s ease' }}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal absolute top-[-10%]"
          style={{
            left: petal.left,
            width: petal.width,
            height: petal.height,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: 0.6,
            background: 'linear-gradient(135deg, #ffb7c5, #ff9eaf)',
            borderRadius: '150% 0 150% 0',
            boxShadow: '0 0 10px rgba(255, 183, 197, 0.5)',
            animationPlayState: isScrollingFast ? 'paused' : 'running'
          }}
        />
      ))}
    </div>
  );
}
