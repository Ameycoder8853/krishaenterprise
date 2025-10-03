import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Landmark, Users, Wallet, ArrowRight } from "lucide-react";

const services = [
  {
    id: 'rental',
    icon: FileText,
    title: 'Rental Agreement',
    description: 'A comprehensive rental agreement to protect both landlords and tenants. Covers all essential clauses, rent terms, and responsibilities. Our guided process ensures all legal requirements are met for a valid and enforceable contract.',
    price: 'Starting from ₹1,499'
  },
  {
    id: 'leave-license',
    icon: Landmark,
    title: 'Leave & License Agreement',
    description: 'Formalize the terms of property usage with a Leave and License agreement. Ideal for short-term occupancy, this agreement is made easy with our customizable templates. We handle the registration process for you.',
    price: 'Starting from ₹1,799'
  },
  {
    id: 'partnership',
    icon: Users,
    title: 'Partnership Deed',
    description: 'Establish a clear framework for your business partnership. Our partnership deeds define profit/loss sharing, roles, responsibilities, and exit strategies, preventing future disputes and ensuring smooth operations.',
    price: 'Starting from ₹4,999'
  },
  {
    id: 'affidavits',
    icon: Wallet,
    title: 'Affidavits',
    description: 'Create various types of legally binding affidavits for official purposes. Whether for a name change, proof of address, or other declarations, our platform simplifies the creation and notarization process for you.',
    price: 'Starting from ₹799'
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-5xl">
              Our Legal Services
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
              We provide a comprehensive range of legal documentation services, designed to be fast, affordable, and hassle-free.
            </p>
          </div>
          <div className="mt-12 grid gap-8">
            {services.map(service => (
                <Card key={service.id} id={service.id} className="transform transition-all duration-300 hover:shadow-xl md:grid md:grid-cols-3 md:items-center">
                    <div className="p-6 text-center md:border-r md:p-8">
                        <div className="inline-block rounded-full bg-primary/10 p-5 text-primary">
                            <service.icon className="h-12 w-12" />
                        </div>
                        <h2 className="mt-4 font-headline text-2xl font-semibold">{service.title}</h2>
                        <p className="mt-2 text-lg font-semibold text-primary">{service.price}</p>
                    </div>
                    <div className="p-6 md:col-span-2 md:p-8">
                        <p className="text-foreground/80">{service.description}</p>
                        <Button className="mt-6" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                            Create {service.title} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
