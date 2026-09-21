import React from 'react';
import { useAppContext } from '../store';
import { ChevronLeft } from 'lucide-react';

export default function PaymentHistoryScreen({ navigateTo, employeeId }: { navigateTo: (screen: string | null) => void, employeeId?: string }) {
  const { payments, employees } = useAppContext();
  
  // Either show history for a specific employee or all
  const filteredPayments = employeeId ? payments.filter(p => p.employeeId === employeeId) : payments;
  const emp = employeeId ? employees.find(e => e.id === employeeId) : null;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem] flex items-center">
        <button onClick={() => navigateTo(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-10">Payment History</h1>
      </div>

      <div className="px-4 py-6 space-y-4">
        {emp && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center mb-2">
            <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full bg-indigo-50" />
            <div className="ml-4">
              <h2 className="text-base font-bold text-gray-900">{emp.name}</h2>
              <p className="text-xs text-gray-500">Salesman</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50 text-xs font-semibold text-gray-400">
            <span>Month</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          
          <div className="space-y-4">
            {filteredPayments.map(payment => (
              <div key={payment.id} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">
                  {new Date(payment.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <span className="text-sm font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                <span className={`text-xs font-bold ${payment.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
            ))}
            {filteredPayments.length === 0 && (
              <p className="text-center text-sm text-gray-400">No payment history.</p>
            )}
          </div>
        </div>
        
        {employeeId && (
          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200 mt-4">
            View All History
          </button>
        )}
      </div>
    </div>
  );
}
