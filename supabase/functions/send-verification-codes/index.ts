
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import twilio from "npm:twilio@4.19.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const twilioClient = twilio(
  Deno.env.get("TWILIO_ACCOUNT_SID"),
  Deno.env.get("TWILIO_AUTH_TOKEN")
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { user_id, email, phone_number } = await req.json();

    // Générer des codes aléatoires de 6 chiffres
    const emailCode = Math.floor(100000 + Math.random() * 900000).toString();
    const smsCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Créer un client Supabase dans la fonction Edge
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Enregistrer les codes dans la base de données
    const { error: dbError } = await supabaseClient
      .from("verification_codes")
      .insert({
        user_id,
        email_code: emailCode,
        sms_code: smsCode,
      });

    if (dbError) throw dbError;

    // Envoyer l'email avec Resend
    const emailResult = await resend.emails.send({
      from: "MboaTer <verification@mboater.com>",
      to: email,
      subject: "Code de vérification MboaTer",
      html: `
        <h1>Bienvenue sur MboaTer !</h1>
        <p>Voici votre code de vérification par email : <strong>${emailCode}</strong></p>
        <p>Ce code expirera dans 15 minutes.</p>
      `,
    });

    // Envoyer le SMS avec Twilio
    const smsResult = await twilioClient.messages.create({
      body: `Votre code de vérification MboaTer : ${smsCode}`,
      to: phone_number,
      from: Deno.env.get("TWILIO_PHONE_NUMBER"),
    });

    return new Response(
      JSON.stringify({ 
        message: "Codes envoyés avec succès",
        email: emailResult,
        sms: smsResult
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
