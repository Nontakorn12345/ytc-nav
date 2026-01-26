import React from 'react';
import { Building } from '../types';

interface BuildingModalProps {
  building: Building;
  onClose: () => void;
}

const BuildingModal: React.FC<BuildingModalProps> = ({ building, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/70 backdrop-blur-md p-0 md:p-6" onClick={onClose}>
      <div 
        className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:zoom-in duration-300 flex flex-col max-h-[90vh] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Area - Horizontal at Top */}
        <div className="relative h-52 md:h-72 w-full shrink-0">
          <img 
            src={building.image} 
            alt={building.name} 
            className="w-full h-full object-cover" 
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
          
          {/* Content Over Image */}
          <div className="absolute bottom-6 left-6 right-6">
             <p className="text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
               {building.department || 'อาคารส่วนกลาง'}
             </p>
             <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
               {building.name}
             </h2>
          </div>

          {/* Close Button Over Image (Mobile Only) */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white md:hidden flex items-center justify-center border border-white/20"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="p-6 md:p-10 overflow-y-auto no-scrollbar bg-white flex flex-col">
          {/* Desktop Title & Close Row */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">รายละเอียดข้อมูลอาคาร</h3>
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center border border-slate-100"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
          
          {/* Mobile Drag Indicator */}
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6 md:hidden"></div>
          
          <div className="space-y-8">
            <section>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                {building.description}
              </p>
            </section>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ความสูง</p>
                    <p className="text-lg font-bold text-slate-800">{building.floors} ชั้น</p>
                  </div>
               </div>
               <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <i className="fas fa-hashtag"></i>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">รหัสอาคาร</p>
                    <p className="text-lg font-bold text-slate-800">{building.id.toUpperCase()}</p>
                  </div>
               </div>
            </div>

            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <i className="fas fa-door-open text-blue-500"></i>
                หน่วยงาน / ห้องเรียนสำคัญ
              </h3>
              <div className="flex flex-wrap gap-2">
                {building.rooms.map((room, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 text-xs md:text-sm px-5 py-2.5 rounded-2xl border border-blue-100 font-bold">
                    {room}
                  </span>
                ))}
              </div>
            </section>
          </div>
          
          <div className="mt-10 md:mt-12 sticky bottom-0 bg-white pt-4 pb-2">
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span>รับทราบข้อมูล</span>
              <i className="fas fa-check-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingModal;