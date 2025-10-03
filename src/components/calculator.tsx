
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from './ui/separator';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const phoneRegex = new RegExp(
  /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
);

const commonSchema = z.object({
  months: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: "Months is required"}).min(1, 'Months is required').max(60, 'Maximum 60 months')
  ),
  refundableDeposit: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: "Deposit is required"}).min(0, 'Deposit is required')
  ),
  nonRefundableDeposit: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(0).optional()
  ),
  mobile: z.string().regex(phoneRegex, { message: "Please enter a valid Indian phone number." }),
  location: z.string().min(1, 'Location is required'),
});

const calculatorSchema = z.discriminatedUnion("rentType", [
  z.object({
    rentType: z.literal("fixed"),
    rent: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ required_error: "Rent is required for fixed rent type" }).min(1, "Rent must be greater than 0")
    ),
  }).merge(commonSchema),
  z.object({
    rentType: z.literal("incremental"),
    term1FromMonth: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ required_error: "From month is required" })
    ),
    term1ToMonth: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ required_error: "To month is required" })
    ),
    term1MonthlyRent: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ required_error: "Monthly rent is required" }).min(1, "Rent must be greater than 0")
    ),
  }).merge(commonSchema),
]);


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

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      months: undefined,
      refundableDeposit: undefined,
      nonRefundableDeposit: 0,
      rentType: 'fixed',
      mobile: '',
      location: '',
    },
  });

  const rentType = watch('rentType');
  const months = watch('months');

  const onSubmit = (data: CalculatorValues) => {
    // --- 1. Perform Calculation and Update UI Immediately ---
    let totalRent = 0;
    if (data.rentType === 'fixed') {
        totalRent = data.rent * data.months;
    } else { // incremental
        const term1Duration = data.term1ToMonth - data.term1FromMonth + 1;
        totalRent = term1Duration * data.term1MonthlyRent;
        
        const remainingMonths = data.months - term1Duration;
        if (remainingMonths > 0) {
             // Assuming rent for remaining months increases by 10% from term 1
             const subsequentRent = data.term1MonthlyRent * 1.1;
             totalRent += remainingMonths * subsequentRent;
        }
    }

    const nonRefundableDeposit = data.nonRefundableDeposit ?? 0;
    const stampDutyBase = totalRent + (data.refundableDeposit * 0.1) + nonRefundableDeposit;
    let stampDuty = stampDutyBase * 0.0025; // 0.25% of the base
    stampDuty = Math.max(stampDuty, 100);

    const registrationFee = 1000;
    
    const total = stampDuty + registrationFee + 700; // 700 for consultancy & processing

    const finalCosts = { stampDuty, registrationFee, total };
    setCosts(finalCosts);
    setShowResult(true);

    // --- 2. Save data to Firestore ---
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Database not ready",
        description: "Calculation displayed, but could not save to our records. Please try again later.",
      });
      return;
    }
    
    const submissionsCollection = collection(firestore, 'calculator_form_submissions');
    const submissionData = {
      formValues: data,
      submissionDate: new Date().toISOString(),
      calculatedCosts: finalCosts,
    };
    
    addDoc(submissionsCollection, submissionData)
        .then(() => {
            toast({
              title: "Calculation Saved",
              description: "Your submission has been successfully recorded.",
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            const permissionError = new FirestorePermissionError({
                path: submissionsCollection.path,
                operation: 'create',
                requestResourceData: submissionData,
            });
            errorEmitter.emit('permission-error', permissionError);
            // The result is already shown, so we just inform the user about the save failure.
            toast({
              variant: "destructive",
              title: "Submission Failed",
              description: "Could not save your calculation. Check permissions.",
            });
        });
  };

  const onInvalid = (errors: FieldErrors<CalculatorValues>) => {
    console.error("Form validation failed:", errors);
    toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please check the form for errors and try again.",
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
      term1FromMonth: undefined,
      term1ToMonth: undefined,
      term1MonthlyRent: undefined,
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
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
              <Label htmlFor="rent">MONTHLY RENT (for fixed rent)*</Label>
              <Controller
                name="rent"
                control={control}
                // @ts-ignore - rent might not exist on data type but is required by the form
                render={({ field }) => (
                  <Input id="rent" type="number" placeholder="Monthly Rent" {...field} value={field.value ?? ''} disabled={rentType === 'incremental'}/>
                )}
              />
               {errors.rentType === 'fixed' && errors.rent && <p className="text-destructive text-xs">{errors.rent.message}</p>}
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
             <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label>Rent Type</Label>
                <Controller
                    name="rentType"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center space-x-4">
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
          </div>
          
           {rentType === 'incremental' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="term1FromMonth">Term 1 (from month)</Label>
                    <Controller
                        name="term1FromMonth"
                        control={control}
                        // @ts-ignore
                        render={({ field }) => (
                            <Input id="term1FromMonth" type="number" {...field} value={field.value ?? 1} readOnly/>
                        )}
                    />
                     {errors.rentType === 'incremental' && errors.term1FromMonth && <p className="text-destructive text-xs">{errors.term1FromMonth.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term1ToMonth">Term 1 (to month)</Label>
                    <Controller
                        name="term1ToMonth"
                        control={control}
                        // @ts-ignore
                        render={({ field }) => (
                            <Input id="term1ToMonth" type="number" placeholder="e.g. 12" {...field} value={field.value ?? months ?? ''} />
                        )}
                    />
                    {errors.rentType === 'incremental' && errors.term1ToMonth && <p className="text-destructive text-xs">{errors.term1ToMonth.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term1MonthlyRent">Term 1 Monthly Rent*</Label>
                    <Controller
                        name="term1MonthlyRent"
                        control={control}
                        // @ts-ignore
                        render={({ field }) => (
                            <Input id="term1MonthlyRent" type="number" placeholder="e.g. 10000" {...field} value={field.value ?? ''} />
                        )}
                    />
                    {errors.rentType === 'incremental' && errors.term1MonthlyRent && <p className="text-destructive text-xs">{errors.term1MonthlyRent.message}</p>}
                  </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
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

    