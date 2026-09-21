import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ChevronLeft, Store, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function SettingsScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { business, setBusiness } = useAppContext();
  const [sundayLeave, setSundayLeave] = useState(business?.sundaySetting ?? true);

  const handleToggleSunday = () => {
    const newVal = !sundayLeave;
    setSundayLeave(newVal);
    if (business) {
      setBusiness({ ...business, sundaySetting: newVal });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem] flex items-center">
        <button onClick={() => navigateTo(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-10">Business Settings</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <Store size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Business Profile</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Weekly Off Day</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-1">
              <span>Sunday</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-50 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Sunday Compulsory Leave</p>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">If enabled, Sunday will be counted as weekly off</p>
            </div>
            <button 
              onClick={handleToggleSunday}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${sundayLeave ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${sundayLeave ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Working Hours</span>
            </div>
            <span className="text-sm text-gray-900 font-medium">09:00 AM - 08:00 PM</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Late Mark After</span>
            </div>
            <span className="text-sm text-gray-900 font-medium">09:15 AM</span>
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Salary Day</span>
            </div>
            <span className="text-sm text-gray-900 font-medium">1st of Every Month</span>
          </div>
        </div>

        <button 
          onClick={() => navigateTo(null)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
