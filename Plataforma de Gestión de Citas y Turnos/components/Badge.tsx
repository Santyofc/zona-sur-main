'use client';
import { AppointmentStatus } from '@/lib/types';

interface Props { status: AppointmentStatus; className?: string; }

const labels: Record<AppointmentStatus, string> = {
  confirmada: 'Confirmada',
  pendiente: 'Pendiente',
  cancelada: 'Cancelada',
  completada: 'Completada',
};

export default function Badge({ status, className = '' }: Props) {
  return (
    <span className={`badge-${status} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {labels[status]}
    </span>
  );
}
