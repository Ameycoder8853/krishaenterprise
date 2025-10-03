/* eslint-disable @next/next/no-img-element */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Krisha Enterprise Logo"
      className={className}
    />
  );
}
