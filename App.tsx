import React, { useState, useMemo } from 'react';
import { BUILDINGS } from './constants';
import { NavState } from './types';
import Header from './components/Header';
import MapDisplay from './components/MapDisplay';
import BuildingModal from './components/BuildingModal';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [state, setState] = useState<NavState>({
    currentLocation: '',
    destination: '',
    showMap: false,
    selectedBuilding: null,
    isAdminMode: false,
  });
  const [step, setStep] = useState(1);
  const [tempSelection, setTempSelection] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQR, setShowQR] = useState(false);

  const filteredBuildings = useMemo(() => {
    return BUILDINGS
      .filter(l => step === 1 || l.id !== state.currentLocation)
      .filter(l => 
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (l.department && l.department.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [step, state.currentLocation, searchQuery]);

  const handleConfirm = () => {
    if (!tempSelection) return;
    if (step === 1) {
      setState(prev => ({ ...prev, currentLocation: tempSelection }));
      setTempSelection('');
      setSearchQuery('');
      setStep(2);
    } else {
      setState(prev => ({ ...prev, destination: tempSelection, showMap: true }));
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setTempSelection(state.currentLocation);
      setState(prev => ({ ...prev, currentLocation: '' }));
    }
  };

  const reset = () => {
    setState({ 
      currentLocation: '', 
      destination: '', 
      showMap: false, 
      selectedBuilding: null,
      isAdminMode: false 
    });
    setStep(1);
    setTempSelection('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFF] font-kanit select-none">
      <Header onShowQR={() => setShowQR(true)} />
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8">
        {!state.showMap ? (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center mb-8">
               <div className="flex items-center justify-center gap-4 mb-2">
                 {step === 2 && (
                   <button onClick={handleBack} className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center active:scale-90 transition-all">
                     <i className="fas fa-arrow-left"></i>
                   </button>
                 )}
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                   {step === 1 ? 'เริ่มต้นจากที่ไหน?' : 'กำลังจะไปที่ไหน?'}
                 </h2>
               </div>
               <div className="flex justify-center gap-2">
                  <div className={`h-2 w-12 rounded-full transition-all duration-500 ${step === 1 ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-green-500'}`}></div>
                  <div className={`h-2 w-12 rounded-full transition-all duration-500 ${step === 2 ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-200'}`}></div>
               </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <i className="fas fa-search"></i>
              </div>
              <input 
                type="text"
                placeholder="ค้นหาชื่อตึกหรือแผนก..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-5 pl-12 pr-6 font-medium text-slate-700 focus:border-blue-500 focus:outline-none shadow-sm focus:shadow-blue-50 transition-all text-lg"
              />
            </div>

            {/* เพิ่ม pb-52 เพื่อให้รายการสุดท้ายไม่โดนปุ่มยืนยันบัง */}
            <div className="grid grid-cols-1 gap-4 pb-52">
              {filteredBuildings.length > 0 ? (
                filteredBuildings.map(loc => (
                  <button 
                    key={loc.id} 
                    onClick={() => setTempSelection(loc.id)} 
                    className={`p-6 rounded-[2rem] text-left border-2 transition-all duration-300 flex items-center gap-5 ${
                      tempSelection === loc.id 
                        ? 'border-blue-600 bg-blue-50/50 shadow-xl scale-[1.02] ring-4 ring-blue-50' 
                        : 'border-white bg-white shadow-sm hover:border-slate-100'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all text-xl ${
                      tempSelection === loc.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 -rotate-3' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <i className={`fas ${step === 1 ? 'fa-street-view' : 'fa-location-dot'}`}></i>
                    </div>
                    <div className="flex-1">
                      <p className={`font-black text-xl leading-none transition-colors mb-1 ${tempSelection === loc.id ? 'text-blue-700' : 'text-slate-800'}`}>
                        {loc.name}
                      </p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{loc.department || 'อาคารส่วนกลาง'}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <i className="fas fa-magnifying-glass text-slate-200 text-3xl"></i>
                   </div>
                   <p className="text-slate-400 font-bold text-lg">ไม่พบข้อมูลอาคารที่คุณค้นหา</p>
                </div>
              )}
            </div>

            {tempSelection && (
              <div className="fixed bottom-10 left-5 right-5 flex justify-center z-40 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <button 
                  onClick={handleConfirm} 
                  className="w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 rounded-[2.2rem] font-black text-2xl shadow-[0_20px_50px_rgba(29,78,216,0.3)] active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  <span>{step === 1 ? 'ยืนยันที่ตั้งปัจจุบัน' : 'ยืนยันที่หมาย'}</span>
                  <i className="fas fa-check text-lg"></i>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl flex items-center gap-5 border border-slate-100">
               <div className="flex-1 overflow-hidden">
                 <p className="text-[10px] text-slate-400 font-black uppercase mb-1 tracking-tighter">จากจุดเริ่มต้น</p>
                 <p className="font-bold text-slate-800 truncate text-lg">
                   {BUILDINGS.find(b => b.id === state.currentLocation)?.name}
                 </p>
               </div>
               <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 shadow-inner">
                 <i className="fas fa-arrow-right-long text-blue-500 text-lg"></i>
               </div>
               <div className="flex-1 text-right overflow-hidden">
                 <p className="text-[10px] text-blue-500 font-black uppercase mb-1 tracking-tighter">ถึงปลายทาง</p>
                 <p className="font-bold text-blue-600 truncate text-lg">
                   {BUILDINGS.find(b => b.id === state.destination)?.name}
                 </p>
               </div>
            </div>

            <MapDisplay from={state.currentLocation} to={state.destination} />

            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => {
                  const dest = BUILDINGS.find(b => b.id === state.destination);
                  if (dest) setState(prev => ({ ...prev, selectedBuilding: dest }));
                }}
                className="w-full bg-white text-slate-800 py-6 rounded-3xl font-black text-xl border-2 border-slate-100 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <i className="fas fa-circle-info text-blue-600"></i>
                ดูข้อมูลอาคารปลายทาง
              </button>
              
              <button 
                onClick={reset} 
                className="w-full bg-slate-100 text-slate-500 py-6 rounded-3xl font-bold text-lg active:scale-95 transition-all hover:bg-slate-200"
              >
                <i className="fas fa-rotate-left mr-2"></i>
                ค้นหาเส้นทางใหม่
              </button>
            </div>
          </div>
        )}
      </main>

      {state.selectedBuilding && (
        <BuildingModal 
          building={state.selectedBuilding} 
          onClose={() => setState(prev => ({ ...prev, selectedBuilding: null }))} 
        />
      )}

      {showQR && <AdminPanel onClose={() => setShowQR(false)} />}
    </div>
  );
};

export default App;
