
import React from 'react';
import { MaintenanceRequest, MaintenanceStatus, Tenant } from '../types';

interface MaintenanceProps {
  maintenanceRequests: MaintenanceRequest[];
  tenants: Tenant[];
}

const Maintenance: React.FC<MaintenanceProps> = ({ maintenanceRequests, tenants }) => {
  const getTenantName = (tenantId: string) => {
    return tenants.find(t => t.id === tenantId)?.name || 'N/A';
  };
  
  const getStatusPill = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.Pending:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">รอตรวจสอบ</span>;
      case MaintenanceStatus.InProgress:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">กำลังดำเนินการ</span>;
      case MaintenanceStatus.Completed:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">เสร็จสิ้น</span>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">รายการแจ้งซ่อม</h1>
      
      <div className="bg-surface p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-text-secondary">วันที่แจ้ง</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ห้อง</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ผู้แจ้ง</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ปัญหา</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">สถานะ</th>
                <th className="py-3 px-4 font-semibold text-text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRequests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-text-secondary">{new Date(req.requestDate).toLocaleDateString('th-TH')}</td>
                  <td className="py-3 px-4 font-medium text-text-primary">{req.roomId.substring(1).toUpperCase()}</td>
                  <td className="py-3 px-4 text-text-secondary">{getTenantName(req.tenantId)}</td>
                  <td className="py-3 px-4 text-text-primary">{req.issue}</td>
                  <td className="py-3 px-4">{getStatusPill(req.status)}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium">จัดการ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
