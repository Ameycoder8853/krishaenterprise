'use server'
import { summarizeAgreement } from '@/ai/flows/ai-summarize-agreement'
import { Resend } from 'resend';

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
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set. Email not sent.");
    return { success: false, error: "Email service is not configured." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `New Contact Form Submission from ${formData.name}`;
  const body = `
    <p>You have a new contact form submission:</p>
    <ul>
      <li><strong>Name:</strong> ${formData.name}</li>
      <li><strong>Email:</strong> ${formData.email}</li>
      <li><strong>Phone:</strong> ${formData.phone}</li>
      <li><strong>Message:</strong></li>
    </ul>
    <p>${formData.message}</p>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Krisha Enterprise <onboarding@resend.dev>',
      to: ['krishnaenterprise.in@gmail.com'],
      subject: subject,
      html: body,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: "Failed to send email. Please try again later." };
    }

    console.log('Email sent successfully:', data);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error: "An unexpected error occurred while sending the email." };
  }
}
