
import React from 'react';
import { PenTool, Crown, Layers } from 'lucide-react';
import { APP_NAME, APP_DESCRIPTION } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      
      <div className="inline-flex items-center justify-center gap-3 mb-4 animate-fade-in-down">
        <img 
          src="https://img.icons8.com/color/96/bee.png" 
          alt="Bee Logo" 
          className="w-8 h-8 drop-shadow-lg"
          referrerPolicy="no-referrer"
        />
        <span className="text-gold-400 tracking-[0.2em] text-sm uppercase font-semibold">YouTuTu</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight drop-shadow-2xl animate-text-glow">
        {APP_NAME}
      </h1>
      
      <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-light">
        {APP_DESCRIPTION}
      </p>

      <div className="mt-8 flex justify-center">
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full opacity-70"></div>
      </div>
    </header>
  );
};

export default Header;
