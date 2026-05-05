function StepIndicator({ step }) {
  const steps = [
    { id: 1, label: "Informasi Dasar" },
    { id: 2, label: "Kebutuhan Anggota" },
    { id: 3, label: "Detail Tambahan" },
    { id: 4, label: "Selesai" },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-4">
      {steps.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-3xl bg-white px-4 py-4 shadow-sm">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold
              ${step >= item.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
            `}
          >
            {item.id}
          </div>
          <div className="min-w-0">
            <p className={`text-xs font-medium ${step >= item.id ? "text-blue-700" : "text-gray-500"}`}>
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;
  