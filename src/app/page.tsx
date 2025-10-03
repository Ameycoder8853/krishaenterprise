import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Landmark,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Calculator from '@/components/calculator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    icon: FileText,
    title: 'Rental Agreement',
    description: 'Hassle-free rental agreements for your property.',
    link: '/services#rental',
  },
  {
    icon: Landmark,
    title: 'Leave & License',
    description: 'Official leave and license agreements made easy.',
    link: '/services#leave-license',
  },
  {
    icon: Users,
    title: 'Partnership Deed',
    description: 'Formalize your business partnership with a solid deed.',
    link: '/services#partnership',
  },
  {
    icon: Wallet,
    title: 'Affidavits',
    description: 'Create legally binding affidavits for various purposes.',
    link: '/services#affidavits',
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Fill in Details',
    description: 'Provide the necessary information through our guided forms.',
  },
  {
    step: 2,
    title: 'Upload Documents',
    description: 'Securely upload required documents for verification.',
  },
  {
    step: 3,
    title: 'Digital Signature',
    description: 'Sign your agreement electronically with ease and security.',
  },
  {
    step: 4,
    title: 'Receive Your Document',
    description: 'Get your legally binding agreement delivered instantly.',
  },
];

const testimonials = [
  {
    name: 'Rohan Sharma',
    title: 'Startup Founder',
    avatar: PlaceHolderImages[1],
    quote:
      'Krisha Enterprise made our rental agreement process incredibly simple. The AI summary was a fantastic bonus, helping us understand the jargon.',
  },
  {
    name: 'Priya Mehta',
    title: 'Landlord',
    avatar: PlaceHolderImages[2],
    quote:
      'The calculator was spot on! I could estimate all costs upfront. The entire service is transparent and user-friendly. Highly recommended.',
  },
  {
    name: 'Anil Kumar',
    title: 'Small Business Owner',
    avatar: PlaceHolderImages[3],
    quote:
      "Creating a partnership deed was daunting, but this platform guided me through every step. A professional and reliable service.",
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <div className="container px-4 md:px-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Legal Agreements, Simplified
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80 md:text-xl">
                Create, customize, and execute legally binding agreements with
                confidence. Fast, secure, and user-friendly.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
                  <Link href="/services">Create Agreement</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/calculator">Estimate Costs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                We offer a wide range of legal document services to meet your
                needs.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title} className="group transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader>
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-primary/10 p-4 text-primary">
                        <service.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="text-center font-headline text-xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-foreground/80">
                      {service.description}
                    </p>
                    <Button asChild variant="link" className="mt-4 w-full">
                      <Link href={service.link}>
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-primary/5 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Get your agreement in 4 simple steps.
              </p>
            </div>
            <div className="relative mt-12">
              <div className="absolute left-1/2 top-10 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block"></div>
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                {howItWorksSteps.map((step, index) => (
                  <div key={step.step} className="flex items-start gap-6">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-foreground/80">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                  Agreement Cost Calculator
                </h2>
                <p className="text-lg text-foreground/80">
                  Get an instant estimate for your agreement costs, including
                  stamp duty and registration fees. No hidden charges.
                </p>
                <Button asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
                  <Link href="/calculator">
                    Go to Full Calculator <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Calculator />
            </div>
          </div>
        </section>

        <section id="ai-summary" className="bg-primary/5 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Card className="overflow-hidden lg:grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <Sparkles className="h-10 w-10 text-accent" />
                <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight">
                  Understand Your Agreements with AI
                </h2>
                <p className="mt-4 text-lg text-foreground/80">
                  Tired of complex legal jargon? Our cutting-edge AI tool
                  summarizes your agreements into simple, easy-to-understand
                  language, ensuring you know exactly what you&apos;re signing.
                </p>
                <div className="mt-6">
                  <Button asChild size="lg" variant="outline">
                    <Link href="/dashboard/summarize">
                      Try AI Summarizer
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden aspect-square lg:block">
                 <Image
                    src={PlaceHolderImages[4].imageUrl}
                    alt={PlaceHolderImages[4].description}
                    data-ai-hint={PlaceHolderImages[4].imageHint}
                    fill
                    className="object-cover"
                  />
              </div>
            </Card>
          </div>
        </section>

        <section id="testimonials" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by Professionals
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Hear what our clients have to say about their experience.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="mx-auto mt-12 w-full max-w-4xl"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="p-1">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                           <blockquote className="text-lg italic text-foreground/90">
                            &ldquo;{testimonial.quote}&rdquo;
                          </blockquote>
                          <div className="mt-6 flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={testimonial.avatar.imageUrl}
                                alt={testimonial.avatar.description}
                                data-ai-hint={testimonial.avatar.imageHint}
                              />
                              <AvatarFallback>
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-foreground/80">
                                {testimonial.title}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
