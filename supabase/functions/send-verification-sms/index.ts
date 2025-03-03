
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Twilio } from "npm:twilio@4.18.1";

const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");

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

    // Format the phone number (ensure it has country code)
    let formattedPhone = phoneNumber;
    if (!phoneNumber.startsWith("+")) {
      // Default to Cameroon country code if none provided
      formattedPhone = "+237" + phoneNumber.replace(/^0+/, "");
    }

    // Send the SMS with the verification code
    const message = await twilio.messages.create({
      body: `Votre code de vérification MboaTer est: ${code}. Ce code expire dans 10 minutes.`,
      from: "+15017122661", // Replace with your Twilio phone number
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
