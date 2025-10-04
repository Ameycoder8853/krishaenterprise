
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Target, Users } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
  },
  {
    name: "Jane Smith",
    role: "Head of Legal",
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
  },
  {
    name: "Anil Kumar",
    role: "Lead Developer",
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-3'),
  },
];

const values = [
    {
        icon: Shield,
        title: "Integrity",
        description: "We uphold the highest standards of integrity in all of our actions.",
    },
    {
        icon: Users,
        title: "Customer Commitment",
        description: "We develop relationships that make a positive difference in our customers' lives.",
    },
    {
        icon: CheckCircle,
        title: "Quality",
        description: "We provide outstanding services that deliver premium value to our customers.",
    }
]

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us');
  const missionImage = PlaceHolderImages.find(img => img.id === 'our-mission');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-20 bg-primary/5 text-center">
          <div className="container">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
              About Krisha Enterprise
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
              Your trusted partner in simplifying legal documentation across India.
            </p>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Our Story</h2>
                        <p className="mt-4 text-foreground/80">
                            Founded in 2020, Krisha Enterprise was born out of a desire to solve a common problem: the complexity and inaccessibility of legal paperwork for the average person. We saw firsthand how confusing and time-consuming it was to create and register even simple agreements.
                        </p>
                        <p className="mt-4 text-foreground/80">
                            We set out to build a platform that leverages technology to make legal documentation straightforward, transparent, and affordable for everyone. From landlords and tenants to small business partners, we empower our clients with the tools and support they need to secure their interests with confidence.
                        </p>
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden">
                       {aboutImage && <Image src={aboutImage.imageUrl} alt="Our Team" fill className="object-cover" data-ai-hint="team office" />}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                     <div className="relative h-80 rounded-lg overflow-hidden md:order-2">
                        {missionImage && <Image src={missionImage.imageUrl} alt="Our Mission" fill className="object-cover" data-ai-hint="abstract goal" />}
                    </div>
                    <div className="md:order-1">
                        <h2 className="font-headline text-3xl font-bold">Our Mission</h2>
                        <p className="mt-4 text-foreground/80">
                           Our mission is to make legal services more accessible, affordable, and understandable. We aim to be India's most trusted and user-friendly platform for creating and managing legal documents, saving our clients time, money, and stress.
                        </p>
                        <div className="mt-6 flex items-start gap-4">
                            <Target className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold">Our Vision</h4>
                                <p className="text-foreground/70">To be the one-stop solution for all legal documentation needs, driven by technology and a commitment to customer satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container text-center">
                <h2 className="font-headline text-3xl font-bold">Our Core Values</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
                    Our values define who we are and guide our actions and decisions.
                </p>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {values.map(value => (
                        <Card key={value.title} className="p-6 text-center">
                             <div className="inline-block rounded-full bg-primary/10 p-3 text-primary mb-4">
                                <value.icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-headline text-xl font-semibold">{value.title}</h3>
                            <p className="mt-2 text-foreground/70">{value.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
