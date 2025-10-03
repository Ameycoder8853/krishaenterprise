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
      <g transform="translate(50,50) rotate(-22.5)">
        {[...Array(4)].map((_, i) => (
          <g key={`swoosh-group-${i}`} transform={`rotate(${i * 90})`}>
            <path
              d="M 0 -48 C 15 -48, 28 -40, 38 -25"
              stroke="url(#teal-gradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 0 -42 C 12 -42, 23 -36, 31 -24"
              stroke="url(#teal-gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
             <path
              d="M -10 -45 C 5 -45, 15 -38, 25 -25"
              stroke="url(#teal-gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
         {[...Array(4)].map((_, i) => (
          <g key={`swoosh-group-2-${i}`} transform={`rotate(${i * 90 + 45})`}>
            <path
              d="M 0 -48 C 15 -48, 28 -40, 38 -25"
              stroke="url(#orange-gradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 0 -42 C 12 -42, 23 -36, 31 -24"
              stroke="url(#orange-gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
             <path
              d="M -10 -45 C 5 -45, 15 -38, 25 -25"
              stroke="url(#orange-gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
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
        <linearGradient id="teal-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1f9c8e" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
        <linearGradient id="orange-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f57c00" />
          <stop offset="100%" stopColor="#ffb74d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
