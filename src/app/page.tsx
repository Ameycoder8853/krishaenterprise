

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
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
  Headset,
  ClipboardList,
  CalendarClock,
  MessageCircle,
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
import { ContactForm } from '@/components/contact-form';

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
        question: "Documents required for E-Registration?",
        answer: "Aadhaar card with Address of all the parties (Owner/s, Tenant/s, 2 Witnesses) by E-mail or on Whatsapp.\n\nPAN number of all Owners.Property Address which is to be given on Rent, along with area of Flat and Pin Code\n\nPeriod of Agreement and Starting Date.\n\nLock-in period if any Deposit and Deposit cheque details.\n\nRent Details: Power of Attorney for Individuals, Authority Letter with Stamp, Sign and Photo in case of Companies such as Pvt. Ltd., Public Ltd., Proprietorship, LLP, HUF, etc."
    },
    {
        question: "Do I need to go to registration office?",
        answer: "None of the parties has to visit the registration office. The whole process will be done sitting at your place and that too at your convenient time."
    },
    {
        question: "Can I add my own clauses apart from Standard Government Clause?",
        answer: "Yes, of course. You can add as many clauses you want to add."
    },
    {
        question: "Can a company enter into LL E-registration agreement & is that legal and valid?",
        answer: "We provide doorstep services to both parties separately, if need."
    },
    {
        question: "What if the landlord and tenant are in different cities?",
        answer: "We provide doorstep services to both parties separately, if need."
    },
    {
        question: "I don’t have an Aadhaar card number. What should I do?",
        answer: "If you don’t have Aadhaar card, you will have to go for offline registration. We also provide offline registration"
    }
];


const takeActionItems = [
  {
    icon: ClipboardList,
    text: 'Begin the registration process now',
    link: 'https://wa.me/919326069149',
    linkText: 'Click Here!'
  },
  {
    icon: Headset,
    text: 'Call our customer service +91-9326069149 for assistance',
    link: 'https://wa.me/919326069149',
    linkText: 'Click Here!'
  },
  {
    icon: CalendarClock,
    text: 'Register for a callback at your preferred time',
    link: 'https://wa.me/919326069149',
    linkText: 'Click Here!'
  },
  {
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-10.8-94.2-30.6l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    ),
    text: 'You can easily send all documents on WhatsApp',
    link: 'https://wa.me/919326069149',
    linkText: 'Click Here!'
  },
];


export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');
  const oneSideBiometricsImage = PlaceHolderImages.find(img => img.id === 'ai-feature-image');

  const animatedSections = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedSections.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      animatedSections.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-auto py-16 md:py-20 lg:py-28 pt-24 md:pt-28 lg:pt-36">
          {heroImage && <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover object-center"
            priority
          />}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="grid md:grid-cols-1 gap-12 items-center text-center">
              <div className="text-white">
                 <div className="grid sm:grid-cols-3 gap-6 items-center mb-8 max-w-2xl mx-auto">
                    {ctaFeatures.map((feature, index) => (
                        <div key={feature.title} className="flex flex-col items-center text-center gap-2 relative">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <feature.icon className="h-8 w-8 text-white" />
                            </div>
                            <p className="font-semibold uppercase tracking-wider text-sm">{feature.title}</p>
                        </div>
                    ))}
                </div>
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-center">Your Trusted Partner for Legal Agreements</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-white/90">
                    Fast, affordable, and legally-binding digital agreements with doorstep service. NO GOVERNMENT OFFICE VISITS!
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90 w-full sm:w-auto">
                        <Link href="/services">Create Agreement</Link>
                    </Button>
                      <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full sm:w-auto">
                        <a href="tel:+919326069149">
                            <Phone className="mr-2 h-5 w-5"/>
                            +91 9326069149
                        </a>
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 md:py-24 bg-secondary/50 opacity-0" ref={(el) => animatedSections.current.push(el)}>
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
        
        <section id="why-choose-us" className="py-12 md:py-24 opacity-0" ref={(el) => animatedSections.current.push(el)}>
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
        
        <section id="one-side-biometrics" className="py-12 md:py-24 bg-secondary/50 opacity-0" ref={(el) => animatedSections.current.push(el)}>
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-1 gap-12 items-center">
                    <div className="text-center">
                        <p className="text-primary font-bold">WE ARE READY TO HELP YOU</p>
                        <h2 className="font-headline text-4xl font-bold tracking-tight mt-2">One-Side Biometrics?</h2>
                        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                            Are you looking for only One-Side Biometrics? (India & International locations). We simplify this process with our 100+ national and 20+ International locations ready for you!
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                                <Link href="/contact"><Phone className="mr-2 h-5 w-5"/>REQUEST CALL BACK</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                                <a href="tel:+919326069149">
                                    <Phone className="mr-2 h-5 w-5"/>
                                    +91 9326069149
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-24 opacity-0" ref={(el) => animatedSections.current.push(el)}>
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
        
        <section id="take-action" className="py-12 md:py-24 opacity-0 bg-secondary/50" ref={(el) => animatedSections.current.push(el)}>
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                TAKE ACTION NOW
              </h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {takeActionItems.map((item, index) => (
                <Card key={index} className="text-center p-6 flex flex-col items-center justify-start h-full">
                  <item.icon className="h-16 w-16 mb-4 text-primary" />
                  <p className="text-foreground/80 flex-grow">{item.text}</p>
                  <Button asChild variant="link" className="mt-4 font-bold text-primary">
                    <Link href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'}>{item.linkText}</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="calculator" className="py-12 md:py-24 opacity-0" ref={(el) => animatedSections.current.push(el)}>
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Estimate Your Costs
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Use our calculator to get a transparent breakdown of all costs associated with your agreement.
              </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <Calculator />
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 md:py-24 opacity-0" ref={(el) => animatedSections.current.push(el)}>
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
        
        <section id="faq" className="py-12 md:py-24 bg-secondary/50 opacity-0" ref={(el) => animatedSections.current.push(el)}>
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
                    <AccordionContent className="text-base text-foreground/80 whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 opacity-0" ref={(el) => animatedSections.current.push(el)}>
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Have questions? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you shortly.
              </p>
            </div>
            <div className="mt-12 max-w-xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}



    




    



