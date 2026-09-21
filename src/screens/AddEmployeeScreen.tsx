import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ChevronLeft } from 'lucide-react';

export default function AddEmployeeScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { setEmployees } = useAppContext();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees(prev => [
      ...prev,
      {
        id: `e${Date.now()}`,
        name,
        role,
        phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        monthlySalary: Number(salary) || 0
      }
    ]);
    navigateTo(null);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem] flex items-center">
        <button onClick={() => navigateTo(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-10">Add Employee</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            placeholder="e.g. Rahul Sharma"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Role / Designation</label>
          <input 
            type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            placeholder="e.g. Salesman"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            placeholder="+91 98765 43210"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Monthly Salary (₹)</label>
          <input 
            type="number" 
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            placeholder="e.g. 12000"
            required
          />
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200"
          >
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}
