import React from 'react';
import { useAppContext } from '../store';
import { Check } from 'lucide-react';

export default function PaymentSuccessScreen({ navigateTo, employeeId, amount = 11500, method = 'upi' }: { navigateTo: (screen: string | null) => void, employeeId?: string, amount?: number, method?: string }) {
  const { employees, setPayments } = useAppContext();
  const emp = employees.find(e => e.id === employeeId) || employees[0];
  
  // Format date
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  const handleDone = () => {
    // Record payment
    setPayments(prev => [
      ...prev,
      {
        id: `p${Date.now()}`,
        employeeId: emp.id,
        month: '2026-08',
        amount,
        status: 'paid',
        date: dateStr,
        method: method.toUpperCase(),
        transactionId: method === 'upi' ? 'UPI1234ABCD5678' : undefined
      }
    ]);
    navigateTo(null);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 flex flex-col items-center pt-20 px-6">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 mb-6">
          <Check size={48} className="text-white" />
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-3xl font-bold text-gray-900 mb-1">₹{amount.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mb-10">Paid to {emp.name}</p>
        
        <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-900">{dateStr}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Time</span>
            <span className="font-medium text-gray-900">{timeStr}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Method</span>
            <span className="font-medium text-gray-900">{method.toUpperCase()}</span>
          </div>
          {method === 'upi' && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium text-gray-900">UPI1234ABCD5678</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 pb-8 pt-4">
        <button 
          onClick={handleDone}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
