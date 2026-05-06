import React from "react";

function TeamCard({ teamName, category, description, roles = [], level, duration, action, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex h-full flex-col cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 transition-shadow hover:shadow-md"
    >
      {/* CONTENT SECTIONS */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
            {teamName}
          </h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {description}
          </p>
        </div>

        {/* TAGS */}
        <div className="space-y-2">
          {/* ROLES */}
          {roles && roles.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full bg-slate-100 px-2 py-1 text-slate-800 dark:text-slate-200"
                >
                  {role}
                </span>
              ))}
            </div>
          )}

          {/* LEVEL & DURATION */}
          <div className="flex gap-2 text-xs flex-wrap">
            <span className="rounded px-2 py-1 text-blue-800 bg-blue-300 dark:text-blue-200">
              {level}
            </span>
            <span className="rounded px-2 py-1 text-green-800 bg-green-500 dark:text-green-200">
              {duration}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON - ALWAYS AT BOTTOM */}
      {action && (
        <div className="mt-auto pt-4 flex justify-end">
          {action}
        </div>
      )}
    </div>
  );
}

export default TeamCard;