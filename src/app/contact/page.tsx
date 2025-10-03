import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Have questions? We&apos;d love to hear from you. Reach out to us and we&apos;ll get back to you shortly.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Send us a Message</CardTitle>
                <CardDescription>Fill out the form and our team will respond within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Subject of your message" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Send Message</Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <a href="tel:+917045406998" className="text-foreground/80 hover:text-primary">+91 70454 06998</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a href="mailto:support@krishaenterprise.com" className="text-foreground/80 hover:text-primary">support@krishaenterprise.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-foreground/80">123 Business Avenue, Mumbai, Maharashtra, 400001</p>
                    </div>
                  </div>
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
