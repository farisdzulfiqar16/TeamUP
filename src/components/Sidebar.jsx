import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Beranda", path: "/" },
    { name: "Cari Tim", path: "/cari" },
    { name: "Tim Saya", path: "/tim" },
    { name: "Pesan", path: "/pesan" },
    { name: "Notifikasi", path: "/notifikasi" },
    { name: "Profil", path: "/profil" },
    { name: "Pengaturan", path: "/pengaturan" },
  ];

  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-200 bg-white p-5 text-black">
      
      {/* Logo / Title */}
      <div className="mb-6 text-lg font-bold text-black">
        🚀 TeamUp
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-2 text-sm text-black">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer rounded p-2 transition-colors ${
                isActive
                  ? "bg-gray-100 text-black"
                  : "hover:bg-slate-100 text-black"
              }`}
            >
              {item.name}
            </li>
          );
        })}
      </ul>

      {/* Tombol di bawah */}
      <button
        onClick={() => navigate("/create-team")}
        className="mt-auto rounded bg-blue-600 p-2 text-sm text-black transition-colors hover:bg-blue-500 hover:bg-blue-300"
      >
        + Buat Tim
      </button>

    </div>
  );
}

export default Sidebar;