
'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/lib/actions";

const phoneRegex = new RegExp(
  /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(phoneRegex, { message: "Please enter a valid Indian phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await sendContactEmail(data);
    if (result.success) {
        toast({
            title: "Query Submitted!",
            description: "Thank you for reaching out. We will get back to you shortly.",
        });
        reset();
    } else {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: result.error || "An unknown error occurred. Please try again.",
        });
    }
  };

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
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" {...register("name")} />
                      {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" {...register("email")} />
                      {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Your phone number" {...register("phone")} />
                    {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" {...register("message")} />
                     {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={isSubmitting}>
                     {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Message"}
                  </Button>
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
                      <a href="tel:+919326069149" className="text-foreground/80 hover:text-primary">+91 9326069149</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a href="mailto:amey35195@gmail.com" className="text-foreground/80 hover:text-primary">amey35195@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-foreground/80">Dev Krupa society , shop number 1 , Ground floor , V n marg ,  Ghatkopar East Mumbai , Maharashtra , 400077</p>
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
