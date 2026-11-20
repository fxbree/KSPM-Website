'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

// Stat data — terminal style
const stats = [
  { micro: 'TAHUN BERDIRI', value: '2025' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A1A12 0%, #0E2018 40%, #0D2216 100%)' }}
    >
      {/* ── Ambient glows ─────────────────────────────────────────────────── */}
      <div
        className="hero-glow opacity-[0.12] w-[600px] h-[600px] -top-40 -left-40"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent 70%)' }}
      />
      <div
        className="hero-glow opacity-[0.08] w-[400px] h-[400px] bottom-0 right-0"
        style={{ background: 'radial-gradient(circle, #1E6B40, transparent 70%)' }}
      />

      {/* ── Fine grid ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,162,39,1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Thin vertical rule (decorative) ───────────────────────────────── */}
      <div
        className="absolute top-0 left-1/4 w-px h-full hidden lg:block opacity-[0.06]"
        style={{ background: 'linear-gradient(to bottom, transparent, #C9A227 30%, #C9A227 70%, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="section-label">
              Kelompok Studi Pasar Modal — UNIPI
            </span>
          </motion.div>

          {/* Headline — serif */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 500,
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#EDEDE8',
            }}
          >
            Wadah Edukasi{' '}
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #C9A227, #E8D080, #C9A227)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Pasar Modal
            </em>
            {' '}untuk Mahasiswa UNIPI
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 max-w-xl"
            style={{ color: '#8A9E90', fontSize: '1rem', lineHeight: '1.75' }}
          >
            Kami memfasilitasi mahasiswa dalam memahami investasi, analisis saham,
            dan literasi keuangan melalui program edukasi, seminar, dan simulasi trading.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-20"
          >
            <Link href="/kontak" className="btn-primary" id="hero-cta-join">
              Bergabung Sekarang <HiArrowRight />
            </Link>
            <Link href="/program-kerja" className="btn-secondary" id="hero-cta-program">
              Lihat Program Kami
            </Link>
          </motion.div>

          {/* ── Stats — data terminal style ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-0 sm:divide-x divide-[#1E3D2A]"
          >
            {stats.map(({ micro, value }) => (
              <div key={micro} className="sm:px-8 first:pl-0 last:pr-0 py-3 sm:py-0">
                <div className="stat-label">{micro}</div>
                <div
                  className="stat-number"
                  style={{ fontSize: '2rem' }}
                >
                  {value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,162,39,0.4))' }} />
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.16em', color: '#4A5E52', textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
