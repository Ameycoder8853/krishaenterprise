import { Phone } from 'lucide-react';
import Link from 'next/link';

export function ClickToCallButton() {
  return (
    <Link
      href="tel:+919326069149"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      aria-label="Click to call"
    >
      <Phone className="h-7 w-7" />
    </Link>
  );
}
