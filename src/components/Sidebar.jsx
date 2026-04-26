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
    <div className="flex h-full w-60 flex-col border-r border-blue-800 bg-blue-900 p-5 text-white dark:border-gray-700 dark:bg-gray-800">
      
      {/* Logo / Title */}
      <div className="mb-6 text-lg font-bold">
        🚀 TeamUp
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-2 text-sm">
        {menu.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer rounded p-2 transition-colors ${
              location.pathname === item.path
                ? "bg-blue-700 dark:bg-gray-700"
                : "hover:bg-blue-800 dark:hover:bg-gray-700"
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Tombol di bawah */}
      <button
        onClick={() => navigate("/create-team")}
        className="mt-auto rounded bg-blue-600 p-2 text-sm transition-colors hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        + Buat Tim
      </button>

    </div>
  );
}

export default Sidebar;