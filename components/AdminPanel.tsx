
import React from 'react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-600 p-8 text-white relative">
          <div className="absolute top-4 right-4">
             <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
               <i className="fas fa-times"></i>
             </button>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
            <i className="fas fa-shield-halved text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">ข้อมูลและความช่วยเหลือ</h2>
          <p className="text-blue-100 text-sm mt-1">YTC Navigation System v1.0.0</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                <i className="fas fa-building"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">วิทยาลัย</p>
                <p className="text-slate-700 font-bold">วิทยาลัยเทคนิคยโสธร</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">เบอร์โทรศัพท์ติดต่อ</p>
                <p className="text-slate-700 font-bold">045-711-576</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                <i className="fas fa-globe"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">เว็บไซต์</p>
                <a href="https://www.ytc.ac.th" target="_blank" className="text-blue-600 font-bold hover:underline">www.ytc.ac.th</a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-medium text-center leading-relaxed">
              แอปพลิเคชันนี้พัฒนาขึ้นเพื่ออำนวยความสะดวกในการเดินทาง<br/>
              ภายในวิทยาลัยเทคนิคยโสธร โดยใช้เทคโนโลยี AI จาก Google Gemini
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all"
          >
            ปิดหน้าต่างนี้
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
