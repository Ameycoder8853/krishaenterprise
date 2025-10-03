"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSummary } from "@/lib/actions";

const formSchema = z.object({
  agreementText: z.string().min(50, {
    message: "Agreement text must be at least 50 characters.",
  }),
});

export function SummarizerClient() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreementText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSummary(null);

    const result = await getSummary(values.agreementText);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: result.error,
      });
    } else {
      setSummary(result.summary);
    }
    
    setIsLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-headline">Enter Agreement Text</CardTitle>
          <CardDescription>
            Paste the full text of your legal agreement below to get a summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="agreementText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your legal agreement text here..."
                        className="min-h-[300px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-headline">AI-Generated Summary</CardTitle>
          <CardDescription>
            Here is a concise summary of your document.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
            </div>
          )}
          {summary && !isLoading && (
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border bg-muted/50 p-4 text-foreground">
              {summary}
            </div>
          )}
          {!summary && !isLoading && (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-md border-2 border-dashed">
              <Sparkles className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-center text-muted-foreground">
                Your summary will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
