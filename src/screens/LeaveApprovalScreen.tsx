import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ChevronLeft } from 'lucide-react';

export default function LeaveApprovalScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { leaveRequests, employees, setLeaveRequests } = useAppContext();
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const filteredRequests = leaveRequests.filter(req => req.status === tab);

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem] flex items-center">
        <button onClick={() => navigateTo(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-10">Leave Requests</h1>
      </div>

      <div className="flex justify-between text-sm px-6 pt-4 border-b border-gray-200">
        <button 
          className={`pb-2 px-2 border-b-2 transition-colors ${tab === 'pending' ? 'border-indigo-600 text-indigo-600 font-medium' : 'border-transparent text-gray-500'}`}
          onClick={() => setTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`pb-2 px-2 border-b-2 transition-colors ${tab === 'approved' ? 'border-indigo-600 text-indigo-600 font-medium' : 'border-transparent text-gray-500'}`}
          onClick={() => setTab('approved')}
        >
          Approved
        </button>
        <button 
          className={`pb-2 px-2 border-b-2 transition-colors ${tab === 'rejected' ? 'border-indigo-600 text-indigo-600 font-medium' : 'border-transparent text-gray-500'}`}
          onClick={() => setTab('rejected')}
        >
          Rejected
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {filteredRequests.map(req => {
          const emp = employees.find(e => e.id === req.employeeId);
          return (
            <div key={req.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <img src={emp?.avatar} alt={emp?.name} className="w-10 h-10 rounded-full bg-indigo-50" />
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900">{emp?.name}</h3>
                  <p className="text-xs text-gray-500">{req.type}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                <p><span className="font-medium text-gray-800">Date:</span> {req.fromDate} to {req.toDate}</p>
                <p><span className="font-medium text-gray-800">Reason:</span> {req.reason}</p>
              </div>
              
              {req.status === 'pending' && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAction(req.id, 'approved')}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {filteredRequests.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-10">No {tab} requests found.</p>
        )}
      </div>
    </div>
  );
}
