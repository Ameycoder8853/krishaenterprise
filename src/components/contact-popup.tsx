
"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
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

export function ContactPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
      resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenPopup = localStorage.getItem("hasSeenContactPopup");
            if (!hasSeenPopup) {
                setIsOpen(true);
                localStorage.setItem("hasSeenContactPopup", "true");
            }
        }, 2000); // Popup appears after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const result = await sendContactEmail(data);
        if (result.success) {
            toast({
                title: "Query Submitted!",
                description: "Thank you for reaching out. We will get back to you shortly.",
            });
            reset();
            handleClose();
        } else {
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: result.error || "An unknown error occurred. Please try again.",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md p-0 bg-[#FBB040] text-black border-none font-serif">
                 <DialogTitle className="sr-only">Inquiry Form</DialogTitle>
                <DialogDescription className="sr-only">Submit an inquiry to Book My Agreement. Fill in your name, email, phone, and message.</DialogDescription>
                <div className="relative p-8 text-center">
                    <Button variant="ghost" className="absolute top-2 right-2 h-auto w-auto p-1 text-black hover:bg-black/10" onClick={handleClose}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                    <p className="text-sm tracking-widest">INQUIRY FORM</p>
                    <h2 className="text-2xl font-bold mt-1">BOOKMYAGREEMENT</h2>
                    <p className="mt-2">Be the part of Book My Agreement</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5 text-left">
                        <div className="space-y-1">
                            <Input id="popup-name" placeholder="Enter Your Name" {...register("name")} className="bg-white border-2 border-teal-200 rounded-full focus:ring-teal-400 placeholder:text-gray-500"/>
                            {errors.name && <p className="text-red-700 text-xs px-4">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1">
                           <Input id="popup-email" placeholder="Enter Your Mail" {...register("email")} className="bg-white border-2 border-teal-200 rounded-full focus:ring-teal-400 placeholder:text-gray-500"/>
                            {errors.email && <p className="text-red-700 text-xs px-4">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-1">
                           <Input id="popup-phone" type="tel" placeholder="Enter Your Telephone" {...register("phone")} className="bg-white border-2 border-teal-200 rounded-full focus:ring-teal-400 placeholder:text-gray-500"/>
                            {errors.phone && <p className="text-red-700 text-xs px-4">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <Textarea id="popup-query" placeholder="Enter Your Message" {...register("message")} className="bg-white border-2 border-teal-200 rounded-3xl min-h-[100px] focus:ring-teal-400 placeholder:text-gray-500"/>
                            {errors.message && <p className="text-red-700 text-xs px-4">{errors.message.message}</p>}
                        </div>
                        <div className="text-center pt-2">
                             <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-white text-black rounded-full px-8 py-3 h-auto font-bold text-sm tracking-wider border-2 border-black hover:bg-gray-200"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : "SUBMIT NOW"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
