import React from 'react';
import { useAppContext } from '../store';

export default function MarkAttendanceScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { employees, attendance, setAttendance } = useAppContext();
  
  // Format today's date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' });
  const todayIso = today.toISOString().split('T')[0];

  const handleMark = (employeeId: string, status: 'present' | 'absent' | 'late' | 'leave') => {
    setAttendance(prev => {
      const existing = prev.find(a => a.employeeId === employeeId && a.date === todayIso);
      if (existing) {
        return prev.map(a => a.id === existing.id ? { ...a, status, timeIn: status === 'present' || status === 'late' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : undefined } : a);
      }
      return [...prev, {
        id: `a${Date.now()}`,
        employeeId,
        date: todayIso,
        status,
        timeIn: status === 'present' || status === 'late' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : undefined
      }];
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold">SM</span>
          </div>
          <h1 className="text-lg font-semibold">Today's Attendance</h1>
          <div className="w-8 h-8"></div>
        </div>
        <p className="text-center text-xs text-indigo-100">{dateStr}</p>
      </div>

      <div className="px-4 py-4 space-y-3 pb-24">
        {employees.map(emp => {
          const record = attendance.find(a => a.employeeId === emp.id);
          const status = record?.status || 'none';
          
          return (
            <div key={emp.id} className="bg-white rounded-xl p-3 flex flex-col shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full bg-indigo-50" />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-gray-900">{emp.name}</h3>
                    <p className="text-[10px] text-gray-500">{record?.timeIn || '--:--'}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                {status === 'present' && <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-medium rounded-md border border-emerald-100">PRESENT</span>}
                {status === 'absent' && <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-medium rounded-md border border-red-100">ABSENT</span>}
                {status === 'late' && <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-medium rounded-md border border-orange-100">LATE</span>}
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleMark(emp.id, 'present')} className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${status === 'present' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'}`}>
                  Present
                </button>
                <button onClick={() => handleMark(emp.id, 'late')} className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${status === 'late' ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100'}`}>
                  Late
                </button>
                <button onClick={() => handleMark(emp.id, 'absent')} className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${status === 'absent' ? 'bg-red-500 text-white border-red-500' : 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100'}`}>
                  Absent
                </button>
                <button onClick={() => handleMark(emp.id, 'leave')} className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${status === 'leave' ? 'bg-blue-500 text-white border-blue-500' : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'}`}>
                  Leave
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
