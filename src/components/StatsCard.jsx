function StatsCard({ title, value, subtitle }) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{value}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>
      </div>
    );
  }
  
  export default StatsCard;
  