
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut, ChevronDown } from 'lucide-react';
import { signOut } from 'firebase/auth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useUser, useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const navLinks = [
    { name: 'About Us', href: '/about/' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Stamp Duty Calculator', href: '/calculator' },
    { name: 'Why Choose Us', href: '/#why-choose-us' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
];

const cities = [
  "Vikhroli", "Ghatkopar", "Kurla", "Sion", "Matunga", "Vashi", "Mankhurd",
  "Govandi", "Shivaji Nagar", "Kanjurmarg", "Kalyan", "Dombivli", 
  "Badlapur", "Dadar", "Andheri", "Sakinaka", "Marol", "Powai"
];


export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An unexpected error occurred.',
      });
    }
  };

  const CitiesDropdown = () => (
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80 focus-visible:ring-0">
            Cities
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>CITIES WE SERVICE</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-2 gap-2 p-2">
            {cities.map((city) => (
              <DropdownMenuItem key={city} onSelect={() => { /* Can navigate or perform action */ }}>
                {city}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img 
                src="/logo.png" 
                alt="Krisha Enterprise" 
                className="h-12 w-12 rounded-full"
              />
            <span className="font-bold sm:inline-block font-headline">Krisha Enterprise</span>
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
            <CitiesDropdown />
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
                <SheetContent side="left" className="flex flex-col">
                    <SheetHeader>
                      <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                      <SheetDescription className="sr-only">
                        Navigation links for Krisha Enterprise, including pages like About Us, How it Works, and Contact.
                      </SheetDescription>
                    </SheetHeader>
                    <Link href="/" className="flex items-center space-x-2 mb-4">
            <img 
                src="/logo.png" 
                alt="Krisha Enterprise" 
                className="h-12 w-12 rounded-full"
              />
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
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="cities" className="border-b-0">
                            <AccordionTrigger className="text-lg text-foreground/70 hover:no-underline">Cities</AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-4">
                                {cities.map((city) => (
                                  <Link key={city} href="#" className="text-foreground/70 text-base">{city}</Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    </nav>
                     <div className="mt-auto pt-4">
                      <Separator />
                       <div className="flex flex-col space-y-2 pt-4">
                          {!isUserLoading && (
                            <>
                              {user ? (
                                <Button onClick={handleLogout} variant="outline" size="lg">
                                  <LogOut className="mr-2 h-4 w-4" />
                                  Logout
                                </Button>
                              ) : (
                                <>
                                  <Button asChild size="lg" variant="ghost">
                                    <Link href="/login">Login</Link>
                                  </Button>
                                  <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary-foreground))' }} className="hover:opacity-90">
                                    <Link href="/register">Register</Link>
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                       </div>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="ml-4 md:hidden">
              <Link href="/" className="flex items-center space-x-2">
                  <Logo className="h-8 w-8" />
                  <span className="font-bold font-headline">Krisha Enterprise</span>
              </Link>
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isUserLoading && (
            <div className='hidden md:flex md:items-center md:space-x-2'>
              {user ? (
                <>
                  <Button asChild variant="secondary">
                     <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button onClick={handleLogout} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary-foreground))' }} className="hover:opacity-90">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary-foreground))' }} className="hover:opacity-90">
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
