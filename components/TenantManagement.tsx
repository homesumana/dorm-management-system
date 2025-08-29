
import React from 'react';
import { Tenant, Room } from '../types';

interface TenantManagementProps {
  tenants: Tenant[];
  rooms: Room[];
}

const TenantManagement: React.FC<TenantManagementProps> = ({ tenants, rooms }) => {

  const getRoomNumber = (roomId: string | null) => {
    if (!roomId) return <span className="text-gray-400">N/A</span>;
    const room = rooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'ไม่พบห้อง';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">จัดการผู้เช่า</h1>
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          เพิ่มผู้เช่า
        </button>
      </div>

      <div className="bg-surface p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-text-secondary">ชื่อ-สกุล</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">เบอร์โทรศัพท์</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">อีเมล</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ห้องพัก</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">วันที่เข้าพัก</th>
                <th className="py-3 px-4 font-semibold text-text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {tenants.filter(t => t.roomId).map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-text-primary">{tenant.name}</td>
                  <td className="py-3 px-4 text-text-secondary">{tenant.phone}</td>
                  <td className="py-3 px-4 text-text-secondary">{tenant.email}</td>
                  <td className="py-3 px-4 text-text-secondary font-semibold">{getRoomNumber(tenant.roomId)}</td>
                  <td className="py-3 px-4 text-text-secondary">{new Date(tenant.checkInDate).toLocaleDateString('th-TH')}</td>
                  <td className="py-3 px-4 text-right">
                     <button className="text-primary hover:text-primary-dark font-medium">รายละเอียด</button>
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

export default TenantManagement;
