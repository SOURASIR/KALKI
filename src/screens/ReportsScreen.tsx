import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ChevronLeft, ChevronRight, Download, FileSpreadsheet } from 'lucide-react';

export default function ReportsScreen({ navigateTo }: { navigateTo: (screen: string | null) => void }) {
  const { employees } = useAppContext();
  const [tab, setTab] = useState<'daily' | 'monthly' | 'custom'>('monthly');

  const exportToCSV = () => {
    // CSV Header
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Employee ID,Employee Name,Role,Present,Absent,Late,Weekly Off,Attendance %,Monthly Salary\n";

    employees.forEach((emp, i) => {
      // Replicating the fake data calculation
      const p = 20 + (i % 3);
      const a = 1 + (i % 2);
      const l = 1 + (i % 4);
      const wo = 4;
      const total = p + a + l + wo;
      const pct = Math.round((p / (total - wo)) * 100);

      const row = [
        emp.id,
        `"${emp.name}"`, // Quote strings in case they have commas
        `"${emp.role}"`,
        p,
        a,
        l,
        wo,
        `${pct}%`,
        emp.monthlySalary
      ];

      csvContent += row.join(",") + "\n";
    });

    // Create a download link and trigger it
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_salary_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white pt-10 pb-4 px-4 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold">SM</span>
          </div>
          <h1 className="text-lg font-semibold">Attendance Report</h1>
          <div className="w-8 h-8"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between text-sm px-2">
          <button 
            className={`pb-2 px-2 border-b-2 transition-colors ${tab === 'daily' ? 'border-white text-white font-medium' : 'border-transparent text-indigo-200'}`}
            onClick={() => setTab('daily')}
          >
            Daily
          </button>
          <button 
            className={`pb-2 px-2 border-b-2 transition-colors ${tab === 'monthly' ? 'border-white text-white font-medium' : 'border-transparent text-indigo-200'}`}
            onClick={() => setTab('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`pb-2 px-2 border-b-2 transition-colors ${tab === 'custom' ? 'border-white text-white font-medium' : 'border-transparent text-indigo-200'}`}
            onClick={() => setTab('custom')}
          >
            Custom
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Month Selector */}
        <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-sm font-medium text-gray-700">
          <ChevronLeft size={20} className="text-gray-400" />
          <span>August 2026</span>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-medium">Present</span>
            <span className="text-2xl font-bold text-emerald-500">20</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-medium">Absent</span>
            <span className="text-2xl font-bold text-red-500">2</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-medium">Late</span>
            <span className="text-2xl font-bold text-orange-500">3</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-medium">Weekly Off</span>
            <span className="text-2xl font-bold text-blue-500">4</span>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 text-sm">Attendance 83%</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-2 font-medium">Employee</th>
                  <th className="pb-2 font-medium text-center">P</th>
                  <th className="pb-2 font-medium text-center">A</th>
                  <th className="pb-2 font-medium text-center">L</th>
                  <th className="pb-2 font-medium text-center">WO</th>
                  <th className="pb-2 font-medium text-right">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employees.map((emp, i) => {
                  // Fake data
                  const p = 20 + (i % 3);
                  const a = 1 + (i % 2);
                  const l = 1 + (i % 4);
                  const wo = 4;
                  const total = p + a + l + wo;
                  const pct = Math.round((p / (total - wo)) * 100);
                  
                  return (
                    <tr key={emp.id}>
                      <td className="py-2 text-gray-900">{emp.name}</td>
                      <td className="py-2 text-center text-emerald-600">{p}</td>
                      <td className="py-2 text-center text-red-600">{a}</td>
                      <td className="py-2 text-center text-orange-600">{l}</td>
                      <td className="py-2 text-center text-blue-600">{wo}</td>
                      <td className="py-2 text-right font-medium">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pb-4">
          <button className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl flex items-center justify-center space-x-2 font-medium text-xs">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
          <button 
            onClick={exportToCSV}
            className="flex-1 bg-emerald-50 text-emerald-600 py-3 rounded-xl flex items-center justify-center space-x-2 font-medium text-xs"
          >
            <FileSpreadsheet size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
