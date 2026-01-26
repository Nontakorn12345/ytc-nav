import React from 'react';
import { MAP_IMAGE_URL } from '../constants';

interface MapDisplayProps {
  from: string;
  to: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ from, to }) => {
  return (
    <div className="w-full bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white relative group">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
         <div className="bg-white/95 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></div>
            <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-widest">จุดแนะนำเส้นทาง</span>
         </div>
      </div>

      <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] overflow-auto no-scrollbar bg-slate-100 flex items-center justify-center cursor-move touch-pan-x touch-pan-y">
        <img 
          src={MAP_IMAGE_URL} 
          alt="Campus Map" 
          className="max-w-none h-full object-contain scale-[1.8] sm:scale-125 md:scale-100 transition-transform duration-1000" 
        />
        
        {/* Simulation Markers with Animations */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-[30%] left-[25%] flex flex-col items-center animate-in fade-in duration-1000">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded-full border-4 border-white shadow-2xl z-10"></div>
              <div className="bg-blue-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold mt-2 shadow-lg border border-white/20">คุณอยู่ที่นี่</div>
           </div>
           
           <div className="absolute top-[60%] left-[65%] flex flex-col items-center animate-in slide-in-from-top-4 duration-1000">
              <div className="relative">
                <i className="fas fa-location-dot text-red-600 text-3xl md:text-4xl drop-shadow-2xl animate-bounce"></i>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-[100%] blur-sm"></div>
              </div>
              <div className="bg-red-600 text-white px-3 py-0.5 md:px-4 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold mt-2 shadow-2xl border border-white/20">เป้าหมาย</div>
           </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-2 md:gap-3">
          <i className="fas fa-hand-pointer text-blue-500"></i>
          <span>ใช้สองนิ้วเลื่อนเพื่อสำรวจ</span>
        </div>
        <div className="bg-white px-5 py-2 rounded-full border border-slate-200 text-blue-600 shadow-sm">
          ระยะเดิน: ~ 300 เมตร
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;