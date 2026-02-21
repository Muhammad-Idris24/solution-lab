import { Footer } from '@/components/layout/footer';
import { PublicNavbar } from '@/components/layout/public-navbar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <PublicNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
