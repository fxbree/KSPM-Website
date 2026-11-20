'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { signOut } from 'next-auth/react';
import {
  HiHome, HiUserGroup, HiBriefcase, HiPencil, HiPhotograph,
  HiStar, HiInformationCircle, HiMenu, HiLogout, HiExternalLink,
} from 'react-icons/hi';

const navItems = [
  { href: '/admin/dashboard',   icon: HiHome,              label: 'Dashboard' },
  { href: '/admin/pengurus',    icon: HiUserGroup,          label: 'Pengurus' },
  { href: '/admin/program-kerja',icon: HiBriefcase,         label: 'Program Kerja' },
  { href: '/admin/artikel',     icon: HiPencil,             label: 'Artikel' },
  { href: '/admin/galeri',      icon: HiPhotograph,         label: 'Galeri' },
  { href: '/admin/testimoni',   icon: HiStar,               label: 'Testimoni' },
  { href: '/admin/tentang',     icon: HiInformationCircle,  label: 'Tentang' },
];

// ── CSS-in-JS constants ──────────────────────────────────────────────────────
const S = {
  bg:       '#0A1A12',
  sidebar:  '#0E2018',
  border:   '#1E3D2A',
  gold:     '#C9A227',
  cream:    '#EDEDE8',
  muted:    '#8A9E90',
  dim:      '#4A5E52',
  hover:    '#132A1E',
  active:   'rgba(201,162,39,0.1)',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: S.bg }}>
        <div
          className="w-10 h-10 border-2 border-t-transparent animate-spin"
          style={{ borderColor: S.gold, borderTopColor: 'transparent', borderRadius: '2px' }}
        />
      </div>
    );
  }
  if (!session) return null;

  return (
    <div className="min-h-screen flex" style={{ background: S.bg }}>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: S.sidebar, borderRight: `1px solid ${S.border}` }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: `1px solid ${S.border}` }}
        >
          <div className="shrink-0">
            <NextImage
              src="/logo-kspm.png"
              alt="Logo KSPM"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div className="leading-none">
            <div className="text-xs font-semibold" style={{ color: S.cream, letterSpacing: '0.08em' }}>
              KSPM Admin
            </div>
            <div className="text-xs mt-0.5" style={{ color: S.dim, letterSpacing: '0.06em', fontSize: '0.6rem' }}>
              CMS Panel
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-200"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.1em',
                  color: isActive ? S.gold : S.dim,
                  background: isActive ? S.active : 'transparent',
                  borderLeft: isActive ? `2px solid ${S.gold}` : '2px solid transparent',
                  borderRadius: '0 2px 2px 0',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = S.muted; e.currentTarget.style.background = S.hover; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = S.dim; e.currentTarget.style.background = 'transparent'; }}}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-3 py-3 space-y-0.5"
          style={{ borderTop: `1px solid ${S.border}` }}
        >
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-wider transition-colors"
            style={{ color: S.dim, letterSpacing: '0.1em' }}
            onMouseEnter={e => e.currentTarget.style.color = S.muted}
            onMouseLeave={e => e.currentTarget.style.color = S.dim}
          >
            <HiExternalLink size={14} /> Lihat Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-wider transition-colors"
            style={{ color: S.dim, letterSpacing: '0.1em' }}
            onMouseEnter={e => e.currentTarget.style.color = '#A05050'}
            onMouseLeave={e => e.currentTarget.style.color = S.dim}
          >
            <HiLogout size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(5,10,8,0.7)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-5 py-4"
          style={{
            background: 'rgba(14,32,24,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${S.border}`,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 transition-colors"
            style={{ color: S.dim }}
            onMouseEnter={e => e.currentTarget.style.color = S.cream}
            onMouseLeave={e => e.currentTarget.style.color = S.dim}
          >
            <HiMenu size={20} />
          </button>
          <div className="hidden lg:block" />

          {/* User pill */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium" style={{ color: S.cream }}>{session.user?.name}</div>
              <div style={{ color: S.dim, fontSize: '0.65rem' }}>{session.user?.email}</div>
            </div>
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold"
              style={{
                background: 'rgba(201,162,39,0.1)',
                border: `1px solid rgba(201,162,39,0.3)`,
                color: S.gold,
                borderRadius: '2px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
