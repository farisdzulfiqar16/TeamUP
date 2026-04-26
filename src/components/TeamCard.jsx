import React from "react";

function TeamCard({ teamName, category, description, action, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-[280px] cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
        {teamName}
      </h3>

      <p className="text-sm text-gray-500">{category}</p>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>

      {/* ACTION BUTTON */}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export default TeamCard;