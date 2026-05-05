import React from "react";

function Header() {
  return (
    <div className="mb-6 flex items-center justify-between">
      
     
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Hai, Faris! 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Temukan tim yang tepat dan mulai kolaborasi
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Cari tim..."
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-none ring-0 placeholder:text-gray-500 focus:border-blue-500"
        />

        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>

    </div>
  );
}

export default Header;
