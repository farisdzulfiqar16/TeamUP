import { Inbox } from "lucide-react";

function EmptyState({ title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">

      <Inbox size={40} className="mb-3 text-gray-300 dark:text-gray-600" />

      <h2 className="font-medium text-gray-800 dark:text-gray-100">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {desc}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
