
'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Registration Successful",
        description: "You can now log in.",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/20 p-4">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" {...register("firstName")} />
                  {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" {...register("lastName")} />
                   {errors.lastName && <p className="text-destructive text-xs">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                 {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register("password")} />
                 {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Create an account"}
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Sign up with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
