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
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-0 placeholder:text-gray-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
        />

        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

    </div>
  );
}

export default Header;
