import React, { useEffect } from "react";

function Toast({ toasts, onClose }) {
  useEffect(() => {
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => onClose(toast.id), 2400);
      return timer;
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts, onClose]);

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .toast-enter {
          animation: slideInRight 0.3s ease-out;
        }
        .toast-exit {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>

      <div className="fixed top-6 right-6 z-50 space-y-2 flex flex-col">
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const bgColor = isSuccess ? "bg-green-600" : "bg-red-600";
          const icon = isSuccess ? "✓" : "✕";

          return (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg toast-enter ${
                toast.exiting ? "toast-exit" : ""
              }`}
              style={{
                animation: toast.exiting
                  ? "fadeOut 0.3s ease-out forwards"
                  : "slideInRight 0.3s ease-out",
              }}
            >
              <div className={`${bgColor} p-1 rounded-full`}>
                <span className="text-sm font-bold">{icon}</span>
              </div>
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Toast;
