'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Calculator', href: '/calculator' },
  { name: 'AI Summarizer', href: '/dashboard/summarize' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block font-headline">Krisha Enterprise</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/" className="flex items-center space-x-2 mb-8">
                        <Logo className="h-8 w-8" />
                        <span className="font-bold font-headline">Krisha Enterprise</span>
                    </Link>
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                            'text-lg',
                            pathname === link.href ? 'text-foreground font-semibold' : 'text-foreground/70'
                            )}
                        >
                            {link.name}
                        </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="ml-4 md:hidden">
              <Link href="/" className="flex items-center space-x-2">
                  <Logo className="h-8 w-8" />
              </Link>
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
