import React from 'react';
import { Github, Twitter, Youtube, Twitch, Disc as Discord } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Footer = React.memo(function Footer() {
  useScrollReveal();
  return (
    <footer className="text-[#D0D0D0] py-16 border-t border-white/10 reveal-section relative z-10" style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px', background: 'radial-gradient(ellipse at top, rgba(45, 27, 45, 0.4) 0%, rgba(15, 15, 15, 0.95) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center slide-in-left">
        <div className="flex gap-10 mb-12 p-4">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-[#D0D0D0] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.8)] hover:text-[#FFB7C5] hover:-translate-y-1">
            <Youtube className="w-6 h-6" />
            <span className="sr-only">YouTube</span>
          </a>
          <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-[#D0D0D0] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.8)] hover:text-[#FFB7C5] hover:-translate-y-1">
            <Twitch className="w-6 h-6" />
            <span className="sr-only">Twitch</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-[#D0D0D0] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.8)] hover:text-[#FFB7C5] hover:-translate-y-1">
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-[#D0D0D0] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.8)] hover:text-[#FFB7C5] hover:-translate-y-1">
            <Discord className="w-6 h-6" />
            <span className="sr-only">Discord</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-[#D0D0D0] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,183,197,0.8)] hover:text-[#FFB7C5] hover:-translate-y-1">
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        <p className="text-sm font-medium italic text-zinc-500">
          &copy; {new Date().getFullYear()} FH6 Creator Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

export default Footer;
