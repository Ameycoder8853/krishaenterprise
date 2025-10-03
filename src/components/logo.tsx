/* eslint-disable @next/next/no-img-element */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: '40px', height: '40px' }}>
        <img
        src="/logo.png"
        alt="Krisha Enterprise Logo"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
    </div>
  );
}
