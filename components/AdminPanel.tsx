import React, { useState } from 'react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  
  // Use current window location
  const currentUrl = window.location.href.split('?')[0].split('#')[0];
  const isLocalhost = currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1');
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}&bgcolor=ffffff&color=1d4ed8&margin=10`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-5" onClick={onClose}>
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <i className="fas fa-times text-xs"></i>
          </button>
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
             <i className="fas fa-share-nodes text-2xl text-blue-600"></i>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">แชร์แอปนำทาง</h2>
          <p className="text-blue-100 text-xs mt-1 font-medium">สแกนเพื่อเปิดใช้งานบนมือถือ</p>
        </div>

        <div className="p-8 flex flex-col items-center">
          <div className="bg-white p-2 rounded-3xl shadow-2xl border-2 border-slate-50 mb-4 transform hover:scale-105 transition-transform duration-500">
            <img 
              src={qrUrl} 
              alt="App QR Code" 
              className="w-44 h-44 rounded-2xl"
            />
          </div>

          <div className="mb-8 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ลิงก์ปัจจุบันของคุณคือ</p>
            <p className="text-xs font-medium text-blue-600 break-all px-4">{currentUrl}</p>
            {isLocalhost && (
              <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-[9px] text-amber-700 font-bold leading-tight uppercase">
                  <i className="fas fa-triangle-exclamation mr-1"></i>
                  คำเตือน: ลิงก์ Localhost จะสแกนไม่ติด <br/> ต้องเอาขึ้น Vercel ก่อนครับ
                </p>
              </div>
            )}
          </div>
          
          <div className="w-full space-y-3">
            <button 
              onClick={handleCopy}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${
                copied ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className={`fas ${copied ? 'fa-check-circle' : 'fa-link'}`}></i>
              {copied ? 'คัดลอกสำเร็จ!' : 'คัดลอกลิงก์'}
            </button>
            
            <button 
              onClick={onClose}
              className="w-full py-4 rounded-2xl font-bold bg-slate-900 text-white active:scale-95 transition-all shadow-lg"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
