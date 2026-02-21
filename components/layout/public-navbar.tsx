'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Layout, Users, ChevronRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Layout },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/forum', label: 'Community', icon: Users },
];

export const PublicNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/solutionlab-logo.jpg" alt="SolutionLab" className="h-14 rounded-lg object-contain" />
        </Link>

        {/* Centered Navigation Links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                pathname === link.href
                  ? 'bg-gradient-to-r from-[#1fb6b6]/10 to-[#2a858b]/10 text-[#1fb6b6] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#1fb6b6]'
              }`}
            >
              <link.icon className={`h-4 w-4 ${
                pathname === link.href ? 'text-[#1fb6b6]' : 'text-slate-500'
              }`} />
              {link.label}
              {pathname === link.href && (
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#1fb6b6]"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Sign In Button - Right */}
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#1fb6b6] to-[#2a858b] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#1fb6b6]/25"
          >
            <span className="relative z-10 flex items-center">
              Sign In
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          
          {/* Mobile menu button - you can implement this later if needed */}
          <button className="rounded-lg p-2 hover:bg-slate-100 md:hidden" title="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Hidden on desktop, visible on mobile */}
      <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm md:hidden">
        <div className="flex justify-around p-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                pathname === link.href
                  ? 'text-[#1fb6b6]'
                  : 'text-slate-600 hover:text-[#1fb6b6]'
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};