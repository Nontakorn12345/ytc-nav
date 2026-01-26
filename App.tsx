import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapDisplay from './components/MapDisplay';
import BuildingModal from './components/BuildingModal';
import AdminPanel from './components/AdminPanel';
import { BUILDINGS as INITIAL_BUILDINGS, LOCATIONS as INITIAL_LOCATIONS } from './constants';
import { NavState, Building } from './types';
import { getSmartAdvice } from './services/geminiService';

const STORAGE_KEY = 'ytc_nav_data';

const App: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [state, setState] = useState<NavState>({
    currentLocation: '',
    destination: '',
    showMap: false,
    selectedBuilding: null,
    isAdminMode: false,
  });

  const [step, setStep] = useState(1);
  const [tempSelection, setTempSelection] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Load data from LocalStorage or Initial Constants
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setBuildings(JSON.parse(savedData));
    } else {
      setBuildings(INITIAL_BUILDINGS);
    }
  }, []);

  const handleConfirm = async () => {
    if (!tempSelection) return;

    if (step === 1) {
      setState(prev => ({ ...prev, currentLocation: tempSelection }));
      setTempSelection('');
      setStep(2);
    } else {
      if (tempSelection === state.currentLocation) {
        alert("คุณอยู่ที่นี่แล้วครับ กรุณาเลือกจุดหมายอื่น");
        return;
      }
      
      setIsLoading(true);
      setState(prev => ({ ...prev, destination: tempSelection, showMap: true }));
      setStep(3);

      const fromName = buildings.find(b => b.id === state.currentLocation)?.name || '';
      const toName = buildings.find(b => b.id === tempSelection)?.name || '';
      const smartAdvice = await getSmartAdvice(fromName, toName);
      setAdvice(smartAdvice);
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setTempSelection(state.currentLocation);
      setState(prev => ({ ...prev, currentLocation: '' }));
    } else if (step === 3) {
      setStep(2);
      setTempSelection(state.destination);
      setState(prev => ({ ...prev, showMap: false, destination: '' }));
    }
  };

  const reset = () => {
    setState({ ...state, currentLocation: '', destination: '', showMap: false, selectedBuilding: null });
    setStep(1);
    setTempSelection('');
    setAdvice('');
  };

  const saveAdminData = (updatedBuildings: Building[]) => {
    setBuildings(updatedBuildings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBuildings));
  };

  const locations = buildings.map(b => ({ label: b.name, value: b.id }));

  return (
    <div className="h-full flex flex-col max-w-md mx-auto bg-[#f8fafc] shadow-2xl relative overflow-hidden">
      {/* คลิกค้างที่ Header 2 วินาทีเพื่อเปิด Admin Mode */}
      <div onContextMenu={(e) => { e.preventDefault(); setState(prev => ({ ...prev, isAdminMode: true })); }}>
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-40 no-scrollbar">
        {!state.showMap ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center text-white">
                  <i className={`fas ${step === 1 ? 'fa-street-view' : 'fa-map-location-dot'} text-2xl`}></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {step === 1 ? 'คุณอยู่ที่ไหน?' : 'จะไปที่ไหนดี?'}
                  </h2>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1">วิทยาลัยเทคนิคยโสธร</p>
                </div>
              </div>
              
              {step === 2 && (
                <button 
                  onClick={goBack}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 active:scale-90 transition-all hover:bg-slate-200"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {locations.filter(l => step === 1 || l.value !== state.currentLocation).map(loc => (
                <button
                  key={loc.value}
                  onClick={() => setTempSelection(loc.value)}
                  className={`group p-5 rounded-[2rem] text-left border-2 transition-all flex items-center gap-5 active:scale-[0.98] ${
                    tempSelection === loc.value 
                    ? 'border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-100' 
                    : 'border-white bg-white shadow-sm hover:border-slate-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    tempSelection === loc.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <i className="fas fa-building text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <span className={`block font-bold text-lg ${tempSelection === loc.value ? 'text-blue-700' : 'text-slate-700'}`}>
                      {loc.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Campus Building</span>
                  </div>
                  {tempSelection === loc.value && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white animate-in zoom-in">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
              <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white flex items-center gap-4 shadow-2xl">
                <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">เริ่มต้น</p>
                    <p className="text-sm font-bold truncate">{buildings.find(b => b.id === state.currentLocation)?.name}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center border border-blue-500/20">
                    <i className="fas fa-chevron-right text-blue-400 text-xs"></i>
                </div>
                <div className="flex-1 text-right">
                    <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">จุดหมาย</p>
                    <p className="text-sm font-bold truncate text-blue-300">{buildings.find(b => b.id === state.destination)?.name}</p>
                </div>
              </div>
              
              <button 
                onClick={goBack}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-800 border border-slate-100 active:scale-90 transition-all z-10"
              >
                <i className="fas fa-edit text-xs"></i>
              </button>
            </div>

            <MapDisplay from={state.currentLocation} to={state.destination} />

            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-white relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                        <i className="fas fa-robot text-xs"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Guide Advice</span>
                </div>
                {isLoading ? (
                    <div className="flex items-center gap-3 py-1">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-slate-400 font-medium">กำลังค้นหาเส้นทางที่ดีที่สุด...</p>
                    </div>
                ) : (
                    <p className="text-slate-700 text-[15px] font-medium leading-relaxed italic">
                        "{advice}"
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                  onClick={() => {
                    const b = buildings.find(b => b.id === state.destination);
                    if (b) setState(prev => ({ ...prev, selectedBuilding: b }));
                  }}
                  className="bg-white py-5 rounded-[2rem] font-bold text-sm text-slate-700 shadow-lg border border-white flex items-center justify-center gap-2 active:scale-95 transition-all"
               >
                  <i className="fas fa-info-circle text-blue-600"></i>
                  <span>ข้อมูลอาคาร</span>
               </button>
               <button 
                  onClick={reset}
                  className="bg-slate-800 py-5 rounded-[2rem] font-bold text-sm text-white shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
               >
                  <i className="fas fa-redo-alt"></i>
                  <span>เริ่มใหม่ทั้งหมด</span>
               </button>
            </div>
          </div>
        )}
      </main>

      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pb-10 pt-6 transition-all duration-500 cubic-bezier transform ${(!state.showMap && tempSelection) ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-x-0 bottom-0 top-0 bg-white/60 backdrop-blur-2xl border-t border-white/30 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] rounded-t-[3rem]"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-1.5 bg-slate-300/40 rounded-full mb-6"></div>
          
          <button 
            onClick={handleConfirm}
            className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-bold text-lg shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 active:scale-[0.97] transition-all"
          >
            <span>{step === 1 ? 'ยืนยันที่ตั้งปัจจุบัน' : 'ไปที่ตึกนี้เลย!'}</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>

      {state.selectedBuilding && (
        <BuildingModal 
          building={state.selectedBuilding} 
          onClose={() => setState(prev => ({ ...prev, selectedBuilding: null }))} 
        />
      )}

      {state.isAdminMode && (
        <AdminPanel 
          buildings={buildings}
          onSave={saveAdminData}
          onClose={() => setState(prev => ({ ...prev, isAdminMode: false }))}
        />
      )}
    </div>
  );
};

export default App;