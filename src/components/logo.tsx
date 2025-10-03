import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
      aria-label="Krisha Enterprise Logo"
    >
      <defs>
        <path
          id="s-leaf"
          d="M49.999999,0.000001C49.999999,0.000001 50,25 50,25C50,25 31.5,18.5 31.5,18.5C31.5,18.5 49.999999,0.000001 49.999999,0.000001z"
        />
        <radialGradient
          id="g-swirl"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FBB040" />
          <stop offset="1" stopColor="#00AEEF" />
        </radialGradient>
      </defs>

      <g transform="translate(50,50)">
        <circle cx="0" cy="0" r="23" fill="url(#g-swirl)" />
        <g transform="scale(0.8) translate(-50, -50)">
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(15, 50, 50) scale(1.0)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(45, 50, 50) scale(0.9)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(75, 50, 50) scale(0.8)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(105, 50, 50) scale(0.9)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(135, 50, 50) scale(1.0)"
          />

          <use
            href="#s-leaf"
            fill="#FBB040"
            transform="rotate(-15, 50, 50) scale(0.9)"
          />
          <use
            href="#s-leaf"
            fill="#FBB040"
            transform="rotate(-45, 50, 50) scale(1.0)"
          />
          <use
            href="#s-leaf"
            fill="#FBB040"
            transform="rotate(-75, 50, 50) scale(0.9)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(-105, 50, 50) scale(0.8)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(-135, 50, 50) scale(0.9)"
          />
          <use
            href="#s-leaf"
            fill="#00AEEF"
            transform="rotate(-165, 50, 50) scale(1.0)"
          />

          <use
            href="#s-leaf"
            fill="#FBB040"
            transform="rotate(165, 50, 50) scale(0.8)"
          />
        </g>
      </g>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy=".3em"
        fill="white"
        fontSize="24"
        fontWeight="bold"
      >
        KE
      </text>
    </svg>
  );
}
