'use client';

import NextImage from 'next/image';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/',             label: 'Beranda' },
  { href: '/tentang',      label: 'Tentang' },
  { href: '/pengurus',     label: 'Pengurus' },
  { href: '/program-kerja',label: 'Program' },
  { href: '/artikel',      label: 'Artikel' },
  { href: '/galeri',       label: 'Galeri' },
  { href: '/kontak',       label: 'Kontak' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(13,28,20,0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(30,61,42,0.8)',
      } : { background: 'transparent' }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="KSPM UNIPI">
            <div className="transition-all duration-300 group-hover:scale-105">
              <NextImage
                src="/logo-kspm.png"
                alt="Logo KSPM UNIPI"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block leading-none">
              <div
                className="font-semibold text-sm uppercase"
                style={{ fontFamily: "'Inter', sans-serif", color: '#EDEDE8', letterSpacing: '0.12em' }}
              >
                KSPM
              </div>
              <div
                className="text-xs uppercase"
                style={{ color: '#C9A227', opacity: 0.85, letterSpacing: '0.16em', fontSize: '0.58rem' }}
              >
                UNIPI
              </div>
            </div>
          </Link>

          {/* ── Desktop links ─────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.1em',
                    color: isActive ? '#C9A227' : '#8A9E90',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#EDEDE8'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#8A9E90'; }}
                >
                  {label}
                  {/* Active underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ background: '#C9A227', opacity: 0.7 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── CTA + Mobile toggle ───────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <Link
              href="/kontak"
              id="navbar-cta"
              className="hidden md:inline-flex btn-primary text-xs py-2 px-5"
            >
              Bergabung
            </Link>
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 transition-colors"
              style={{ color: '#8A9E90' }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              onMouseEnter={e => e.currentTarget.style.color = '#EDEDE8'}
              onMouseLeave={e => e.currentTarget.style.color = '#8A9E90'}
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(13,28,20,0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(30,61,42,0.8)',
            }}
          >
            <div className="px-6 py-5 space-y-0.5">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="block px-3 py-3 text-xs font-semibold uppercase tracking-widest2 transition-colors border-b"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '0.12em',
                      color: isActive ? '#C9A227' : '#8A9E90',
                      borderColor: 'rgba(30,61,42,0.5)',
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/kontak"
                  className="btn-primary w-full justify-center text-xs"
                >
                  Bergabung dengan KSPM
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
