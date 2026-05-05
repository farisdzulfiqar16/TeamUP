import React from "react";

function TeamCard({ teamName, category, description, roles = [], level, duration, action, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-70 cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 flex h-full flex-col"
    >
      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
        {teamName}
      </h3>

      <p className="text-sm text-gray-500">{category}</p>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {roles.map((role) => (
          <span
            key={role}
            className="rounded-full bg-slate-100 px-2 py-1 text-slate-800 dark:text-slate-200"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-2 text-xs">
        <span className="rounded px-2 py-1 text-blue-800 bg-blue-300 dark:text-blue-200">
          {level}
        </span>
        <span className="rounded px-2 py-1 text-green-800 bg-green-500 dark:text-green-200">
          {duration}
        </span>
      </div>

      {/* ACTION BUTTON */}
      {action && <div className="mt-auto flex justify-end">{action}</div>}
    </div>
  );
}

export default TeamCard;