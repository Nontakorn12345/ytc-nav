import React, { useState } from 'react';
import { MAP_IMAGE_URL } from '../constants';

interface MapDisplayProps {
  from: string;
  to: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ from, to }) => {
  const [hasError, setHasError] = useState(false);

  // รูปสำรองกรณีไม่มีไฟล์ campus-map.jpg
  const fallbackMap = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&h=800&fit=crop';

  return (
    <div className="w-full bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white relative group">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
         <div className="bg-white/95 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 md:gap-3">
            <div className={`w-2 h-2 rounded-full ${hasError ? 'bg-amber-500' : 'bg-blue-600 animate-ping'}`}></div>
            <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-widest">
              {hasError ? 'กำลังใช้แผนที่ตัวอย่าง' : 'แผนที่วิทยาลัย'}
            </span>
         </div>
      </div>

      <div className="relative h-[45vh] md:h-[55vh] min-h-[350px] md:min-h-[450px] overflow-auto no-scrollbar bg-slate-100 flex items-center justify-center cursor-move touch-pan-x touch-pan-y">
        <img 
          src={hasError ? fallbackMap : MAP_IMAGE_URL} 
          alt="Campus Map" 
          onError={() => setHasError(true)}
          className="max-w-none h-full object-contain scale-[1.5] md:scale-100 transition-transform duration-1000 origin-center" 
        />
        
        {/* Simulation Markers */}
        <div className="absolute inset-0 pointer-events-none">
           {/* Marker Start */}
           <div className="absolute top-[35%] left-[30%] flex flex-col items-center animate-in fade-in duration-1000">
              <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-2xl z-10"></div>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold mt-2 shadow-lg border border-white/20">เริ่มต้น</div>
           </div>
           
           {/* Marker End */}
           <div className="absolute top-[55%] left-[60%] flex flex-col items-center animate-in slide-in-from-top-4 duration-1000">
              <div className="relative">
                <i className="fas fa-location-dot text-red-600 text-4xl drop-shadow-2xl animate-bounce"></i>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-[100%] blur-sm"></div>
              </div>
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-bold mt-2 shadow-2xl border border-white/20">จุดหมาย</div>
           </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2 md:gap-3">
            <i className="fas fa-hand-pointer text-blue-500"></i>
            <span>ใช้นิ้วเลื่อนเพื่อดูจุดอื่นๆ ในแผนที่</span>
          </div>
        </div>
        
        {hasError && (
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
            <i className="fas fa-lightbulb text-amber-500 mt-0.5"></i>
            <div className="text-[11px] text-amber-800 font-medium leading-relaxed">
              <strong>วิธีใส่รูปแผนที่ของพี่:</strong> สร้างโฟลเดอร์ <code className="bg-amber-100 px-1 rounded">public/images</code> แล้วนำไฟล์รูปไปวางโดยตั้งชื่อว่า <code className="bg-amber-100 px-1 rounded">campus-map.jpg</code> แผนที่จริงจะปรากฏขึ้นทันทีครับ!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapDisplay;
