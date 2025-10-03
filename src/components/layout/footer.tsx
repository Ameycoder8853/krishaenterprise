import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/logo';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'Calculator', href: '/calculator' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Login', href: '/login' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/5">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-10 w-10" />
              <span className="font-headline text-xl font-bold">Krisha Enterprise</span>
            </Link>
            <p className="max-w-xs text-foreground/80">
              Simplifying legal agreements with technology and expertise.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+917045406998" className="text-foreground/80 hover:text-primary">
                  +91 70454 06998
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:support@krishaenterprise.com" className="text-foreground/80 hover:text-primary">
                  support@krishaenterprise.com
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
             <h4 className="font-headline text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-foreground/80 transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-foreground/80 transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-foreground/80 transition-colors hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {currentYear} Krisha Enterprise. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
