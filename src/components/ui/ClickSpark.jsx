import { useRef, useCallback } from "react";

export default function ClickSpark({
  children,
  sparkColor = "#3b82f6",
  sparkSize = 10,
  sparkRadius = 14,
  sparkCount = 6,
  duration = 400,
}) {
  const containerRef = useRef(null);

  const handleClick = useCallback(
    (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("span");
        spark.className = "click-spark";
        
        const angle = (Math.PI * 2 * i) / sparkCount;
        const velocity = 4 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        spark.style.cssText = `
          position: absolute;
          pointer-events: none;
          left: ${x}px;
          top: ${y}px;
          width: ${sparkSize}px;
          height: ${sparkSize}px;
          background-color: ${sparkColor};
          border-radius: 50%;
          opacity: 1;
          animation: sparkFly ${duration}ms ease-out forwards;
          --vx: ${vx};
          --vy: ${vy};
        `;

        containerRef.current.appendChild(spark);

        setTimeout(() => spark.remove(), duration);
      }
    },
    [sparkColor, sparkSize, sparkCount, duration]
  );

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      <style>{`
        @keyframes sparkFly {
          to {
            transform: translate(
              calc(var(--vx) * ${sparkRadius}px),
              calc(var(--vy) * ${sparkRadius}px)
            );
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
