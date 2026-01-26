
import React from 'react';

const Header: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'YTC Nav - นำทางเทคนิคยโสธร',
          text: 'แอปนำทางภายในวิทยาลัยเทคนิคยโสธร ใช้งานฟรี!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์เรียบร้อยแล้ว!');
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <i className="fas fa-map-marked-alt text-sm"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-slate-800 leading-none">YTC Nav</h1>
              <span className="bg-green-100 text-green-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">Free</span>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">วิทยาลัยเทคนิคยโสธร</p>
          </div>
        </div>
        
        <button 
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 active:scale-90 transition-transform"
        >
          <i className="fas fa-share-alt text-sm"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
