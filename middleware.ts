import { NextRequest, NextResponse } from 'next/server';

const routeRoleMap: Record<string, string> = {
  '/student': 'STUDENT',
  '/instructor': 'INSTRUCTOR',
  '/admin': 'ADMIN',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const matchedEntry = Object.entries(routeRoleMap).find(([prefix]) => pathname.startsWith(prefix));

  if (!matchedEntry) {
    return NextResponse.next();
  }

  const [, requiredRole] = matchedEntry;
  const token = request.cookies.get('access_token')?.value;
  const role = request.cookies.get('user_role')?.value;

  if (!token || !role) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (role !== requiredRole) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/instructor/:path*', '/admin/:path*'],
};
