
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Vérifier que l'API key est présente
    const apiKey = req.headers.get('apikey') || new URL(req.url).searchParams.get('apikey');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "No API key found in request", 
          hint: "No 'apikey' request header or url param was found." 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Loguer les en-têtes pour le débogage
    console.log("Request headers:", Object.fromEntries([...req.headers.entries()]));
    console.log("API Key found:", !!apiKey);
    console.log("RESEND_API_KEY available:", !!Deno.env.get("RESEND_API_KEY"));
    
    const { email, code } = await req.json();

    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: "Email and verification code are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Attempting to send verification email to:", email);
    console.log("Verification code:", code);

    // Send the email with the verification code
    const { data, error } = await resend.emails.send({
      from: "MboaTer <verification@mboater.com>",
      to: [email],
      subject: "Vérification de votre compte MboaTer",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #026e39; text-align: center;">MboaTer - Vérification de votre compte</h2>
          <p>Bonjour,</p>
          <p>Merci de vous être inscrit sur MboaTer. Pour finaliser votre inscription, veuillez utiliser le code de vérification ci-dessous :</p>
          <div style="text-align: center; margin: 20px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
            <h3 style="font-size: 24px; letter-spacing: 5px; margin: 0;">${code}</h3>
          </div>
          <p>Ce code est valable pendant 10 minutes.</p>
          <p>Si vous n'avez pas créé de compte sur MboaTer, veuillez ignorer cet e-mail.</p>
          <p>Cordialement,<br>L'équipe MboaTer</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", id: data?.id }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
