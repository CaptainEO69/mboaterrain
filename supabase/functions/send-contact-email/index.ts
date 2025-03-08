
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Configuration CORS pour permettre l'accès depuis n'importe quelle origine
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Structure de la requête entrante
interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  fileUrls?: string[];
  hasAttachments?: boolean;
}

// Fonction pour créer la section des pièces jointes dans l'email
function createAttachmentSection(hasAttachments: boolean, fileUrls: string[] = []): string {
  if (!hasAttachments || fileUrls.length === 0) {
    return "";
  }
  
  return `
    <h3>Pièces jointes:</h3>
    <ul>
      ${fileUrls.map((url, index) => `<li><a href="${url}" target="_blank">Pièce jointe ${index + 1}</a></li>`).join('')}
    </ul>
  `;
}

// Fonction pour envoyer l'email au destinataire
async function sendEmailToRecipient(resend: Resend, data: ContactEmailRequest): Promise<any> {
  const { name, email, subject, message, fileUrls = [], hasAttachments = false } = data;
  const attachmentSection = createAttachmentSection(hasAttachments, fileUrls);
  
  console.log(`Envoi d'email de contact à contactmboater@yahoo.com`);
  
  return await resend.emails.send({
    from: "MBoaTer <onboarding@resend.dev>",
    to: ["contactmboater@yahoo.com"],
    subject: `Nouveau message: ${subject}`,
    html: `
      <h1>Nouveau message de ${name}</h1>
      <p><strong>De:</strong> ${name} (${email})</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      ${attachmentSection}
    `,
  });
}

// Fonction pour envoyer l'email de confirmation à l'expéditeur
async function sendConfirmationEmail(resend: Resend, data: ContactEmailRequest): Promise<any> {
  const { name, email, subject, hasAttachments = false } = data;
  
  console.log("Envoi de l'email de confirmation à", email);
  
  return await resend.emails.send({
    from: "MBoaTer <onboarding@resend.dev>",
    to: [email],
    subject: "Votre message a été reçu",
    html: `
      <h1>Merci de nous avoir contacté, ${name}!</h1>
      <p>Nous avons bien reçu votre message concernant "${subject}" et nous vous répondrons dans les plus brefs délais.</p>
      ${hasAttachments ? '<p>Nous avons bien reçu vos pièces jointes.</p>' : ''}
      <p>Cordialement,<br>L'équipe MBoaTer</p>
    `,
  });
}

// Fonction principale de traitement des requêtes
const handler = async (req: Request): Promise<Response> => {
  // Log de début pour confirmer que la fonction est appelée
  console.log("⭐️ Fonction send-contact-email démarrée");
  
  // Gérer les requêtes CORS preflight
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
    
    // Initialisation du client Resend
    const resend = new Resend(resendApiKey);
    console.log("Client Resend initialisé");
    
    // Log des headers pour le débogage
    console.log("Headers de la requête:", Object.fromEntries([...req.headers.entries()]));
    
    // Parse du corps de la requête
    let requestBody: ContactEmailRequest;
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
    
    // Validation des données
    const { name, email, subject, message } = requestBody;
    console.log("Données extraites:", { 
      name, 
      email, 
      subject, 
      messageLength: message?.length,
      hasAttachments: requestBody.hasAttachments,
      fileUrlsCount: requestBody.fileUrls?.length 
    });
    
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

    try {
      // Envoi de l'email au destinataire
      const emailToRecipient = await sendEmailToRecipient(resend, requestBody);
      console.log("Email au destinataire envoyé avec succès:", emailToRecipient);
      
      // Envoi de l'email de confirmation à l'expéditeur
      const confirmationEmail = await sendConfirmationEmail(resend, requestBody);
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
