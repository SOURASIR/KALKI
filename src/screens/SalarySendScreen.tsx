import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ChevronLeft, Smartphone, Landmark, Banknote } from 'lucide-react';

export default function SalarySendScreen({ navigateTo, employeeId, amount = 11500 }: { navigateTo: (screen: string | null, props?: any) => void, employeeId?: string, amount?: number }) {
  const { employees } = useAppContext();
  const emp = employees.find(e => e.id === employeeId) || employees[0];
  const [method, setMethod] = useState<'upi' | 'bank' | 'cash'>('upi');

  const handlePay = () => {
    navigateTo('payment_success', { employeeId: emp.id, amount, method });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem] flex items-center">
        <button onClick={() => navigateTo('salary_calculation', { employeeId })} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-10">Send Salary</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <img src={emp?.avatar} alt={emp?.name} className="w-12 h-12 rounded-full bg-indigo-50" />
            <div className="ml-3">
              <h2 className="text-sm font-bold text-gray-900">{emp?.name}</h2>
              <p className="text-xs text-gray-500">Payable Salary</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">₹{amount.toLocaleString()}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3 ml-1">Select Payment Method</h3>
          <div className="space-y-3">
            <label className={`flex items-center p-4 rounded-xl border transition-colors cursor-pointer ${method === 'upi' ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-gray-200'}`}>
              <input type="radio" name="payment" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} className="sr-only" />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${method === 'upi' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                <Smartphone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">UPI</p>
                <p className="text-xs text-gray-500">Pay via UPI ID / QR</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'upi' ? 'border-indigo-600' : 'border-gray-300'}`}>
                {method === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
              </div>
            </label>
            
            <label className={`flex items-center p-4 rounded-xl border transition-colors cursor-pointer ${method === 'bank' ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-gray-200'}`}>
              <input type="radio" name="payment" value="bank" checked={method === 'bank'} onChange={() => setMethod('bank')} className="sr-only" />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${method === 'bank' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                <Landmark size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Bank Transfer</p>
                <p className="text-xs text-gray-500">Transfer to bank account</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'bank' ? 'border-indigo-600' : 'border-gray-300'}`}>
                {method === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
              </div>
            </label>
            
            <label className={`flex items-center p-4 rounded-xl border transition-colors cursor-pointer ${method === 'cash' ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-gray-200'}`}>
              <input type="radio" name="payment" value="cash" checked={method === 'cash'} onChange={() => setMethod('cash')} className="sr-only" />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${method === 'cash' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                <Banknote size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Cash</p>
                <p className="text-xs text-gray-500">Mark as cash paid</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cash' ? 'border-indigo-600' : 'border-gray-300'}`}>
                {method === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
              </div>
            </label>
          </div>
        </div>
        
        <div>
           <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Payment Note (Optional)</label>
           <input 
             type="text"
             placeholder="e.g. Salary for August 2026"
             className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
           />
        </div>

        <div className="pt-4">
          <button 
            onClick={handlePay}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200"
          >
            Pay ₹{amount.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
