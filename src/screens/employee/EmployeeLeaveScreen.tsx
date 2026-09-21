import React, { useState } from 'react';
import { useAppContext } from '../../store';
import { ChevronRight, Calendar, FileText, Check } from 'lucide-react';

export default function EmployeeLeaveScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { currentUserId, setLeaveRequests } = useAppContext();
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveRequests(prev => [
      ...prev,
      {
        id: `l${Date.now()}`,
        employeeId: currentUserId,
        type: leaveType,
        fromDate,
        toDate,
        reason,
        status: 'pending'
      }
    ]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReason('');
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-emerald-600 text-white pt-10 pb-6 px-4 rounded-b-[2rem]">
        <h1 className="text-lg font-bold text-center">Leave Request</h1>
      </div>
      
      <div className="px-4 py-6 flex-1">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Leave Type</label>
            <div className="relative">
              <select 
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full pl-3 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm appearance-none"
              >
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Half Day</option>
              </select>
              <ChevronRight className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none rotate-90" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">From Date</label>
              <div className="relative">
                <input 
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">To Date</label>
              <div className="relative">
                <input 
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Reason</label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm min-h-[100px]"
              placeholder="e.g. Personal work"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Attachment (Optional)</label>
            <div className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl border-dashed flex items-center justify-center text-sm text-gray-400">
              <FileText size={16} className="mr-2" /> Choose File
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit"
              className={`w-full py-4 font-medium rounded-xl transition-colors shadow-lg flex justify-center items-center ${submitted ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'}`}
              disabled={submitted}
            >
              {submitted ? <><Check size={20} className="mr-2" /> Request Submitted</> : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
