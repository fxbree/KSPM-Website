'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/kspm.unipi/', label: 'Instagram' },
  { icon: FaYoutube,   href: '#',                       label: 'YouTube' },
  { icon: FaLinkedin,  href: '#',                       label: 'LinkedIn' },
  { icon: FaTwitter,   href: '#',                       label: 'Twitter' },
  { icon: FaEnvelope,  href: 'mailto:kspmipem@gmail.com', label: 'Email' },
];

const footerLinks = {
  Organisasi: [
    { label: 'Tentang Kami',      href: '/tentang' },
    { label: 'Struktur Pengurus', href: '/pengurus' },
    { label: 'Program Kerja',     href: '/program-kerja' },
  ],
  Konten: [
    { label: 'Artikel & Edukasi', href: '/artikel' },
    { label: 'Galeri Kegiatan',   href: '/galeri' },
    { label: 'Hubungi Kami',      href: '/kontak' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#0A1A12', borderTop: '1px solid #1E3D2A' }}>
      <style>{`
        .footer-social-icon { color: #4A5E52; border: 1px solid #1E3D2A; background: rgba(19,42,30,0.8); }
        .footer-social-icon:hover { color: #C9A227; border-color: rgba(201,162,39,0.4); }
        .footer-link { color: #4A5E52; }
        .footer-link:hover { color: #8A9E90; }
        .footer-admin-link { color: #2A4030; }
        .footer-admin-link:hover { color: #4A5E52; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* ── Brand ─────────────────────────────────────────────────── */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="shrink-0">
                <NextImage
                  src="/logo-kspm.png"
                  alt="Logo KSPM UNIPI"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <div
                  className="font-semibold text-sm"
                  style={{ fontFamily: "'Inter', sans-serif", color: '#EDEDE8', letterSpacing: '0.12em' }}
                >
                  KSPM UNIPI
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: '#8A9E90', letterSpacing: '0.06em', fontSize: '0.65rem' }}
                >
                  Kelompok Studi Pasar Modal
                </div>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: '#8A9E90', lineHeight: '1.75' }}
            >
              Membangun generasi investor muda yang cerdas dan berkarakter melalui
              edukasi pasar modal di Universitas Insan Pembangunan Indonesia.
            </p>

            <div className="divider mb-6" />

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="footer-social-icon w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ borderRadius: '2px' }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ─────────────────────────────────────────── */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-xs font-semibold uppercase mb-5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.16em',
                  color: '#C9A227',
                  opacity: 0.8,
                }}
              >
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="footer-link text-sm transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid #1E3D2A' }}
        >
          <p className="text-xs" style={{ color: '#4A5E52', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} KSPM UNIPI. All rights reserved.
          </p>
          <Link href="/admin/dashboard" className="footer-admin-link text-xs transition-colors duration-200">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
