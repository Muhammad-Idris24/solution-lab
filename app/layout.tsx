import type { Metadata } from 'next';
import "./globals.css";
import { AuthProvider } from '@/components/providers/auth-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export const metadata: Metadata = {
  title: 'SolutionLab LMS',
  description: 'Production-ready LMS frontend for YandyTech community',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
