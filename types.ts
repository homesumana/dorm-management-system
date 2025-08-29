
export enum View {
  Dashboard = 'dashboard',
  Rooms = 'rooms',
  Tenants = 'tenants',
  Billing = 'billing',
  Maintenance = 'maintenance',
}

export enum RoomStatus {
  Available = 'ว่าง',
  Occupied = 'ไม่ว่าง',
  Maintenance = 'ซ่อมบำรุง',
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: string;
  price: number;
  status: RoomStatus;
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  checkInDate: string;
  roomId: string | null;
}

export enum PaymentStatus {
  Paid = 'ชำระแล้ว',
  Unpaid = 'ยังไม่ชำระ',
  Overdue = 'ค้างชำระ',
}

export interface Invoice {
  id: string;
  tenantId: string;
  roomId: string;
  month: string; // e.g., '2024-07'
  rent: number;
  electricityUnit: number;
  waterUnit: number;
  electricityCost: number;
  waterCost: number;
  total: number;
  status: PaymentStatus;
  paymentDate?: string;
}

export enum MaintenanceStatus {
  Pending = 'รอตรวจสอบ',
  InProgress = 'กำลังดำเนินการ',
  Completed = 'เสร็จสิ้น',
}

export interface MaintenanceRequest {
  id: string;
  roomId: string;
  tenantId: string;
  issue: string;
  details: string;
  requestDate: string;
  status: MaintenanceStatus;
}
