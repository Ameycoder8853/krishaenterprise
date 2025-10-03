'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing legal agreements using AI.
 *
 * - summarizeAgreement - An asynchronous function that takes the agreement text as input and returns a summary.
 * - SummarizeAgreementInput - The input type for the summarizeAgreement function, which is the agreement text.
 * - SummarizeAgreementOutput - The output type for the summarizeAgreement function, which is the summarized text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAgreementInputSchema = z.object({
  agreementText: z
    .string()
    .describe('The text of the agreement to be summarized.'),
});

export type SummarizeAgreementInput = z.infer<typeof SummarizeAgreementInputSchema>;

const SummarizeAgreementOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the agreement.'),
});

export type SummarizeAgreementOutput = z.infer<typeof SummarizeAgreementOutputSchema>;

/**
 * Asynchronously summarizes an agreement using AI.
 * @param input - The input containing the agreement text.
 * @returns A promise that resolves to the summarized agreement.
 */
export async function summarizeAgreement(input: SummarizeAgreementInput): Promise<SummarizeAgreementOutput> {
  return summarizeAgreementFlow(input);
}

const summarizeAgreementPrompt = ai.definePrompt({
  name: 'summarizeAgreementPrompt',
  input: {schema: SummarizeAgreementInputSchema},
  output: {schema: SummarizeAgreementOutputSchema},
  prompt: `Summarize the following legal agreement:

{{{agreementText}}}

Provide a concise summary highlighting the key points.`, // Corrected template syntax
});

const summarizeAgreementFlow = ai.defineFlow(
  {
    name: 'summarizeAgreementFlow',
    inputSchema: SummarizeAgreementInputSchema,
    outputSchema: SummarizeAgreementOutputSchema,
  },
  async input => {
    const {output} = await summarizeAgreementPrompt(input);
    return output!;
  }
);
