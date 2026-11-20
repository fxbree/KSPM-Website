'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimoni {
  _id: string; nama: string; jabatan: string; foto: string; isi: string; rating: number;
}

const placeholders: Testimoni[] = [
  { _id:'1', nama:'Ahmad Fauzi', jabatan:'Anggota KSPM, Angkatan 2022', foto:'', isi:'Bergabung dengan KSPM mengubah cara pandang saya tentang investasi. Saya mulai investasi saham sejak semester dua berkat program edukasi yang sangat berkualitas dan terstruktur.', rating:5 },
  { _id:'2', nama:'Siti Rahayu', jabatan:'Ketua Divisi Edukasi, 2023', foto:'', isi:'KSPM memberikan pengalaman nyata dalam mengelola portofolio investasi. Simulasi trading yang dilakukan sangat membantu persiapan saya menghadapi dunia kerja keuangan.', rating:5 },
  { _id:'3', nama:'Budi Santoso', jabatan:'Alumni KSPM, Angkatan 2021', foto:'', isi:'Program Sekolah Pasar Modal KSPM adalah yang terbaik. Mentor-mentornya berpengalaman dan materi yang disampaikan sangat relevan dengan kondisi pasar saat ini.', rating:5 },
];

export default function TestimoniSection() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('/api/testimoni')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setTestimoni(d); })
      .catch(() => {});
  }, []);

  const data = testimoni.length > 0 ? testimoni : placeholders;
  const prev = () => setCurrent(c => (c - 1 + data.length) % data.length);
  const next = () => setCurrent(c => (c + 1) % data.length);

  return (
    <section
      id="testimoni"
      className="py-28"
      style={{ background: '#0E2018', borderTop: '1px solid #1E3D2A' }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-6 block mx-auto" style={{ display: 'inline-block' }}>
            Testimoni
          </span>
          <h2
            className="section-title"
            style={{ fontFamily: "'Fraunces', serif", textAlign: 'center' }}
          >
            Kata{' '}
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #C9A227, #E8D080)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mereka
            </em>
          </h2>
          <div className="divider mx-auto mt-4" />
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="card-gold p-10"
              style={{
                background: '#132A1E',
                border: '1px solid rgba(201,162,39,0.18)',
                borderRadius: '4px',
              }}
            >
              {/* Opening quote mark */}
              <FaQuoteLeft
                className="mb-6"
                style={{ color: '#C9A227', opacity: 0.25, fontSize: '2rem' }}
              />

              {/* Quote text */}
              <blockquote
                className="mb-8 leading-relaxed"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  color: '#EDEDE8',
                  lineHeight: '1.75',
                }}
              >
                {data[current].isi}
              </blockquote>

              {/* Hairline divider */}
              <div className="divider-full mb-7" />

              {/* Person */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 overflow-hidden flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(201,162,39,0.08)',
                    border: '1px solid rgba(201,162,39,0.25)',
                    borderRadius: '2px',
                  }}
                >
                  {data[current].foto ? (
                    <Image src={data[current].foto} alt={data[current].nama} width={48} height={48} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-lg font-mono" style={{ color: '#C9A227', opacity: 0.5 }}>
                      {data[current].nama.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ fontFamily: "'Inter', sans-serif", color: '#EDEDE8' }}
                  >
                    {data[current].nama}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: '#4A5E52', letterSpacing: '0.06em' }}
                  >
                    {data[current].jabatan}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {data.length > 1 && (
            <div className="flex items-center justify-between mt-6">
              {/* Dots */}
              <div className="flex gap-2">
                {data.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === current ? '2rem' : '0.4rem',
                      height: '1px',
                      background: i === current ? '#C9A227' : '#1E3D2A',
                    }}
                    aria-label={`Testimoni ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  id="testimoni-prev"
                  onClick={prev}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(19,42,30,0.8)',
                    border: '1px solid #1E3D2A',
                    color: '#4A5E52',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)';
                    e.currentTarget.style.color = '#C9A227';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1E3D2A';
                    e.currentTarget.style.color = '#4A5E52';
                  }}
                >
                  <HiChevronLeft size={18} />
                </button>
                <button
                  id="testimoni-next"
                  onClick={next}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(19,42,30,0.8)',
                    border: '1px solid #1E3D2A',
                    color: '#4A5E52',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)';
                    e.currentTarget.style.color = '#C9A227';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1E3D2A';
                    e.currentTarget.style.color = '#4A5E52';
                  }}
                >
                  <HiChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
