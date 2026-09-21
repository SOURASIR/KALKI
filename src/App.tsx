import React, { useState } from 'react';
import { AppProvider, useAppContext } from './store';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  FileText, 
  Menu,
  Home,
  Clock,
  CalendarOff,
  User as UserIcon
} from 'lucide-react';
import { cn } from './lib/utils';

// Owner Screens
import DashboardScreen from './screens/DashboardScreen';
import EmployeesScreen from './screens/EmployeesScreen';
import MarkAttendanceScreen from './screens/MarkAttendanceScreen';
import ReportsScreen from './screens/ReportsScreen';
import MoreScreen from './screens/MoreScreen';
import SetupScreen from './screens/SetupScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import LeaveApprovalScreen from './screens/LeaveApprovalScreen';
import SalaryCalculationScreen from './screens/SalaryCalculationScreen';
import SalarySendScreen from './screens/SalarySendScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import PaymentHistoryScreen from './screens/PaymentHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';

// Employee Screens
import EmployeeHomeScreen from './screens/employee/EmployeeHomeScreen';
import EmployeeHistoryScreen from './screens/employee/EmployeeHistoryScreen';
import EmployeeLeaveScreen from './screens/employee/EmployeeLeaveScreen';
import EmployeeProfileScreen from './screens/employee/EmployeeProfileScreen';

export type OwnerTab = 'dashboard' | 'employees' | 'attendance' | 'reports' | 'more';
export type EmployeeTab = 'home' | 'history' | 'leave' | 'profile';

function MainLayout() {
  const { viewRole, setViewRole, business } = useAppContext();
  const [ownerTab, setOwnerTab] = useState<OwnerTab>('dashboard');
  const [employeeTab, setEmployeeTab] = useState<EmployeeTab>('home');
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [screenProps, setScreenProps] = useState<any>({});

  const navigateTo = (screen: string | null, props: any = {}) => {
    setActiveScreen(screen);
    setScreenProps(props);
  };

  if (!business && activeScreen !== 'setup') {
    setActiveScreen('setup');
  }

  const renderOwnerScreen = () => {
    if (activeScreen === 'setup') return <SetupScreen onComplete={() => navigateTo(null)} />;
    if (activeScreen === 'add_employee') return <AddEmployeeScreen navigateTo={navigateTo} />;
    if (activeScreen === 'leave_approval') return <LeaveApprovalScreen navigateTo={navigateTo} />;
    if (activeScreen === 'salary_calculation') return <SalaryCalculationScreen navigateTo={navigateTo} {...screenProps} />;
    if (activeScreen === 'salary_send') return <SalarySendScreen navigateTo={navigateTo} {...screenProps} />;
    if (activeScreen === 'payment_success') return <PaymentSuccessScreen navigateTo={navigateTo} {...screenProps} />;
    if (activeScreen === 'payment_history') return <PaymentHistoryScreen navigateTo={navigateTo} {...screenProps} />;
    if (activeScreen === 'settings') return <SettingsScreen navigateTo={navigateTo} />;
    
    switch (ownerTab) {
      case 'dashboard': return <DashboardScreen navigateTo={navigateTo} />;
      case 'employees': return <EmployeesScreen navigateTo={navigateTo} />;
      case 'attendance': return <MarkAttendanceScreen navigateTo={navigateTo} />;
      case 'reports': return <ReportsScreen navigateTo={navigateTo} />;
      case 'more': return <MoreScreen navigateTo={navigateTo} />;
      default: return <DashboardScreen navigateTo={navigateTo} />;
    }
  };

  const renderEmployeeScreen = () => {
    switch (employeeTab) {
      case 'home': return <EmployeeHomeScreen navigateTo={navigateTo} />;
      case 'history': return <EmployeeHistoryScreen navigateTo={navigateTo} />;
      case 'leave': return <EmployeeLeaveScreen navigateTo={navigateTo} />;
      case 'profile': return <EmployeeProfileScreen navigateTo={navigateTo} />;
      default: return <EmployeeHomeScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 relative">
      
      {/* Top utility bar to switch roles (only for demo purposes) */}
      <div className="absolute top-8 right-2 z-50 opacity-30 hover:opacity-100 transition-opacity">
        <select 
          className="text-[10px] bg-black text-white rounded px-1 py-1"
          value={viewRole}
          onChange={(e) => {
            setViewRole(e.target.value as 'owner' | 'employee');
            setActiveScreen(null);
          }}
        >
          <option value="owner">Owner View</option>
          <option value="employee">Employee View</option>
        </select>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide bg-gray-50">
        {viewRole === 'owner' ? renderOwnerScreen() : renderEmployeeScreen()}
      </div>

      {/* Bottom Navigation */}
      {!activeScreen && viewRole === 'owner' && (
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 text-[10px] font-medium text-gray-500 pb-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isActive={ownerTab === 'dashboard'} onClick={() => setOwnerTab('dashboard')} />
          <NavItem icon={<Users size={20} />} label="Employees" isActive={ownerTab === 'employees'} onClick={() => setOwnerTab('employees')} />
          <NavItem icon={<CalendarCheck size={20} />} label="Attendance" isActive={ownerTab === 'attendance'} onClick={() => setOwnerTab('attendance')} />
          <NavItem icon={<FileText size={20} />} label="Reports" isActive={ownerTab === 'reports'} onClick={() => setOwnerTab('reports')} />
          <NavItem icon={<Menu size={20} />} label="More" isActive={ownerTab === 'more'} onClick={() => setOwnerTab('more')} />
        </div>
      )}

      {!activeScreen && viewRole === 'employee' && (
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 text-[10px] font-medium text-gray-500 pb-2">
          <NavItem icon={<Home size={20} />} label="Home" isActive={employeeTab === 'home'} onClick={() => setEmployeeTab('home')} />
          <NavItem icon={<Clock size={20} />} label="History" isActive={employeeTab === 'history'} onClick={() => setEmployeeTab('history')} />
          <NavItem icon={<CalendarOff size={20} />} label="Leave" isActive={employeeTab === 'leave'} onClick={() => setEmployeeTab('leave')} />
          <NavItem icon={<UserIcon size={20} />} label="Profile" isActive={employeeTab === 'profile'} onClick={() => setEmployeeTab('profile')} />
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
        isActive ? "text-indigo-700" : "hover:text-gray-400"
      )}
    >
      <div className={cn(isActive && "text-indigo-700")}>{icon}</div>
      <span>{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-3xl h-[100dvh] bg-white relative shadow-xl sm:border-x sm:border-gray-200 overflow-hidden">
           <MainLayout />
        </div>
      </div>
    </AppProvider>
  );
}
