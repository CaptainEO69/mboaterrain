
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const RECIPIENT_EMAIL = "contactmboater@yahoo.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log(`Sending contact email from ${name} <${email}> with subject: ${subject}`);

    // Email to the recipient (contactmboater@yahoo.com)
    const emailToRecipient = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `Nouveau message: ${subject}`,
      html: `
        <h1>Nouveau message de ${name}</h1>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: "MBoaTer <onboarding@resend.dev>",
      to: [email],
      subject: "Votre message a été reçu",
      html: `
        <h1>Merci de nous avoir contacté, ${name}!</h1>
        <p>Nous avons bien reçu votre message concernant "${subject}" et nous vous répondrons dans les plus brefs délais.</p>
        <p>Cordialement,<br>L'équipe MBoaTer</p>
      `,
    });

    console.log("Emails sent successfully:", { 
      toRecipient: emailToRecipient, 
      confirmation: confirmationEmail 
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        recipientEmail: emailToRecipient, 
        confirmationEmail 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
