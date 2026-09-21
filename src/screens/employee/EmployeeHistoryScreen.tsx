import React from 'react';
import { useAppContext } from '../../store';

export default function EmployeeHistoryScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { currentUserId, attendance } = useAppContext();
  
  const myAttendance = attendance.filter(a => a.employeeId === currentUserId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-emerald-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem]">
        <h1 className="text-lg font-bold text-center">Attendance History</h1>
      </div>
      
      <div className="px-4 py-6 space-y-4">
        {myAttendance.map(record => (
          <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">{new Date(record.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              <p className="text-xs text-gray-500 mt-1">Time In: {record.timeIn || '--:--'}</p>
            </div>
            <div>
              {record.status === 'present' && <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">PRESENT</span>}
              {record.status === 'absent' && <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-md">ABSENT</span>}
              {record.status === 'late' && <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-md">LATE</span>}
              {record.status === 'leave' && <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md">LEAVE</span>}
            </div>
          </div>
        ))}
        {myAttendance.length === 0 && (
          <div className="p-4 flex items-center justify-center text-gray-400 text-sm">
            No history found.
          </div>
        )}
      </div>
    </div>
  );
}
