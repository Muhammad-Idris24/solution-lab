'use client';

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      style: { border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a' },
    }}
  />
);
