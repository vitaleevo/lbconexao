import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /conexaolbadm routes except /login and recovery
    if (pathname.startsWith('/conexaolbadm') && pathname !== '/conexaolbadm/login') {
        const session = request.cookies.get('lb_admin_session');

        if (!session) {
            const loginUrl = new URL('/conexaolbadm/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // If already logged in, don't show login page
    if (pathname === '/conexaolbadm/login') {
        const session = request.cookies.get('lb_admin_session');
        if (session) {
            const adminUrl = new URL('/conexaolbadm', request.url);
            return NextResponse.redirect(adminUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/conexaolbadm/:path*'],
};
