'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const firestore = useFirestore();
  const submissionsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'calculator_form_submissions');
  }, [firestore]);

  const { data: submissions, isLoading } = useCollection(submissionsCollection);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.ceil(amount));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Admin Dashboard</h1>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Calculator Submissions</CardTitle>
              <CardDescription>A list of the most recent calculator submissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    </TableRow>
                  ))}
                  {submissions?.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>{new Date(submission.submissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>{submission.formValues.location}</TableCell>
                      <TableCell>{formatCurrency(submission.formValues.rent)}</TableCell>
                      <TableCell>{formatCurrency(submission.calculatedCosts.total)}</TableCell>
                      <TableCell>{submission.formValues.mobile}</TableCell>
                    </TableRow>
                  ))}
                  {!isLoading && submissions?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No submissions yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
