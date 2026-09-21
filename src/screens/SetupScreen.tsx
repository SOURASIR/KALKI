import React, { useState } from 'react';
import { useAppContext } from '../store';
import { Store, Briefcase, MapPin, DollarSign, ChevronRight } from 'lucide-react';

export default function SetupScreen({ onComplete }: { onComplete: () => void }) {
  const { setBusiness } = useAppContext();
  const [name, setName] = useState('Shree Kirana Store');
  const [type, setType] = useState('Retail Shop');
  const [address, setAddress] = useState('MG Road, Indore');
  const [currency, setCurrency] = useState('INR (₹)');
  const [sundayLeave, setSundayLeave] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusiness({ name, type, address, currency, sundaySetting: sundayLeave });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-white pt-8">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Create Your Business</h1>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
          <Store className="w-12 h-12 text-indigo-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Business Name</label>
          <div className="relative">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="e.g. Shree Kirana Store"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Business Type</label>
          <div className="relative">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm appearance-none"
            >
              <option>Retail Shop</option>
              <option>Restaurant</option>
              <option>Office</option>
              <option>Factory</option>
            </select>
            <ChevronRight className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none rotate-90" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Business Address</label>
          <div className="relative">
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="e.g. MG Road, Indore"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Currency</label>
          <div className="relative">
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm appearance-none"
            >
              <option>INR (₹)</option>
              <option>USD ($)</option>
            </select>
            <ChevronRight className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none rotate-90" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Sunday Setting</label>
          <div className="relative">
            <select 
              value={sundayLeave ? 'true' : 'false'}
              onChange={(e) => setSundayLeave(e.target.value === 'true')}
              className="w-full pl-3 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm appearance-none"
            >
              <option value="true">Sunday Compulsory Leave</option>
              <option value="false">Sunday Working</option>
            </select>
            <ChevronRight className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none rotate-90" />
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200"
          >
            Create Business
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">Setup takes less than 1 minute</p>
        </div>
      </form>
    </div>
  );
}
