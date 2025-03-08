
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
  // Log de début pour confirmer que la fonction est appelée
  console.log("⭐️ Fonction send-contact-email démarrée");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Requête OPTIONS CORS reçue");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Vérification de la clé API Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Vérification de la clé API Resend:", resendApiKey ? "Présente" : "Absente");
    
    if (!resendApiKey) {
      console.error("ERREUR CRITIQUE: RESEND_API_KEY n'est pas configurée");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Configuration du service d'email manquante" 
        }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    const resend = new Resend(resendApiKey);
    console.log("Client Resend initialisé");
    
    // Log des headers pour le débogage
    console.log("Headers de la requête:", Object.fromEntries([...req.headers.entries()]));
    
    // Parse du corps de la requête
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Corps de la requête parsé avec succès:", requestBody);
    } catch (error) {
      console.error("Échec du parsing du corps de la requête:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Corps de requête invalide" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // Extraction et validation des données
    const { name, email, subject, message } = requestBody as ContactEmailRequest;
    console.log("Données extraites:", { name, email, subject, messageLength: message?.length });
    
    if (!name || !email || !subject || !message) {
      console.error("Champs requis manquants:", { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Champs requis manquants" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const RECIPIENT_EMAIL = "contactmboater@yahoo.com";
    console.log(`Envoi d'email de contact à ${RECIPIENT_EMAIL}`);

    // Email au destinataire (contactmboater@yahoo.com)
    try {
      console.log("Tentative d'envoi d'email au destinataire");
      const emailToRecipient = await resend.emails.send({
        from: "MBoaTer <onboarding@resend.dev>",
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

      console.log("Email au destinataire envoyé avec succès:", emailToRecipient);
      
      // Email de confirmation à l'expéditeur
      console.log("Tentative d'envoi d'email de confirmation à", email);
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

      console.log("Email de confirmation envoyé avec succès:", confirmationEmail);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Emails envoyés avec succès",
          data: {
            recipientEmail: emailToRecipient, 
            confirmationEmail
          }
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    } catch (emailError: any) {
      console.error("Erreur d'envoi d'email avec Resend:", emailError);
      console.error("Détails de l'erreur:", JSON.stringify(emailError));
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: emailError.message || "Échec de l'envoi d'email",
          details: emailError
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
  } catch (error: any) {
    console.error("Erreur générale dans la fonction send-contact-email:", error);
    console.error("Détails de l'erreur:", JSON.stringify(error));
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Une erreur inconnue s'est produite",
        details: error
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
