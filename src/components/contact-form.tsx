
'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export function ContactForm() {
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Send us a Message</CardTitle>
        <CardDescription>Our team will respond within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name-landing">Name</Label>
              <Input id="name-landing" placeholder="Your Name" {...register("name")} />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-landing">Email</Label>
              <Input id="email-landing" type="email" placeholder="your@email.com" {...register("email")} />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-landing">Phone</Label>
            <Input id="phone-landing" type="tel" placeholder="Your phone number" {...register("phone")} />
            {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message-landing">Message</Label>
            <Textarea id="message-landing" placeholder="Your message..." className="min-h-[120px]" {...register("message")} />
             {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
          </div>
          <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={isSubmitting}>
             {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
