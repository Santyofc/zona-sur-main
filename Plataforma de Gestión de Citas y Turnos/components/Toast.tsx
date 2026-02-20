'use client';
import { useApp } from '@/lib/store';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { state, dispatch } = useApp();
  if (!state.toast) return null;
  const { message, type } = state.toast;
  const icons = { success: CheckCircle, error: XCircle, info: Info };
  const Icon = icons[type];
  return (
    <div className={`toast toast-${type}`}>
      <Icon size={18} />
      <span>{message}</span>
      <button
        onClick={() => dispatch({ type: 'HIDE_TOAST' })}
        className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}
