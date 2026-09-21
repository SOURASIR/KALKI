import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, Employee, AttendanceRecord, LeaveRequest, PaymentRecord } from './types';

interface AppContextType {
  viewRole: 'owner' | 'employee';
  setViewRole: (role: 'owner' | 'employee') => void;
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  
  business: Business | null;
  setBusiness: (b: Business | null) => void;
  
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  
  leaveRequests: LeaveRequest[];
  setLeaveRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
  
  payments: PaymentRecord[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialEmployees: Employee[] = [
  { id: 'e1', name: 'Rahul Sharma', role: 'Salesman', phone: '+91 98765 43210', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', monthlySalary: 12000 },
  { id: 'e2', name: 'Amit Verma', role: 'Assistant', phone: '+91 98765 43211', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', monthlySalary: 10000 },
  { id: 'e3', name: 'Suresh Yadav', role: 'Helper', phone: '+91 98765 43212', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh', monthlySalary: 8000 },
  { id: 'e4', name: 'Pawan Kumar', role: 'Delivery Boy', phone: '+91 98765 42213', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pawan', monthlySalary: 11000 },
  { id: 'e5', name: 'Vikram Singh', role: 'Store Keeper', phone: '+91 98765 43214', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram', monthlySalary: 15000 },
];

const today = new Date().toISOString().split('T')[0];

const initialAttendance: AttendanceRecord[] = [
  { id: 'a1', employeeId: 'e1', date: today, status: 'present', timeIn: '09:02 AM' },
  { id: 'a2', employeeId: 'e2', date: today, status: 'present', timeIn: '09:10 AM' },
  { id: 'a3', employeeId: 'e3', date: today, status: 'absent' },
  { id: 'a4', employeeId: 'e4', date: today, status: 'late', timeIn: '09:25 AM' },
  { id: 'a5', employeeId: 'e5', date: today, status: 'present', timeIn: '09:05 AM' },
];

const initialLeaveRequests: LeaveRequest[] = [
  { id: 'l1', employeeId: 'e1', type: 'Casual Leave', fromDate: '2026-09-05', toDate: '2026-09-05', reason: 'Personal work', status: 'pending' },
  { id: 'l2', employeeId: 'e2', type: 'Sick Leave', fromDate: '2026-09-08', toDate: '2026-09-09', reason: 'Fever', status: 'approved' },
];

const initialPayments: PaymentRecord[] = [
  { id: 'p1', employeeId: 'e1', month: '2026-08', amount: 11500, status: 'paid', date: '2026-09-01', method: 'UPI', transactionId: 'UPI1234ABCD5678' },
  { id: 'p2', employeeId: 'e1', month: '2026-07', amount: 12000, status: 'paid', date: '2026-08-01', method: 'Bank Transfer' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [viewRole, setViewRole] = useState<'owner' | 'employee'>('owner');
  const [currentUserId, setCurrentUserId] = useState<string>('e1');
  
  const [business, setBusiness] = useState<Business | null>({
    name: 'Shree Kirana Store',
    type: 'Retail Shop',
    address: 'MG Road, Indore',
    currency: 'INR (₹)',
    sundaySetting: true,
  });
  
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);

  return (
    <AppContext.Provider value={{
      viewRole, setViewRole,
      currentUserId, setCurrentUserId,
      business, setBusiness,
      employees, setEmployees,
      attendance, setAttendance,
      leaveRequests, setLeaveRequests,
      payments, setPayments,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
