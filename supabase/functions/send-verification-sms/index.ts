
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Twilio } from "npm:twilio@4.18.1";

const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

const twilio = new Twilio(accountSid, authToken);

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
    // Loguer les en-têtes pour le débogage
    console.log("Request headers:", Object.fromEntries([...req.headers.entries()]));
    
    const { phoneNumber, code } = await req.json();

    if (!phoneNumber || !code) {
      return new Response(
        JSON.stringify({ error: "Phone number and verification code are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Attempting to send verification SMS to:", phoneNumber);
    console.log("Verification code:", code);
    console.log("Twilio phone number:", twilioPhoneNumber);
    console.log("Twilio SID available:", !!accountSid);
    console.log("Twilio Auth Token available:", !!authToken);

    // Format the phone number (ensure it has country code)
    let formattedPhone = phoneNumber;
    if (!phoneNumber.startsWith("+")) {
      // Default to Cameroon country code if none provided
      formattedPhone = "+237" + phoneNumber.replace(/^0+/, "");
    }

    console.log("Formatted phone number:", formattedPhone);

    if (!twilioPhoneNumber) {
      console.error("Missing TWILIO_PHONE_NUMBER environment variable");
      return new Response(
        JSON.stringify({ error: "Server configuration error. Missing Twilio phone number." }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Send the SMS with the verification code
    const message = await twilio.messages.create({
      body: `Votre code de vérification MboaTer est: ${code}. Ce code expire dans 10 minutes.`,
      from: twilioPhoneNumber, // Use the environment variable
      to: formattedPhone,
    });

    console.log("SMS sent successfully:", message.sid);

    return new Response(
      JSON.stringify({ success: true, message: "SMS sent successfully" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error sending SMS:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send SMS" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
