
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <img
        src="/logo.png"
        alt="Krisha Enterprise Logo"
        className="object-contain w-full h-full"
        aria-label="Krisha Enterprise Logo"
      />
    </div>
  );
}
