
import React from 'react';
import { Room, RoomStatus } from '../types';

interface RoomManagementProps {
  rooms: Room[];
}

const RoomManagement: React.FC<RoomManagementProps> = ({ rooms }) => {

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.Available:
        return 'bg-green-100 text-green-800';
      case RoomStatus.Occupied:
        return 'bg-red-100 text-red-800';
      case RoomStatus.Maintenance:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">จัดการห้องพัก</h1>
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          เพิ่มห้องพัก
        </button>
      </div>

      <div className="bg-surface p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-text-secondary">ห้อง</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ชั้น</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ประเภท</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ราคา (บาท)</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">สถานะ</th>
                <th className="py-3 px-4 font-semibold text-text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-text-primary">{room.roomNumber}</td>
                  <td className="py-3 px-4 text-text-secondary">{room.floor}</td>
                  <td className="py-3 px-4 text-text-secondary">{room.type}</td>
                  <td className="py-3 px-4 text-text-secondary">{room.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                     <button className="text-primary hover:text-primary-dark font-medium">แก้ไข</button>
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

export default RoomManagement;
