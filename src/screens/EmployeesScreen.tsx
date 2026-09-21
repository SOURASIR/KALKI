import React from 'react';
import { useAppContext } from '../store';
import { Search, Plus, ChevronRight } from 'lucide-react';

export default function EmployeesScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { employees } = useAppContext();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold">SM</span>
          </div>
          <h1 className="text-lg font-semibold">Employees</h1>
          <div className="w-8 h-8"></div>
        </div>
        
        <button 
          onClick={() => navigateTo('add_employee')}
          className="w-full bg-white/20 hover:bg-white/30 text-white rounded-xl py-3 flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus size={18} />
          <span className="font-medium text-sm">Add Employee</span>
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employee..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Employee List */}
        <div className="space-y-3 pb-4">
          {employees.map(emp => (
            <div key={emp.id} className="bg-white rounded-xl p-3 flex items-center shadow-sm border border-gray-100">
              <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full bg-indigo-50" />
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-gray-900">{emp.name}</h3>
                <p className="text-xs text-gray-500">{emp.role}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{emp.phone}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
