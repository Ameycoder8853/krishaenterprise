
export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="256" height="256" fill="black" />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FBB040', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#D38A2D', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00A99D', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#007B70', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g transform="translate(128, 128)">
          <path
            d="M 61.88 -93.63 C 71.44 -73.31, 74.37 -50.19, 74.5 -28.06 C 74.59 -10.19, 72.88 7.31, 65.5 24.31 C 57.56 42.5, 43.19 56.5, 25.19 66.06 C 8.63 74.75, -8.13 77.13, -27.31 76.5 C -48.31 75.81, -69.69 69.5, -86.5 56.19 C -102.56 43.5, -112.13 24.19, -114.56 2.38 C -116.88 -18.94, -111.44 -40.69, -100.81 -59.56"
            stroke="url(#grad2)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            transform="rotate(20)"
          />
          <path
            d="M -61.88 93.63 C -71.44 73.31, -74.37 50.19, -74.5 28.06 C -74.59 10.19, -72.88 -7.31, -65.5 -24.31 C -57.56 -42.5, -43.19 -56.5, -25.19 -66.06 C -8.63 -74.75, 8.13 -77.13, 27.31 -76.5 C 48.31 -75.81, 69.69 -69.5, 86.5 -56.19 C 102.56 -43.5, 112.13 -24.19, 114.56 -2.38 C 116.88 18.94, 111.44 40.69, 100.81 59.56"
            stroke="url(#grad1)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            transform="rotate(20)"
          />
        </g>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="white"
          fontSize="72"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          KE
        </text>
      </svg>
    </div>
  );
}
