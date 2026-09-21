import React from 'react';
import { useAppContext } from '../store';
import { Settings, LogOut, Briefcase, FileCheck, CircleDollarSign } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MoreScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { business } = useAppContext();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem]">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner">
            <Briefcase size={28} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{business?.name || 'My Business'}</h1>
            <p className="text-xs text-indigo-200">Owner Profile</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        
        {/* Quick Links */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3 ml-1">Management</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <MenuRow 
              icon={<FileCheck size={20} className="text-blue-500" />} 
              label="Leave Requests" 
              badge="2 Pending"
              onClick={() => navigateTo('leave_approval')} 
            />
            <div className="w-full h-px bg-gray-50 ml-12"></div>
            <MenuRow 
              icon={<CircleDollarSign size={20} className="text-emerald-500" />} 
              label="Salary & Payments" 
              onClick={() => navigateTo('salary_calculation')} 
            />
            <div className="w-full h-px bg-gray-50 ml-12"></div>
            <MenuRow 
              icon={<FileCheck size={20} className="text-purple-500" />} 
              label="Payment History" 
              onClick={() => navigateTo('payment_history')} 
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3 ml-1">System</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <MenuRow 
              icon={<Settings size={20} className="text-gray-500" />} 
              label="Business Settings" 
              onClick={() => navigateTo('settings')} 
            />
            <div className="w-full h-px bg-gray-50 ml-12"></div>
            <MenuRow 
              icon={<LogOut size={20} className="text-red-500" />} 
              label="Logout" 
              textColor="text-red-600"
              onClick={() => navigateTo('setup')} 
              hideArrow
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function MenuRow({ icon, label, badge, textColor = "text-gray-700", hideArrow = false, onClick }: { icon: React.ReactNode, label: string, badge?: string, textColor?: string, hideArrow?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className={cn("text-sm font-medium", textColor)}>{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {badge && <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
        {!hideArrow && <span className="text-gray-300">›</span>}
      </div>
    </button>
  );
}
