
import { useState } from 'react';
import { Room, Tenant, Invoice, MaintenanceRequest, RoomStatus, PaymentStatus, MaintenanceStatus } from '../types';

const initialRooms: Room[] = [
  { id: 'r1', roomNumber: '101', floor: 1, type: 'Standard', price: 4500, status: RoomStatus.Occupied },
  { id: 'r2', roomNumber: '102', floor: 1, type: 'Standard', price: 4500, status: RoomStatus.Occupied },
  { id: 'r3', roomNumber: '103', floor: 1, type: 'Deluxe', price: 5500, status: RoomStatus.Available },
  { id: 'r4', roomNumber: '201', floor: 2, type: 'Standard', price: 4800, status: RoomStatus.Occupied },
  { id: 'r5', roomNumber: '202', floor: 2, type: 'Maintenance', price: 4800, status: RoomStatus.Maintenance },
];

const initialTenants: Tenant[] = [
  { id: 't1', name: 'สมชาย ใจดี', phone: '081-234-5678', email: 'somchai@email.com', checkInDate: '2023-01-15', roomId: 'r1' },
  { id: 't2', name: 'มานี รักเรียน', phone: '082-345-6789', email: 'manee@email.com', checkInDate: '2023-05-20', roomId: 'r2' },
  { id: 't3', name: 'ปิติ ยินดี', phone: '083-456-7890', email: 'piti@email.com', checkInDate: '2024-03-10', roomId: 'r4' },
];

const initialInvoices: Invoice[] = [
    { id: 'i1', tenantId: 't1', roomId: 'r1', month: '2024-06', rent: 4500, electricityUnit: 100, waterUnit: 10, electricityCost: 800, waterCost: 200, total: 5500, status: PaymentStatus.Paid, paymentDate: '2024-06-05' },
    { id: 'i2', tenantId: 't2', roomId: 'r2', month: '2024-06', rent: 4500, electricityUnit: 120, waterUnit: 12, electricityCost: 960, waterCost: 240, total: 5700, status: PaymentStatus.Paid, paymentDate: '2024-06-03' },
    { id: 'i3', tenantId: 't3', roomId: 'r4', month: '2024-06', rent: 4800, electricityUnit: 80, waterUnit: 7, electricityCost: 640, waterCost: 140, total: 5580, status: PaymentStatus.Overdue },
    { id: 'i4', tenantId: 't1', roomId: 'r1', month: '2024-07', rent: 4500, electricityUnit: 110, waterUnit: 9, electricityCost: 880, waterCost: 180, total: 5560, status: PaymentStatus.Unpaid },
];

const initialMaintenance: MaintenanceRequest[] = [
    { id: 'm1', roomId: 'r1', tenantId: 't1', issue: 'แอร์ไม่เย็น', details: 'เปิดแล้วมีแต่ลมออกมา', requestDate: '2024-07-10', status: MaintenanceStatus.InProgress },
    { id: 'm2', roomId: 'r4', tenantId: 't3', issue: 'น้ำรั่วซึม', details: 'น้ำหยดจากเพดานห้องน้ำ', requestDate: '2024-07-15', status: MaintenanceStatus.Pending },
];


export const useDormData = () => {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(initialMaintenance);

    const addTenant = (tenant: Omit<Tenant, 'id'>) => {
        const newTenant: Tenant = { ...tenant, id: `t${Date.now()}` };
        setTenants(prev => [...prev, newTenant]);
        if (newTenant.roomId) {
            setRooms(prev => prev.map(r => r.id === newTenant.roomId ? { ...r, status: RoomStatus.Occupied } : r));
        }
    };

    const updateTenant = (updatedTenant: Tenant) => {
        setTenants(prev => prev.map(t => t.id === updatedTenant.id ? updatedTenant : t));
    };

    const checkoutTenant = (tenantId: string) => {
        const tenant = tenants.find(t => t.id === tenantId);
        if (tenant && tenant.roomId) {
            const roomId = tenant.roomId;
            setRooms(prev => prev.map(r => r.id === roomId ? { ...r, status: RoomStatus.Available } : r));
        }
        setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, roomId: null } : t));
    };

    const addRoom = (room: Omit<Room, 'id' | 'status'>) => {
        const newRoom: Room = { ...room, id: `r${Date.now()}`, status: RoomStatus.Available };
        setRooms(prev => [...prev, newRoom]);
    };
    
    const updateRoom = (updatedRoom: Room) => {
        setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    };
    
    const recordPayment = (invoiceId: string) => {
        setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: PaymentStatus.Paid, paymentDate: new Date().toISOString().split('T')[0] } : inv));
    };

    const addMaintenanceRequest = (request: Omit<MaintenanceRequest, 'id'|'requestDate'|'status'>) => {
        const newRequest: MaintenanceRequest = {
            ...request,
            id: `m${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            status: MaintenanceStatus.Pending,
        };
        setMaintenanceRequests(prev => [newRequest, ...prev]);
    };

    const updateMaintenanceStatus = (requestId: string, status: MaintenanceStatus) => {
        setMaintenanceRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req));
    };


    return {
        rooms,
        tenants,
        invoices,
        maintenanceRequests,
        addTenant,
        updateTenant,
        checkoutTenant,
        addRoom,
        updateRoom,
        recordPayment,
        addMaintenanceRequest,
        updateMaintenanceStatus,
    };
}
