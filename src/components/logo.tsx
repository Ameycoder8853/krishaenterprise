import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
      aria-label="Krisha Enterprise Logo"
    >
      <g>
        <path fill="hsl(var(--primary))" d="M20,20 L80,20 L80,35 L35,35 L35,80 L20,80 Z"></path>
        <path fill="hsl(var(--accent))" d="M45,45 L80,45 L80,60 L60,60 L60,80 L45,80 Z"></path>
        <path fill="hsl(var(--primary))" d="M60,65 L80,65 L80,80 L60,80Z"></path>
      </g>
    </svg>
  );
}
