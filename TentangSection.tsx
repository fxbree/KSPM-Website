'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

const values = [
  { judul: 'Integritas',       deskripsi: 'Menjunjung tinggi kejujuran dan etika dalam setiap kegiatan', ikon: 'I' },
  { judul: 'Inovasi',          deskripsi: 'Selalu berinovasi dalam pengembangan program dan kegiatan',    ikon: 'II' },
  { judul: 'Kolaborasi',       deskripsi: 'Bekerja sama untuk mencapai tujuan organisasi bersama',        ikon: 'III' },
  { judul: 'Profesionalisme',  deskripsi: 'Bertindak secara profesional dalam setiap situasi',            ikon: 'IV' },
];

export default function TentangSection() {
  return (
    <section
      id="tentang"
      className="py-28"
      style={{ background: '#0E2018', borderTop: '1px solid #1E3D2A' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Left: copy ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-6 block">Tentang Kami</span>

            <h2
              className="mb-6"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: '#EDEDE8',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              Mengenal{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #C9A227, #E8D080)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                KSPM UNIPI
              </em>
            </h2>

            <div className="divider mb-7" />

            <p className="text-sm leading-relaxed mb-5" style={{ color: '#8A9E90', lineHeight: '1.85' }}>
              KSPM (Kelompok Studi Pasar Modal) UNIPI adalah organisasi kemahasiswaan yang
              berdedikasi dalam bidang edukasi pasar modal dan investasi di Universitas
              Insan Pembangunan Indonesia.
            </p>
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#8A9E90', lineHeight: '1.85' }}>
              Kami hadir untuk memfasilitasi mahasiswa dalam belajar, berdiskusi, dan
              mengembangkan kemampuan analisis investasi melalui berbagai program edukasi,
              seminar, dan simulasi trading.
            </p>

            <Link href="/tentang" className="btn-outline" id="tentang-more-btn">
              Selengkapnya <HiArrowRight />
            </Link>
          </motion.div>

          {/* ── Right: nilai organisasi ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.judul}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="card card-gold group"
                style={{ cursor: 'default' }}
              >
                {/* Roman numeral */}
                <div
                  className="mb-4 text-xs font-mono"
                  style={{ color: '#C9A227', opacity: 0.5, letterSpacing: '0.1em' }}
                >
                  {v.ikon}
                </div>
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ fontFamily: "'Inter', sans-serif", color: '#EDEDE8' }}
                >
                  {v.judul}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5E52', lineHeight: '1.7' }}>
                  {v.deskripsi}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
