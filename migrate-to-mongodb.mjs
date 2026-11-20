/**
 * Script migrasi data dari file JSON lokal ke MongoDB Atlas
 * Jalankan: node migrate-to-mongodb.mjs
 */

import { readFile } from 'fs/promises';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

// Baca MONGODB_URI dari .env.local
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse .env.local
let MONGODB_URI = '';
try {
  const env = readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
  const match = env.match(/^MONGODB_URI=(.+)$/m);
  if (match) MONGODB_URI = match[1].trim();
} catch {
  console.error('❌ Tidak bisa membaca .env.local');
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI tidak ditemukan di .env.local');
  process.exit(1);
}

// Collections yang akan dimigrasi
const COLLECTIONS = ['pengurus', 'program-kerja', 'tentang', 'testimoni', 'artikel', 'galeri'];

async function migrate() {
  console.log('🔌 Menghubungkan ke MongoDB Atlas...');
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Terhubung ke MongoDB Atlas\n');

    const db = client.db();

    for (const name of COLLECTIONS) {
      const filePath = path.join(__dirname, 'data', `${name}.json`);
      
      let docs;
      try {
        const raw = await readFile(filePath, 'utf-8');
        docs = JSON.parse(raw);
      } catch {
        console.log(`⏩ Skip "${name}" — file tidak ditemukan`);
        continue;
      }

      if (!Array.isArray(docs) || docs.length === 0) {
        console.log(`⏩ Skip "${name}" — tidak ada data`);
        continue;
      }

      const collection = db.collection(name);

      // Cek apakah sudah ada data di MongoDB
      const existingCount = await collection.countDocuments();
      if (existingCount > 0) {
        console.log(`⚠️  "${name}" sudah ada ${existingCount} dokumen di MongoDB — skip (tidak overwrite)`);
        continue;
      }

      // Insert semua dokumen
      // Hapus _id string agar MongoDB generate ObjectId baru (lebih aman)
      const cleaned = docs.map(({ _id, ...rest }) => rest);
      const result = await collection.insertMany(cleaned);
      console.log(`✅ "${name}" — ${result.insertedCount} dokumen berhasil dimigrasi`);
    }

    console.log('\n🎉 Migrasi selesai! Data sudah tersimpan di MongoDB Atlas.');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
  }
}

migrate();
