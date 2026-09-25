export interface InquiryPayload {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  description: string;
  budget: string;
  timeline: string;
}

export interface InquiryResult {
  success: boolean;
  message: string;
}

/**
 * Submit a project inquiry.
 *
 * Currently logs to console and returns a success state.
 * To connect to a real email service (Resend, EmailJS, Formspree, etc.),
 * replace the implementation below — the UI does not need to change.
 *
 * Example wiring for Formspree:
 *   const res = await fetch('https://formspree.io/f/<YOUR_ID>', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   });
 *   return { success: res.ok, message: res.ok ? 'Sent!' : 'Failed.' };
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Log for development inspection
  console.log('[Inquiry Form] Submitted:', payload);

  return {
    success: true,
    message: 'Your inquiry has been received. I\'ll be in touch within 24 hours.',
  };
}
