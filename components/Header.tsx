import React from 'react';

const Header: React.FC<{ onShowQR: () => void }> = ({ onShowQR }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <i className="fas fa-map-location-dot text-sm"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-800 leading-none tracking-tight">YTC Nav</h1>
              <span className="bg-blue-100 text-blue-600 text-[8px] px-1.5 py-0.5 rounded-md font-bold">v1.3</span>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-1">Yasothon Technical College</p>
          </div>
        </div>
        
        <button 
          onClick={onShowQR}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 active:scale-95 transition-all shadow-sm"
        >
          <i className="fas fa-qrcode text-xs"></i>
          <span className="text-xs font-bold uppercase">Share</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
