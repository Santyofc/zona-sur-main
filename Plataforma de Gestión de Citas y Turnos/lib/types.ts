// ─── Types ──────────────────────────────────────────────────────────────────

export type UserRole = "business" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  businessId?: string; // for business users
  clientId?: string; // for client users
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  coverColor: string;
  ownerId: string;
}

export interface Employee {
  id: string;
  businessId: string;
  name: string;
  specialty: string;
  color: string;
  avatar: string;
  workDays: number[]; // 0=sun, 1=mon, ...
  startHour: number;
  endHour: number;
  active: boolean;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: string;
  active: boolean;
}

export type AppointmentStatus =
  | "pendiente"
  | "confirmada"
  | "completada"
  | "cancelada";

export interface Appointment {
  id: string;
  businessId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  employeeId: string;
  employeeName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  notes?: string;
  paymentStatus: "pendiente" | "pagado";
  paymentMethod?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  method: string;
  status: "pagado" | "fallido" | "reembolsado";
  date: string;
}
