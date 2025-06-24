"use client"

import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
      if (onFinish) onFinish();
    }, 2200); // 2.2s loading
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-transform duration-[4000ms] ease-in-out bg-black ${
        hide ? 'translate-y-[-100vh] pointer-events-none' : 'translate-y-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Loader spinner */}
        <div className="mb-6">
          <span className="block w-16 h-16 border-4 border-cyan-400 border-t-purple-500 border-b-purple-500 border-r-cyan-400 rounded-full animate-spin" />
        </div>
        <div className="text-5xl md:text-7xl font-extrabold text-white animate-pulse drop-shadow-lg">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Shamil</span>
        </div>
        <div className="text-lg md:text-2xl text-white/80 tracking-wider animate-fade-in-up">
          Welcome to my portfolio
        </div>
        <div className="mt-10 w-[20rem] h-5 rounded-full bg-neutral-800 overflow-hidden shadow-lg flex items-center">
          <div className="h-4 w-1/3 animate-gradient-loading rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 8s cubic-bezier(.4,0,.2,1) 5s both;
        }
        @keyframes gradient-loading {
          0% { margin-left: 0%; width: 33%; }
          50% { margin-left: 33%; width: 40%; }
          100% { margin-left: 67%; width: 33%; }
        }
        .animate-gradient-loading {
          animation: gradient-loading 1.6s cubic-bezier(.4,0,.2,1) infinite;
        }
      `}</style>
    </div>
  );
}
