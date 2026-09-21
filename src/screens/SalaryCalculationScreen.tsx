import React from 'react';
import { useAppContext } from '../store';
import { ChevronLeft } from 'lucide-react';

export default function SalaryCalculationScreen({ navigateTo, employeeId }: { navigateTo: (screen: string | null, props?: any) => void, employeeId?: string }) {
  const { employees } = useAppContext();
  
  // Default to first employee for preview if not passed
  const emp = employees.find(e => e.id === employeeId) || employees[0];

  const handleSendSalary = () => {
    navigateTo('salary_send', { employeeId: emp.id, amount: 11500 });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem] flex items-center">
        <button onClick={() => navigateTo(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-semibold">Salary Details</h1>
          <p className="text-xs text-indigo-200">August 2026</p>
        </div>
      </div>

      <div className="px-4 py-6 flex-1 space-y-6">
        <div className="flex items-center justify-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <img src={emp?.avatar} alt={emp?.name} className="w-14 h-14 rounded-full bg-indigo-50" />
          <div className="ml-4">
            <h2 className="text-base font-bold text-gray-900">{emp?.name}</h2>
            <p className="text-xs text-gray-500">{emp?.role}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Monthly Salary</span>
            <span className="font-semibold text-gray-900">₹{emp?.monthlySalary.toLocaleString()}</span>
          </div>
          
          <div className="w-full h-px bg-gray-100"></div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Present Days</span>
              <span className="font-medium text-gray-800">22</span>
            </div>
            <div className="flex justify-between">
              <span>Leave Days</span>
              <span className="font-medium text-gray-800">1</span>
            </div>
            <div className="flex justify-between">
              <span>Absent Days</span>
              <span className="font-medium text-gray-800">1</span>
            </div>
            <div className="flex justify-between">
              <span>Late Days</span>
              <span className="font-medium text-gray-800">2</span>
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-100"></div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Deduction (Late)</span>
              <span className="font-medium text-red-500">₹200</span>
            </div>
            <div className="flex justify-between">
              <span>Other Deduction</span>
              <span className="font-medium text-red-500">₹300</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-gray-800">Total Deduction</span>
              <span className="text-red-500">₹500</span>
            </div>
          </div>
          
          <div className="w-full h-px border-t-2 border-dashed border-gray-200"></div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-base font-bold text-gray-900">Payable Salary</span>
            <span className="text-xl font-bold text-indigo-600">₹11,500</span>
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={handleSendSalary}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200"
          >
            Send Salary
          </button>
        </div>
      </div>
    </div>
  );
}
