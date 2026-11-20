'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';

const statusLabel: Record<string, string> = {
  upcoming:  'Akan Datang',
  ongoing:   'Berlangsung',
  completed: 'Selesai',
};

interface ProgramKerja {
  _id: string; nama: string; deskripsi: string;
  gambar: string; divisi: string; status: string;
}

const placeholder: ProgramKerja[] = [
  { _id:'1', nama:'Sekolah Pasar Modal', deskripsi:'Program edukasi intensif tentang dasar-dasar investasi saham dan pasar modal untuk mahasiswa pemula.', gambar:'', divisi:'Edukasi', status:'upcoming' },
  { _id:'2', nama:'Stock Trading Competition', deskripsi:'Kompetisi simulasi trading saham antar mahasiswa se-Jabodetabek dengan mentor berpengalaman.', gambar:'', divisi:'Event', status:'ongoing' },
  { _id:'3', nama:'Seminar Investasi', deskripsi:'Seminar dengan pembicara dari BEI dan manajer investasi terkemuka seputar strategi pasar modal.', gambar:'', divisi:'Event', status:'completed' },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  upcoming:  { bg: 'rgba(100,149,237,0.08)', color: '#90B4E0' },
  ongoing:   { bg: 'rgba(201,162,39,0.10)',  color: '#C9A227' },
  completed: { bg: 'rgba(74,94,82,0.25)',    color: '#4A5E52' },
};

export default function ProgramKerjaSection() {
  const [programs, setPrograms] = useState<ProgramKerja[]>([]);

  useEffect(() => {
    fetch('/api/program-kerja')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setPrograms(d.slice(0, 3)); })
      .catch(() => {});
  }, []);

  const display = programs.length > 0 ? programs : placeholder;

  return (
    <section
      id="program-kerja"
      className="py-28"
      style={{ background: '#132A1E', borderTop: '1px solid #1E3D2A' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <span className="section-label mb-6 block">Program Kerja</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
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
              Kegiatan &{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #C9A227, #E8D080)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Program Unggulan
              </em>
            </h2>
            <Link href="/program-kerja" className="btn-outline shrink-0" id="proker-all-btn">
              Semua Program <HiArrowRight />
            </Link>
          </div>
          <div className="divider mt-6" />
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {display.map((p, i) => {
            const st = statusStyle[p.status] || statusStyle.completed;
            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card card-gold overflow-hidden group"
                style={{ padding: 0 }}
              >
                {/* Image */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{ background: '#0E2018' }}
                >
                  {p.gambar ? (
                    <Image
                      src={p.gambar} alt={p.nama} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-end p-4"
                      style={{ background: 'linear-gradient(160deg, #0E2018, #132A1E)' }}
                    >
                      <div
                        className="text-2xl font-mono opacity-20"
                        style={{ color: '#C9A227', fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                  )}
                  {/* Status badge */}
                  <div
                    className="absolute top-3 right-3 badge"
                    style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}30` }}
                  >
                    {statusLabel[p.status] || p.status}
                  </div>
                </div>

                <div className="p-5">
                  {/* Divisi */}
                  <div
                    className="text-xs font-semibold uppercase mb-3"
                    style={{ color: '#C9A227', letterSpacing: '0.12em', opacity: 0.75 }}
                  >
                    {p.divisi}
                  </div>
                  <h3
                    className="font-semibold mb-3 line-clamp-1"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, color: '#EDEDE8', fontSize: '1.1rem' }}
                  >
                    {p.nama}
                  </h3>
                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: '#4A5E52', lineHeight: '1.75' }}
                  >
                    {p.deskripsi}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
