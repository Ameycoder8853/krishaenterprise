'use server'
import { summarizeAgreement } from '@/ai/flows/ai-summarize-agreement'

export async function getSummary(agreementText: string) {
  try {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
        throw new Error('GOOGLE_GENAI_API_KEY environment variable not set.');
    }
    const result = await summarizeAgreement({ agreementText });
    return { summary: result.summary, error: null };
  } catch (error) {
    console.error("Error in getSummary action: ", error);
    return { summary: null, error: 'Failed to generate summary. Please check server logs for details.' };
  }
}
