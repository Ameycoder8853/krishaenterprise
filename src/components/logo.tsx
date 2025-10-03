import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(className)}
      aria-label="Krisha Enterprise Logo"
    >
      <rect width="100" height="100" rx="12" fill="black" />
      <text
        x="50"
        y="58"
        fontFamily="Poppins, sans-serif"
        fontSize="48"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        KE
      </text>
      <defs>
        <linearGradient id="teal-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="100%" stopColor="#21e9c5" />
        </linearGradient>
        <linearGradient id="orange-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbb040" />
          <stop offset="100%" stopColor="#ffecb3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
