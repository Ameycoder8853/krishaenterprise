"use client";

import { useState, useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const calculatorSchema = z.object({
  city: z.string().min(1, 'City is required'),
  rent: z.number().min(1, 'Rent must be positive'),
  deposit: z.number().min(0, 'Deposit must be non-negative'),
  duration: z.number().min(1, 'Duration must be at least 1 month'),
  isNotary: z.boolean(),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;

const cities = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'pune', label: 'Pune' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'other', label: 'Other' },
];

export default function Calculator() {
  const [costs, setCosts] = useState({
    stampDuty: 0,
    registrationFee: 0,
    consultancy: 500,
    processing: 200,
    notary: 0,
    total: 700,
  });

  const { control, watch, formState: { errors } } = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      city: 'mumbai',
      rent: 25000,
      deposit: 100000,
      duration: 11,
      isNotary: false,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const { rent, deposit, duration, city, isNotary } = watchedValues;
    
    if (!rent || !duration || rent <= 0) {
        setCosts({ stampDuty: 0, registrationFee: 0, consultancy: 500, processing: 200, notary: 0, total: 700 });
        return;
    }
      
    // Simplified Stamp Duty Calculation (Maharashtra Style)
    // 0.25% of (Total Rent + (10% of Refundable Deposit))
    const totalRent = rent * duration;
    const stampDutyBase = totalRent + (deposit * 0.1);
    let stampDuty = stampDutyBase * 0.0025;

    // Minimum stamp duty
    stampDuty = Math.max(stampDuty, 100);
    
    // Registration Fee (Maharashtra)
    let registrationFee = 1000;
    if (city === 'mumbai' || city === 'pune') {
       registrationFee = 1000;
    } else {
       // Assuming corporation area for other cities
       registrationFee = 1000;
    }
    
    let notaryCost = 0;
    if (isNotary) {
        // If notary is chosen, stamp duty and reg are often different/lower
        stampDuty = 500; // Typical notary agreement stamp value
        registrationFee = 0; // No registration for notarized
        notaryCost = 300; // Notary fee
    }

    const total = stampDuty + registrationFee + costs.consultancy + costs.processing + notaryCost;

    setCosts(prev => ({ ...prev, stampDuty, registrationFee, notary: notaryCost, total }));

  }, [watchedValues, costs.consultancy, costs.processing]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.ceil(amount));
  };

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Rent Agreement Cost Calculator</CardTitle>
        <CardDescription>Get a transparent, detailed cost breakdown for your agreement in India.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="city">
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map(c => (
                                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="duration">Duration (Months)</Label>
                <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                        <Input id="duration" type="number" placeholder="e.g., 11" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                    )}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (₹)</Label>
                <Controller
                    name="rent"
                    control={control}
                    render={({ field }) => (
                        <Input id="rent" type="number" placeholder="e.g., 25000" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                    )}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="deposit">Security Deposit (₹)</Label>
                 <Controller
                    name="deposit"
                    control={control}
                    render={({ field }) => (
                        <Input id="deposit" type="number" placeholder="e.g., 100000" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                    )}
                />
            </div>
            <div className="sm:col-span-2 flex items-center space-x-3 rounded-md border p-4">
                <Controller
                    name="isNotary"
                    control={control}
                    render={({ field }) => (
                        <Switch
                            id="isNotary"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                <Label htmlFor="isNotary" className="flex-1">Notarized Agreement Instead of Registered?</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-pointer"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">Notarized agreements are on stamp paper but not registered with the sub-registrar. They are quicker but may have less legal weight than registered ones.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3 text-base">
            <div className="flex justify-between items-center">
                <span className="text-foreground/80">Stamp Duty</span>
                <span className="font-semibold">{formatCurrency(costs.stampDuty)}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-foreground/80">Registration Fee</span>
                <span className="font-semibold">{formatCurrency(costs.registrationFee)}</span>
            </div>
            {costs.notary > 0 && (
                 <div className="flex justify-between items-center">
                    <span className="text-foreground/80">Notary Fee</span>
                    <span className="font-semibold">{formatCurrency(costs.notary)}</span>
                </div>
            )}
             <div className="flex justify-between items-center">
                <span className="text-foreground/80">Consultancy & Processing</span>
                <span className="font-semibold">{formatCurrency(costs.consultancy + costs.processing)}</span>
            </div>
        </div>
        
      </CardContent>
      <CardFooter className="flex-col items-stretch rounded-b-lg bg-primary/5 p-6">
          <div className="flex justify-between text-xl font-bold">
              <span>Total Estimated Cost:</span>
              <span>{formatCurrency(costs.total)}</span>
          </div>
          <p className="mt-2 text-xs text-foreground/70">*All calculations are estimates based on standard values for Maharashtra. Final costs may vary based on specific clauses and government charges.</p>
          <Button size="lg" className="mt-4 w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary-foreground))' }}>Create Agreement Now</Button>
      </CardFooter>
    </Card>
  );
}
