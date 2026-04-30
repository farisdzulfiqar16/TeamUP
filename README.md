# 🚀 TeamUp - Aplikasi Kolaborasi Tim

TeamUp adalah aplikasi berbasis web yang membantu pengguna untuk **membuat tim, mencari tim, dan berkolaborasi** dalam berbagai bidang seperti development, design, dan research.

Aplikasi ini dikembangkan sebagai bagian dari **Tugas Akhir mata kuliah Technopreneurship**, dengan fokus pada pengalaman pengguna (UI/UX) dan implementasi frontend modern menggunakan React.

---

## ✨ Fitur Utama

- 👥 **Buat Tim**
  - Multi-step form (Informasi → Deskripsi → Review)
  - Validasi input
  - Data tersimpan di localStorage (tanpa backend)

- 🔍 **Cari Tim**
  - Pencarian tim
  - Placeholder & skeleton loading
  - Siap dikembangkan ke fitur filter & join

- 📊 **Dashboard**
  - Statistik tim (aktif, lamaran, undangan)
  - Daftar tim aktif user
  - Rekomendasi tim

- 🧑‍🤝‍🧑 **Tim Saya**
  - Menampilkan tim yang dibuat user
  - Sinkronisasi otomatis via localStorage

- 🌙 **Dark Mode**
  - Toggle dark/light mode
  - Persist menggunakan localStorage
  - Menggunakan Tailwind `darkMode: "class"`

- 💬 **Pesan & Notifikasi (UI Ready)**
  - Struktur sudah tersedia
  - Siap dikembangkan ke real-time feature

---

## 🧱 Struktur Project
    
    src/
    │
    ├── assets/ # Asset (gambar, icon, dll)
    │
    ├── components/ # Reusable components
    │ ├── EmptyState.jsx
    │ ├── Header.jsx
    │ ├── PageLayout.jsx
    │ ├── Sidebar.jsx
    │ ├── StatsCard.jsx
    │ ├── StepIndicator.jsx
    │ └── TeamCard.jsx
    │
    ├── data/ # Dummy data & static data
    │ ├── messages.js
    │ └── teams.js
    │
    ├── layout/
    │ └── MainLayout.jsx
    │
    ├── pages/ # Halaman utama aplikasi
    │ ├── CariTim.jsx
    │ ├── ComingSoon.jsx
    │ ├── CreateTeam.jsx
    │ ├── Dashboard.jsx
    │ ├── Notifikasi.jsx
    │ ├── Pengaturan.jsx
    │ ├── Pesan.jsx
    │ ├── Profil.jsx
    │ ├── TeamWorkspace.jsx
    │ └── TimSaya.jsx
    │
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx


---

## ⚙️ Teknologi yang Digunakan

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🌐 React Router DOM
- 💾 LocalStorage (State Persistence)

---

## 💡 Konsep Pengembangan

- **Frontend-first approach** (tanpa backend)
- Simulasi sistem menggunakan:
  - localStorage untuk data persistence
  - dummy data untuk rekomendasi tim
- Fokus pada:
  - UI/UX
  - modular component
  - clean structure

---

## 🚧 Status Pengembangan

🔄 Dalam pengembangan aktif

Fitur yang direncanakan:
- Join / Apply ke tim
- Filter & kategori tim
- Sistem notifikasi real
- Team workspace interaktif

---

## ▶️ Cara Menjalankan Project


    # install dependencies
    npm install
    
    # run development server
    npm run dev

## 📌 Catatan
- Data tidak menggunakan backend (sementara)
- Semua data tersimpan di browser (localStorage)
- Refresh tidak menghapus data, tetapi re-run project akan reset

---

## 👨‍💻 Developer
Dikembangkan oleh:
Faris Dzulfiqar

Sebagai bagian dari pembelajaran dan eksplorasi dalam membangun produk digital berbasis tim 🚀

---

## ⭐ Penutup
Project ini tidak hanya fokus pada penyelesaian tugas, tetapi juga sebagai langkah awal menuju pengembangan produk nyata di bidang kolaborasi tim dan technopreneurship.
