'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

interface GaleriItem {
  _id: string; judul: string; gambar: string; kategori: string;
}

const placeholders: GaleriItem[] = [
  { _id:'1', judul:'Seminar Investasi 2024',        kategori:'Seminar',   gambar:'' },
  { _id:'2', judul:'Sekolah Pasar Modal Batch 3',   kategori:'Edukasi',   gambar:'' },
  { _id:'3', judul:'Kunjungan ke Bursa Efek',       kategori:'Kunjungan', gambar:'' },
  { _id:'4', judul:'Rapat Kerja Pengurus',          kategori:'Internal',  gambar:'' },
  { _id:'5', judul:'Pelatihan Analisis Teknikal',   kategori:'Edukasi',   gambar:'' },
  { _id:'6', judul:'Gathering Anggota KSPM',        kategori:'Internal',  gambar:'' },
];

// Monochromatic palette variants for placeholder cells
const tints = [
  { bg: '#1A3526', label: '#4A5E52' },
  { bg: '#162E22', label: '#4A5E52' },
  { bg: '#1C3A28', label: '#4A5E52' },
  { bg: '#142C20', label: '#4A5E52' },
  { bg: '#18312A', label: '#4A5E52' },
  { bg: '#1E3D2A', label: '#4A5E52' },
];

export default function GaleriSection() {
  const [items, setItems] = useState<GaleriItem[]>([]);

  useEffect(() => {
    fetch('/api/galeri')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setItems(d.slice(0, 6)); })
      .catch(() => {});
  }, []);

  const display = items.length > 0 ? items : placeholders;

  return (
    <section
      id="galeri"
      className="py-28"
      style={{ background: '#132A1E', borderTop: '1px solid #1E3D2A' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <span className="section-label mb-5 block">Galeri Kegiatan</span>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: '#EDEDE8',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              Momen &{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #C9A227, #E8D080)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Kegiatan
              </em>
            </h2>
          </div>
          <Link href="/galeri" className="btn-outline shrink-0" id="galeri-all-btn">
            Galeri Lengkap <HiArrowRight />
          </Link>
        </motion.div>

        <div className="divider mb-10" />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {display.map((item, i) => {
            const tint = tints[i % tints.length];
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                style={{ background: tint.bg }}
              >
                {item.gambar ? (
                  <Image
                    src={item.gambar} alt={item.judul} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  /* Placeholder: monochrome with index number */
                  <div
                    className="absolute inset-0 flex items-end p-4"
                    style={{ background: tint.bg }}
                  >
                    <span
                      className="font-mono text-5xl font-bold opacity-[0.07]"
                      style={{ color: '#C9A227', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(10,26,18,0.9) 0%, transparent 60%)' }}
                >
                  <div
                    className="text-xs font-semibold uppercase mb-1"
                    style={{ color: '#C9A227', letterSpacing: '0.1em', opacity: 0.8 }}
                  >
                    {item.kategori}
                  </div>
                  <p
                    className="text-sm font-medium line-clamp-1"
                    style={{ color: '#EDEDE8', fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.judul}
                  </p>
                </div>

                {/* Subtle gold border on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: '1px solid rgba(201,162,39,0.25)' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
