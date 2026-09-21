export type Role = 'owner' | 'employee';

export interface Business {
  name: string;
  type: string;
  address: string;
  currency: string;
  sundaySetting: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  avatar: string;
  monthlySalary: number;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave' | 'none';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  timeIn?: string;
  timeOut?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PaymentRecord {
  id: string;
  employeeId: string;
  month: string; // YYYY-MM
  amount: number;
  status: 'paid' | 'pending';
  date: string;
  method: string;
  transactionId?: string;
}
