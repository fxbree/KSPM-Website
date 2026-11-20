'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { HiUpload, HiX, HiPhotograph } from 'react-icons/hi';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, folder = 'kspm', label = 'Gambar' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload gagal');
      }
    } catch {
      setError('Upload gagal. Coba lagi.');
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 5 * 1024 * 1024,
    onDrop: ([file]) => { if (file) upload(file); },
    onDropRejected: () => setError('File terlalu besar atau bukan gambar (maks 5MB)'),
    multiple: false,
  });

  return (
    <div>
      <label className="label">{label}</label>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-dark-border group">
          <div className="relative h-48 w-full">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-3">
            <button type="button" onClick={() => onChange('')}
              className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
              <HiX size={20} />
            </button>
            <div {...getRootProps()} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light cursor-pointer">
              <input {...getInputProps()} />
              <HiUpload size={20} />
            </div>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-dark-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-text-muted text-sm">Mengupload...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <HiPhotograph className="text-text-dim" size={40} />
              <div>
                <p className="text-text-muted text-sm">
                  {isDragActive ? 'Lepas file di sini' : 'Drag & drop gambar, atau klik untuk pilih'}
                </p>
                <p className="text-text-dim text-xs mt-1">PNG, JPG, WebP hingga 5MB</p>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
