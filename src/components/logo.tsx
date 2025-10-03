import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(className)}
      aria-label="Krisha Enterprise Logo"
    >
      <rect width="100" height="100" fill="black" />
      <g transform="translate(50 50)">
        {[...Array(8)].map((_, i) => (
          <path
            key={`teal-swoosh-${i}`}
            d="M 0 -45 A 45 45 0 0 1 31.8 -31.8 L 27 -27 A 38 38 0 0 0 0 -38 Z"
            fill="url(#teal-gradient)"
            transform={`rotate(${i * 45})`}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <path
            key={`orange-swoosh-${i}`}
            d="M 0 45 A 45 45 0 0 1 -31.8 31.8 L -27 27 A 38 38 0 0 0 0 38 Z"
            fill="url(#orange-gradient)"
            transform={`rotate(${i * 45})`}
          />
        ))}
      </g>
      <text
        x="50"
        y="58"
        fontFamily="Poppins, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        KE
      </text>
      <defs>
        <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#1f9c8e" />
        </linearGradient>
        <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb74d" />
          <stop offset="100%" stopColor="#f57c00" />
        </linearGradient>
      </defs>
    </svg>
  );
}
