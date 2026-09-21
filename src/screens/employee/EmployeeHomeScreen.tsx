import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../store';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';

export default function EmployeeHomeScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { currentUserId, employees } = useAppContext();
  const currentUser = employees.find(e => e.id === currentUserId);
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Location states
  const [locationVerified, setLocationVerified] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationMsg, setLocationMsg] = useState('');
  
  const dateStr = currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTimeStr = (d: Date | null) => {
    if (!d) return '--:-- --';
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const getWorkingHours = () => {
    if (!checkInTime) return '00:00:00';
    const diff = Math.floor((currentTime.getTime() - checkInTime.getTime()) / 1000);
    const h = Math.floor(diff / 3600).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationMsg('Detecting location...');
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate verifying against workplace coordinates
          setTimeout(() => {
            setLocationVerified(true);
            setIsLocating(false);
            setLocationMsg('Workplace verified');
          }, 800);
        },
        (error) => {
          setIsLocating(false);
          setLocationMsg('Location access denied');
        }
      );
    } else {
      setIsLocating(false);
      setLocationMsg('Geolocation not supported');
    }
  };

  const handleCheckInOut = () => {
    if (!isCheckedIn) {
      if (!locationVerified) return;
      setCheckInTime(new Date());
      setIsCheckedIn(true);
    } else {
      setIsCheckedIn(false);
      setLocationVerified(false); // Reset for next check-in
      setLocationMsg('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white pt-10 pb-6 px-4 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={currentUser?.avatar} alt={currentUser?.name} className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-white/20" />
            <div>
              <p className="text-xs text-emerald-100">Good Morning</p>
              <h1 className="text-lg font-bold">{currentUser?.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 flex-1 flex flex-col">
        <p className="text-center text-sm text-gray-500 font-medium mb-8">{dateStr}</p>
        
        {/* Working Hours Clock (if checked in) */}
        {isCheckedIn ? (
          <div className="flex flex-col items-center justify-center mb-8">
            <p className="text-xs text-gray-500 mb-2">Working Hours</p>
            <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
              {getWorkingHours()}
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Hours</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mb-8 opacity-0">
            <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">00:00:00</div>
          </div>
        )}

        {/* Big Action Button */}
        <div className="flex flex-col items-center mb-10">
          {!isCheckedIn && !locationVerified && (
            <button 
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="mb-6 flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-full font-medium text-sm transition-colors border border-indigo-100 disabled:opacity-50"
            >
              {isLocating ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
              <span>{isLocating ? 'Detecting Location...' : 'Auto-detect Location'}</span>
            </button>
          )}

          {!isCheckedIn && locationVerified && (
            <div className="mb-6 flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full font-medium text-sm border border-emerald-100">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>{locationMsg}</span>
            </div>
          )}

          {!isCheckedIn && locationMsg && !locationVerified && !isLocating && (
            <div className="mb-6 flex items-center space-x-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-full font-medium text-sm border border-red-100">
              <MapPin size={16} />
              <span>{locationMsg}</span>
            </div>
          )}

          <button 
            onClick={handleCheckInOut}
            disabled={!isCheckedIn && !locationVerified}
            className={`w-48 h-48 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all ${
              !isCheckedIn && !locationVerified ? 'opacity-50 cursor-not-allowed bg-gray-300 shadow-none' : 'active:scale-95'
            } ${
              isCheckedIn 
                ? 'bg-red-500 shadow-red-200' 
                : (!isCheckedIn && locationVerified ? 'bg-emerald-500 shadow-emerald-200' : '')
            }`}
          >
            <span className="text-white text-xl font-bold tracking-wider mb-2">
              {isCheckedIn ? 'CHECK OUT' : 'CHECK IN'}
            </span>
            <span className="text-white/80 text-sm font-medium">
              {formatTimeStr(currentTime)}
            </span>
          </button>
        </div>

        {/* Today's Status Box */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-auto">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Today's Status</h2>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Check In</span>
            <span className="text-sm font-medium text-gray-900">{isCheckedIn ? formatTimeStr(checkInTime) : '--:--'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Check Out</span>
            <span className="text-sm font-medium text-gray-900">--:--</span>
          </div>
        </div>
      </div>
    </div>
  );
}
