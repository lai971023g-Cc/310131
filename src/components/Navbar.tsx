import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth, loginWithGoogle, logout } from '../firebase';
import { LogIn, LogOut, UserCircle, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

const Navbar = React.memo(function Navbar() {
  const [user, setUser] = useState(auth.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'My Garage', path: '/garage' },
    { name: 'Profile / About Me', path: '/hobbies' },
    { name: 'Community Dojo', path: '/community' },
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-md border-b border-zinc-800 shadow-lg' 
          : 'bg-transparent border-transparent shadow-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-red-600 rounded-sm transform rotate-45 shadow-[0_0_10px_rgba(220,38,38,0.8)] group-hover:bg-[#FFB7C5] group-hover:shadow-[0_0_20px_rgba(255,183,197,0.8)] transition-all duration-300"></div>
          <span className="font-black text-xl tracking-tighter text-white drop-shadow-md group-hover:text-[#FFB7C5] transition-colors duration-300">FH6<span className="text-red-600 group-hover:text-[#FFB7C5] transition-colors duration-300">HUB</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={handleLinkClick}
              className={`text-sm font-bold transition-all duration-300 drop-shadow-md ${
                location.pathname === link.path 
                  ? 'text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                  : 'text-zinc-100 hover:text-[#FFB7C5] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.5)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-zinc-100 font-medium drop-shadow-md">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-zinc-600" />
                ) : (
                  <UserCircle className="w-8 h-8 text-zinc-300" />
                )}
                <span>{user.displayName}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-bold text-zinc-200 hover:text-[#FFB7C5] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.5)] transition-all duration-300 drop-shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-2 text-sm font-bold bg-red-600 text-white px-5 py-2 rounded-full hover:bg-[#FFB7C5] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)]"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white drop-shadow-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-zinc-800 px-6 py-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={handleLinkClick}
              className={`text-base font-bold transition-all duration-300 ${
                location.pathname === link.path 
                  ? 'text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                  : 'text-zinc-200 hover:text-[#FFB7C5] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.5)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
});

export default Navbar;
