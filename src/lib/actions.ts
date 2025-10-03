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

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  // In a real application, you would use a transactional email service
  // like SendGrid, Mailgun, or AWS SES to send the email.
  // For this demo, we'll just log the data to the console to simulate
  // sending an email, as we can't send real emails from here.
  
  console.log("--- New Contact Form Submission ---");
  console.log(`To: amey35195@gmail.com`);
  console.log(`Name: ${formData.name}`);
  console.log(`Email: ${formData.email}`);
  console.log(`Phone: ${formData.phone}`);
  console.log(`Message: ${formData.message}`);
  console.log("------------------------------------");
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Since we can't actually send an email, we'll always return success.
  // In a real app, you would handle potential errors from the email service.
  return { success: true, error: null };
}
