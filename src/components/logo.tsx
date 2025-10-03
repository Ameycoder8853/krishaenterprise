export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Krisha Enterprise Logo"
      >
        <defs>
          <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#34E4A0', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00A98F', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FBB040', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#D48C1A', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="black" />
        <g transform="translate(50 50) rotate(-15)">
          <path d="M -45,10 C -40,-15 10,-40 35,-35 C 25,-45 -5,-35 -30,20 Z" fill="url(#grad-teal)" />
          <path d="M -35,-35 C -15,-40 10,-30 10, -45 C 20, -30 0, -15 -40, -20 Z" fill="url(#grad-orange)" />
          <path d="M 45,-10 C 40,15 -10,40 -35,35 C -25,45 5,35 30,-20 Z" fill="url(#grad-teal)" />
          <path d="M 35,35 C 15,40 -10,30 -10, 45 C -20, 30 0, 15 40, 20 Z" fill="url(#grad-orange)" />
        </g>
        <text
          x="50"
          y="55"
          fontFamily="Poppins, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          KE
        </text>
      </svg>
    </div>
  );
}
