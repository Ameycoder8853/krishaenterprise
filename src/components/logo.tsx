import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo.png"
        alt="Krisha Enterprise Logo"
        fill
        className="object-contain"
        aria-label="Krisha Enterprise Logo"
      />
    </div>
  );
}
