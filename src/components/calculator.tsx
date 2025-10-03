"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from './ui/separator';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const phoneRegex = new RegExp(
  /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
);

const calculatorSchema = z.object({
  months: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: "Months required"}).min(1, 'Months required').max(60, 'Maximum 60 months')
  ),
  rent: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: "Rent is required"}).min(1, 'Rent is required')
  ),
  refundableDeposit: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: "Deposit is required"}).min(0, 'Deposit is required')
  ),
  nonRefundableDeposit: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(0).optional()
  ),
  rentType: z.enum(['fixed', 'incremental']),
  mobile: z.string().regex(phoneRegex, { message: "Please enter a valid Indian phone number." }),
  location: z.string().min(1, 'Location is required'),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;

export default function Calculator() {
  const [costs, setCosts] = useState({
    stampDuty: 0,
    registrationFee: 0,
    total: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      months: undefined,
      rent: undefined,
      refundableDeposit: undefined,
      nonRefundableDeposit: 0,
      rentType: 'fixed',
      mobile: '',
      location: '',
    },
  });

  const onSubmit = async (data: CalculatorValues) => {
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Database not ready",
        description: "Please wait a moment and try again.",
      });
      return;
    }

    const totalRent = data.rent * data.months;
    const stampDutyBase = totalRent + (data.refundableDeposit * 0.1);
    let stampDuty = stampDutyBase * 0.0025;
    stampDuty = Math.max(stampDuty, 100);

    const registrationFee = 1000;
    
    const total = stampDuty + registrationFee + 700; // 700 for consultancy & processing

    setCosts({ stampDuty, registrationFee, total });
    setShowResult(true);

    const submissionsCollection = collection(firestore, 'calculator_form_submissions');
    const submissionData = {
      formValues: data,
      submissionDate: new Date().toISOString(),
      calculatedCosts: {
        stampDuty,
        registrationFee,
        total,
      }
    };
    
    addDoc(submissionsCollection, submissionData)
      .then(() => {
        toast({
          title: "Submission successful",
          description: "Your calculation has been saved.",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: submissionsCollection.path,
            operation: 'create',
            requestResourceData: submissionData,
        }));
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: "There was an error saving your calculation.",
        });
      });
  };
  
  const handleReset = () => {
    reset({
      months: undefined,
      rent: undefined,
      refundableDeposit: undefined,
      nonRefundableDeposit: 0,
      rentType: 'fixed',
      mobile: '',
      location: '',
    });
    setShowResult(false);
    setCosts({ stampDuty: 0, registrationFee: 0, total: 0 });
  }
  
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="months">NUMBER OF MONTHS*</Label>
              <Controller
                name="months"
                control={control}
                render={({ field }) => (
                  <Input id="months" type="number" placeholder="Maximum 60" {...field} value={field.value ?? ''}/>
                )}
              />
              {errors.months && <p className="text-destructive text-xs">{errors.months.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent">MONTHLY RENT*</Label>
              <Controller
                name="rent"
                control={control}
                render={({ field }) => (
                  <Input id="rent" type="number" placeholder="Monthly Rent" {...field} value={field.value ?? ''}/>
                )}
              />
               {errors.rent && <p className="text-destructive text-xs">{errors.rent.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="refundableDeposit">REFUNDABLE SECURITY DEPOSIT*</Label>
              <Controller
                name="refundableDeposit"
                control={control}
                render={({ field }) => (
                  <Input id="refundableDeposit" type="number" placeholder="Refundable Security Deposit" {...field} value={field.value ?? ''} />
                )}
              />
               {errors.refundableDeposit && <p className="text-destructive text-xs">{errors.refundableDeposit.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nonRefundableDeposit">NON REFUNDABLE SECURITY DEPOSIT</Label>
              <Controller
                name="nonRefundableDeposit"
                control={control}
                render={({ field }) => (
                  <Input id="nonRefundableDeposit" type="number" placeholder="0" {...field} value={field.value ?? ''} />
                )}
              />
            </div>
             <div className="space-y-2">
                <Controller
                    name="rentType"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fixed" id="fixed" />
                                <Label htmlFor="fixed">Fixed</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="incremental" id="incremental" />
                                <Label htmlFor="incremental">Incremental</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
            </div>
             <div></div>
            <div className="space-y-2">
              <Label htmlFor="mobile">MOBILE NO.*</Label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input id="mobile" placeholder="Contact Details" {...field} />
                )}
              />
              {errors.mobile && <p className="text-destructive text-xs">{errors.mobile.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">LOCATION*</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input id="location" placeholder="Property Location" {...field} />
                )}
              />
              {errors.location && <p className="text-destructive text-xs">{errors.location.message}</p>}
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>CALCULATE</Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleReset}>RESET</Button>
          </div>
        </CardContent>
      </form>
       {showResult && (
            <>
                <Separator className="my-0" />
                <CardFooter className="flex-col items-stretch rounded-b-lg bg-primary/5 p-6">
                    <div className="space-y-3 text-base mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/80">Stamp Duty</span>
                            <span className="font-semibold">{formatCurrency(costs.stampDuty)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/80">Registration Fee</span>
                            <span className="font-semibold">{formatCurrency(costs.registrationFee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/80">Consultancy & Processing</span>
                            <span className="font-semibold">{formatCurrency(700)}</span>
                        </div>
                    </div>
                     <Separator className="my-4" />
                    <div className="flex justify-between text-xl font-bold">
                        <span>Total Estimated Cost:</span>
                        <span>{formatCurrency(costs.total)}</span>
                    </div>
                    <p className="mt-2 text-xs text-foreground/70">*All calculations are estimates based on standard values for Maharashtra. Final costs may vary based on specific clauses and government charges.</p>
                </CardFooter>
            </>
        )}
    </Card>
  );
}
