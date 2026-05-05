import React from "react";

function PageLayout({ title, children, action }) {
  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold text-black">
          {title}
        </h1>

        {action && action}
      </div>

      {/* Content */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        {children}
      </div>

    </div>
  );
}

export default PageLayout;
