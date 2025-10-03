"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export function ContactPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem("hasSeenContactPopup");
            if (!hasSeenPopup) {
                setIsOpen(true);
                sessionStorage.setItem("hasSeenContactPopup", "true");
            }
        }, 2000); // Popup appears after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-xl">Need Help?</DialogTitle>
                    <DialogDescription>
                        Fill out the form below and our legal experts will get back to you shortly.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="popup-name">Name</Label>
                        <Input id="popup-name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="popup-phone">Phone Number</Label>
                        <Input id="popup-phone" type="tel" placeholder="Your Phone Number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="popup-query">Your Query</Label>
                        <Textarea id="popup-query" placeholder="Tell us how we can help" />
                    </div>
                    <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary-foreground))' }}>Submit Query</Button>
                </form>
                 <Button variant="ghost" className="absolute top-4 right-4 h-auto w-auto p-1" onClick={handleClose}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
            </DialogContent>
        </Dialog>
    );
}
