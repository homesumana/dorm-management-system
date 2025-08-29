
import React from 'react';
import { Invoice, Tenant, PaymentStatus } from '../types';

interface BillingProps {
  invoices: Invoice[];
  tenants: Tenant[];
}

const Billing: React.FC<BillingProps> = ({ invoices, tenants }) => {

  const getTenantName = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? tenant.name : 'ไม่พบผู้เช่า';
  };
  
  const getStatusPill = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Paid:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">ชำระแล้ว</span>;
      case PaymentStatus.Unpaid:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">ยังไม่ชำระ</span>;
      case PaymentStatus.Overdue:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">ค้างชำระ</span>;
      default:
        return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">ไม่ทราบสถานะ</span>;
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">การเงินและบิล</h1>
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          สร้างบิลใหม่
        </button>
      </div>

      <div className="bg-surface p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-text-secondary">ผู้เช่า</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ห้อง</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">รอบบิล</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">ยอดรวม (บาท)</th>
                <th className="py-3 px-4 font-semibold text-text-secondary">สถานะ</th>
                <th className="py-3 px-4 font-semibold text-text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-text-primary">{getTenantName(invoice.tenantId)}</td>
                  <td className="py-3 px-4 text-text-secondary">{invoice.roomId.substring(1).toUpperCase()}</td>
                  <td className="py-3 px-4 text-text-secondary">{new Date(invoice.month).toLocaleString('th-TH', { month: 'long', year: 'numeric' })}</td>
                  <td className="py-3 px-4 text-text-secondary font-medium">{invoice.total.toLocaleString()}</td>
                  <td className="py-3 px-4">{getStatusPill(invoice.status)}</td>
                  <td className="py-3 px-4 text-right">
                     <button className="text-primary hover:text-primary-dark font-medium">ดูรายละเอียด</button>
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

export default Billing;
