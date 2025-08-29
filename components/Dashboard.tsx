
import React, { useMemo } from 'react';
import { Room, RoomStatus, Invoice, PaymentStatus, MaintenanceRequest, MaintenanceStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  rooms: Room[];
  invoices: Invoice[];
  maintenanceRequests: MaintenanceRequest[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-surface p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-text-secondary font-medium">{title}</p>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ rooms, invoices, maintenanceRequests }) => {
  const stats = useMemo(() => {
    const occupied = rooms.filter(r => r.status === RoomStatus.Occupied).length;
    const available = rooms.filter(r => r.status === RoomStatus.Available).length;
    const overdue = invoices.filter(i => i.status === PaymentStatus.Overdue).length;
    const pendingMaintenance = maintenanceRequests.filter(m => m.status === MaintenanceStatus.Pending).length;
    return { occupied, available, overdue, pendingMaintenance, total: rooms.length };
  }, [rooms, invoices, maintenanceRequests]);

  const occupancyData = [
    { name: 'สถานะห้อง', occupied: stats.occupied, available: stats.available },
  ];

  const monthlyIncomeData = useMemo(() => {
    const incomeByMonth: { [key: string]: number } = {};
    invoices
      .filter(i => i.status === PaymentStatus.Paid)
      .forEach(i => {
        const month = new Date(i.month).toLocaleString('th-TH', { month: 'short', year: 'numeric' });
        if (!incomeByMonth[month]) {
          incomeByMonth[month] = 0;
        }
        incomeByMonth[month] += i.total;
      });
      return Object.entries(incomeByMonth).map(([name, income]) => ({ name, income })).slice(-6); // Last 6 months
  }, [invoices]);
  

  const BuildingIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" /></svg>;
  const CheckCircleIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  const ExclamationIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
  const WrenchIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">แดชบอร์ด</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ห้องพักที่มีผู้เช่า" value={`${stats.occupied} / ${stats.total}`} icon={BuildingIcon} color="bg-blue-100" />
        <StatCard title="ห้องพักว่าง" value={stats.available} icon={CheckCircleIcon} color="bg-green-100" />
        <StatCard title="ยอดค้างชำระ" value={stats.overdue} icon={ExclamationIcon} color="bg-red-100" />
        <StatCard title="รายการแจ้งซ่อม" value={stats.pendingMaintenance} icon={WrenchIcon} color="bg-yellow-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-text-primary mb-4">อัตราการเข้าพัก</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip formatter={(value) => `${value} ห้อง`} />
              <Legend />
              <Bar dataKey="occupied" name="มีผู้เช่า" stackId="a" fill="#3B82F6" />
              <Bar dataKey="available" name="ห้องว่าง" stackId="a" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-text-primary mb-4">รายรับรายเดือน (6 เดือนล่าสุด)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} บาท`} />
              <Legend />
              <Bar dataKey="income" name="รายรับ" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
