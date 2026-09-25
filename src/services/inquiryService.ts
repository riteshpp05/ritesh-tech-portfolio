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
  whatsappUrl: string;
}

export const WHATSAPP_PHONE_NUMBER = "917028111146";

/**
 * Builds a structured, human-readable WhatsApp message from form fields.
 */
export function formatWhatsAppMessage(payload: InquiryPayload): string {
  const parts = [
    `*New Project Inquiry — Ritesh Patil Freelance*`,
    ``,
    `*Name:* ${payload.name}`,
    `*Email:* ${payload.email}`,
    payload.company ? `*Company:* ${payload.company}` : null,
    payload.serviceType ? `*Service:* ${payload.serviceType}` : null,
    payload.budget ? `*Budget:* ${payload.budget}` : null,
    payload.timeline ? `*Timeline:* ${payload.timeline}` : null,
    ``,
    `*Project Overview:*`,
    payload.description,
  ].filter((item): item is string => item !== null);

  return parts.join("\n");
}

/**
 * Returns a universal WhatsApp redirect link prefilled with the encoded inquiry.
 */
export function getWhatsAppUrl(payload: InquiryPayload): string {
  const text = formatWhatsAppMessage(payload);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Processes the inquiry and returns the redirection URL.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  // Small micro-delay for smooth UI feedback
  await new Promise((resolve) => setTimeout(resolve, 350));

  const whatsappUrl = getWhatsAppUrl(payload);

  return {
    success: true,
    message: "Inquiry generated successfully.",
    whatsappUrl,
  };
}
