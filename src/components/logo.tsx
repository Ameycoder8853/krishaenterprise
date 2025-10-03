import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Krisha Enterprise Logo"
      width={100}
      height={100}
      className={cn(className)}
      aria-label="Krisha Enterprise Logo"
    />
  );
}
