
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Landmark,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  Fingerprint,
  MapPin,
  Building2,
  Phone,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Calculator from '@/components/calculator';

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
        title: "Select Service & Fill Details",
        description: "Choose the agreement you need and fill in our simple, guided form with all the necessary details.",
    },
    {
        step: 2,
        title: "Review & Pay Online",
        description: "Review the draft of your agreement. Once satisfied, make a secure online payment to proceed.",
    },
    {
        step: 3,
        title: "Stamp Paper & E-Sign",
        description: "We print the draft on a government-approved stamp paper and send it for electronic or physical signatures.",
    },
    {
        step: 4,
        title: "Agreement Delivered",
        description: "Your fully executed, legally binding agreement is delivered to your doorstep or email.",
    },
];

const testimonials = [
  {
    name: 'Rohan Sharma',
    title: 'Startup Founder',
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
    quote:
      'Krisha Enterprise made our rental agreement process incredibly simple. Their team was responsive and the turnaround was super fast!',
  },
  {
    name: 'Priya Mehta',
    title: 'Landlord',
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
    quote:
      'The pricing calculator was spot on! I could estimate all costs upfront. The entire service is transparent and user-friendly. Highly recommended.',
  },
  {
    name: 'Anil Kumar',
    title: 'Small Business Owner',
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-3'),
    quote:
      "Creating a partnership deed was daunting, but Krisha Enterprise guided me through every step. A professional and reliable service.",
  },
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Government Approved",
        description: "All our agreements are legally sound and compliant with the latest government regulations."
    },
    {
        icon: Users,
        title: "Expert Assistance",
        description: "Our legal experts are available to guide you at every step of the process."
    },
    {
        icon: Star,
        title: "Customer Satisfaction",
        description: "We are committed to providing the best service, with thousands of happy clients."
    }
];

const ctaFeatures = [
    {
        icon: Fingerprint,
        title: "Biometric Verification"
    },
    {
        icon: MapPin,
        title: "Service at your Doorstep"
    },
    {
        icon: Building2,
        title: "No Govt Office Visits"
    }
]

const faqs = [
  {
    question: "What is a rental agreement?",
    answer: "A rental agreement is a legal document that binds the owner of a property and a tenant who wants to take temporary possession of the property. It outlines the terms and conditions of the tenancy."
  },
  {
    question: "Is it mandatory to register a rental agreement?",
    answer: "In India, it is mandatory to register a rental agreement if the tenancy period is for 12 months or more. For shorter periods, it's highly recommended for legal security."
  },
  {
    question: "What documents are required for a rental agreement?",
    answer: "Typically, you'll need identity proof (like Aadhaar or Passport) and address proof for both the landlord and the tenant, as well as two passport-sized photographs of each."
  },
  {
    question: "How is stamp duty calculated?",
    answer: "Stamp duty is calculated based on the total rent amount for the tenancy period, the security deposit, and the location (state) of the property. Our calculator provides a detailed estimate."
  }
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');
  const ctaImage = PlaceHolderImages.find(img => img.id === 'cta-background');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-auto py-20 md:py-24 lg:py-32">
          {heroImage && <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  ONLINE RENT AGREEMENT
                </h1>
                <p className="mt-4 max-w-[600px] text-lg text-white/90 md:text-xl">
                  India's Most Trusted Platform for Legal Agreements. Create, customize, and execute legally binding agreements with confidence. Fast, secure, and user-friendly.
                </p>
              </div>
               <div className="bg-background/90 backdrop-blur-sm rounded-lg">
                <Calculator />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                We offer a wide range of legal document services to meet your needs, from rental agreements to business contracts.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title} className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
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
                    <p className="text-center text-sm text-foreground/80 min-h-[40px]">
                      {service.description}
                    </p>
                    <Button asChild variant="link" className="mt-4 w-full font-bold text-primary">
                      <Link href={service.link}>
                        Create Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/services">View All Services</Link>
                </Button>
            </div>
          </div>
        </section>
        
        <section id="why-choose-us" className="py-12 md:py-24">
            <div className="container px-4 md:px-6">
                 <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        Why Choose Us?
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                        We are dedicated to making legal documentation simple, transparent, and accessible for everyone.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {whyChooseUs.map((feature) => (
                        <div key={feature.title} className="text-center">
                             <div className="inline-block rounded-full bg-primary/10 p-4 text-primary mb-4">
                                <feature.icon className="h-10 w-10" />
                            </div>
                            <h3 className="font-headline text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-foreground/80">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="how-it-works" className="bg-secondary/50 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Get your agreement ready in 4 simple and straightforward steps.
              </p>
            </div>
            <div className="relative mt-16">
              <div className="absolute left-0 right-0 top-5 mx-auto h-0.5 w-4/5 bg-border hidden md:block"></div>
              <div className="grid gap-12 md:grid-cols-4 text-center">
                {howItWorksSteps.map((step, index) => (
                  <div key={step.step} className="relative flex flex-col items-center gap-4">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground border-4 border-background">
                      <span className="font-bold text-lg">{step.step}</span>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-headline text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/80">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="relative py-20 md:py-32">
            {ctaImage && <Image
                src={ctaImage.imageUrl}
                alt={ctaImage.description}
                data-ai-hint={ctaImage.imageHint}
                fill
                className="object-cover"
            />}
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 container px-4 md:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
                        {ctaFeatures.map((feature, index) => (
                            <div key={feature.title} className="flex flex-col items-center gap-4 relative">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                    <feature.icon className="h-10 w-10" />
                                </div>
                                <p className="font-semibold uppercase tracking-wider">{feature.title}</p>
                                {index < ctaFeatures.length -1 && (
                                    <div className="absolute top-10 left-1/2 w-full h-0.5 bg-white/50 hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">NO GOVERNMENT OFFICE VISITS!</h2>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                         <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                            <Link href="/services">Create Agreement</Link>
                        </Button>
                         <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                            <a href="tel:+919833799289">
                                <Phone className="mr-2 h-5 w-5"/>
                                +91 9833 799 289
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>


        <section id="testimonials" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by Thousands
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Hear what our clients have to say about their experience with Krisha Enterprise.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="mx-auto mt-12 w-full max-w-5xl"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="h-full transform transition-all duration-300 hover:shadow-lg">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                           <blockquote className="text-base text-foreground/90 mb-4">
                            &ldquo;{testimonial.quote}&rdquo;
                          </blockquote>
                          {testimonial.avatar && <div className="mt-auto flex items-center gap-4">
                            <Avatar className="h-12 w-12">
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
                          </div>}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-50px]"/>
              <CarouselNext className="right-[-50px]"/>
            </Carousel>
          </div>
        </section>
        
        <section id="faq" className="py-12 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-foreground/80">
                    Find answers to common questions about our services.
                </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

    