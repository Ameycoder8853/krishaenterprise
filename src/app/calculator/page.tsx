import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Calculator from "@/components/calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
    "Transparent Pricing",
    "Instant Estimates",
    "Covers Stamp Duty & Registration",
    "Supports Multiple Cities"
];

export default function CalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-5xl">
              Agreement Cost Calculator
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Plan your finances with ease. Get a detailed, transparent breakdown of all costs associated with your legal agreement.
            </p>
          </div>
          
          <div className="mt-12 grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Calculator />
            </div>
            <div className="lg:col-span-2">
              <Card className="h-full bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline">Why Use Our Calculator?</CardTitle>
                  <CardDescription>We believe in full transparency.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {features.map(feature => (
                            <li key={feature} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">{feature}</p>
                                    <p className="text-sm text-foreground/70">Know all your costs upfront with no surprises.</p>
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
