import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Calculator from "@/components/calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
    {
        title: "Transparent Pricing",
        description: "No hidden fees. See a full cost breakdown before you commit."
    },
    {
        title: "Instant Estimates",
        description: "Get a real-time calculation of all charges, including stamp duty."
    },
    {
        title: "India-Specific Calculations",
        description: "Covers stamp duty and registration fees for major Indian cities."
    },
    {
        title: "Registered & Notarized Options",
        description: "Calculates costs for both legally registered and simpler notarized agreements."
    }
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Agreement Cost Calculator
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
              Plan your finances with ease. Get a detailed, transparent breakdown of all costs associated with your legal agreement in India.
            </p>
          </div>
          
          <div className="mt-12 grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Calculator />
            </div>
            <div className="lg:col-span-2">
              <Card className="h-full bg-background">
                <CardHeader>
                  <CardTitle className="font-headline">Why Use Our Calculator?</CardTitle>
                  <CardDescription>We believe in full transparency for your peace of mind.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {features.map(feature => (
                            <li key={feature.title} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">{feature.title}</p>
                                    <p className="text-sm text-foreground/70">{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
