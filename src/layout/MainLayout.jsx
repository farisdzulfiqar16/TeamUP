import React from "react";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-white text-black transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;