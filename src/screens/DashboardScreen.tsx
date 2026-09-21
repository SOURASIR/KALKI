import React from 'react';
import { useAppContext } from '../store';
import { ChevronRight, Bell, FileText } from 'lucide-react';

export default function DashboardScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { business, employees } = useAppContext();

  // Mock data for dashboard
  const stats = {
    totalEmployees: employees.length,
    present: 4,
    absent: 1,
    onLeave: 0,
    late: 1
  };

  const attendancePercentage = 80;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white pt-10 pb-6 px-4 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold">SM</span>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <p className="text-xs text-indigo-200">{business?.name}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bell size={16} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between bg-white rounded-xl p-3 shadow-sm mx-2">
          <StatBox label="Total" value={stats.totalEmployees} subtitle="Employees" color="text-indigo-600" />
          <div className="w-px bg-gray-200"></div>
          <StatBox label="Present" value={stats.present} color="text-emerald-500" />
          <div className="w-px bg-gray-200"></div>
          <StatBox label="Absent" value={stats.absent} color="text-red-500" />
        </div>
        
        <div className="flex justify-between bg-white rounded-xl p-3 shadow-sm mx-2 mt-2">
          <StatBox label="On Leave" value={stats.onLeave} color="text-blue-500" />
          <div className="w-px bg-gray-200"></div>
          <StatBox label="Late" value={stats.late} color="text-orange-500" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Today's Attendance Radial */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Today's Attendance</h2>
          <div className="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-indigo-600"
                  strokeDasharray={`${attendancePercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-800">{attendancePercentage}%</span>
                <span className="text-[8px] text-gray-400">Attendance</span>
              </div>
            </div>
            
            <div className="ml-6 flex-1 grid grid-cols-2 gap-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Present</span>
                <span className="font-semibold text-gray-900">{stats.present}</span>
              </div>
              <div className="flex justify-between pl-4">
                <span className="text-gray-500">Absent</span>
                <span className="font-semibold text-gray-900">{stats.absent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Late</span>
                <span className="font-semibold text-gray-900">{stats.late}</span>
              </div>
              <div className="flex justify-between pl-4">
                <span className="text-gray-500">On Leave</span>
                <span className="font-semibold text-gray-900">{stats.onLeave}</span>
              </div>
            </div>
          </div>
          
          <button onClick={() => {
            const el = document.querySelector('button:nth-child(4)') as HTMLButtonElement;
            el?.click();
          }} className="w-full flex justify-between items-center bg-white border border-gray-200 rounded-xl p-3 mt-3 shadow-sm text-sm font-medium text-gray-700 active:bg-gray-50">
            <div className="flex items-center space-x-2">
              <FileText size={16} className="text-gray-400" />
              <span>View Attendance Report</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* This Month Summary */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3">This Month Summary</h2>
          <div className="bg-white rounded-2xl p-4 flex justify-between text-center shadow-sm border border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">Present Days</p>
              <p className="text-lg font-semibold text-gray-900">20</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Absent Days</p>
              <p className="text-lg font-semibold text-gray-900">2</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Weekly Off</p>
              <p className="text-lg font-semibold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, subtitle, color }: { label: string, value: number, subtitle?: string, color: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-1">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-gray-500 font-medium">{label}</span>
      {subtitle && <span className="text-[9px] text-gray-400">{subtitle}</span>}
    </div>
  );
}
