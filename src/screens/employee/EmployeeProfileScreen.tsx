import React from 'react';
import { useAppContext } from '../../store';

export default function EmployeeProfileScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { currentUserId, employees } = useAppContext();
  const currentUser = employees.find(e => e.id === currentUserId);
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-emerald-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem]">
        <h1 className="text-lg font-bold text-center">My Profile</h1>
      </div>
      
      <div className="px-4 py-8 flex flex-col items-center">
        <img src={currentUser?.avatar} alt={currentUser?.name} className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-white shadow-md mb-4" />
        <h2 className="text-xl font-bold text-gray-900">{currentUser?.name}</h2>
        <p className="text-sm text-gray-500">{currentUser?.role}</p>
        
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-8 space-y-4">
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p className="text-sm font-medium text-gray-800">{currentUser?.phone}</p>
          </div>
          <div className="w-full h-px bg-gray-50"></div>
          <div>
            <p className="text-xs text-gray-400">Monthly Salary</p>
            <p className="text-sm font-medium text-gray-800">₹{currentUser?.monthlySalary.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
