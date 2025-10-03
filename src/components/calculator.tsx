"use client";

import { useState, useEffect } from 'react';
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

const calculatorSchema = z.object({
  city: z.string().min(1, 'City is required'),
  rent: z.number().min(1, 'Rent must be positive'),
  deposit: z.number().min(0, 'Deposit must be non-negative'),
  duration: z.number().min(1, 'Duration must be at least 1 month'),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;

const cities = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'pune', label: 'Pune' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'delhi', label: 'Delhi' },
];

export default function Calculator() {
  const [costs, setCosts] = useState({
    stampDuty: 0,
    registrationFee: 0,
    serviceCharge: 1200,
    total: 1200,
  });

  const { control, watch, formState: { errors } } = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      city: 'mumbai',
      rent: 15000,
      deposit: 50000,
      duration: 12,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const calculateCosts = () => {
      const { rent, deposit, duration, city } = watchedValues;
      if (!rent || !duration || rent <= 0) {
        setCosts({ stampDuty: 0, registrationFee: 0, serviceCharge: 1200, total: 1200 });
        return;
      }
      
      const totalRent = rent * duration;
      const avgYearlyRent = (totalRent / duration) * 12;
      
      // Simplified calculation logic
      const stampDuty = Math.max(100, (totalRent + deposit * 0.1) * 0.005);
      
      let registrationFee = 1000;
      if (city === 'mumbai' || city === 'pune') {
        registrationFee = avgYearlyRent > 300000 ? 1000 : 500;
      }

      const total = stampDuty + registrationFee + costs.serviceCharge;

      setCosts(prev => ({ ...prev, stampDuty, registrationFee, total }));
    };

    calculateCosts();
  }, [watchedValues, costs.serviceCharge]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Math.ceil(amount));
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Cost Calculator</CardTitle>
        <CardDescription>Estimate your agreement costs instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        <Input id="duration" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                    )}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent</Label>
                <Controller
                    name="rent"
                    control={control}
                    render={({ field }) => (
                        <Input id="rent" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                    )}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="deposit">Security Deposit</Label>
                 <Controller
                    name="deposit"
                    control={control}
                    render={({ field }) => (
                        <Input id="deposit" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                    )}
                />
            </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3 text-lg">
            <div className="flex justify-between">
                <span className="text-foreground/80">Stamp Duty:</span>
                <span className="font-semibold">{formatCurrency(costs.stampDuty)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-foreground/80">Registration Fee:</span>
                <span className="font-semibold">{formatCurrency(costs.registrationFee)}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-foreground/80">Service Charge:</span>
                <span className="font-semibold">{formatCurrency(costs.serviceCharge)}</span>
            </div>
        </div>
        
      </CardContent>
      <CardFooter className="flex-col items-stretch rounded-b-lg bg-primary/10 p-6">
          <div className="flex justify-between text-xl font-bold">
              <span>Total Cost:</span>
              <span>{formatCurrency(costs.total)}</span>
          </div>
          <p className="mt-2 text-sm text-foreground/70">*All calculations are estimates. Final costs may vary.</p>
          <Button size="lg" className="mt-4 w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Create Agreement Now</Button>
      </CardFooter>
    </Card>
  );
}
