import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"; // Use the ES import syntax

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not set.");
}

// Use the required apiVersion
const stripe = new Stripe(stripeSecretKey, {
     apiVersion: '2024-10-28.acacia'
});

interface PaymentRequestBody {
    amount: number;
}

export async function POST(request: NextRequest) {
    try {
        const { amount }: PaymentRequestBody = await request.json();
       
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true }
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
        
    } catch (error:Error | unknown) {
        
        return NextResponse.json(
            { error: `Error creating payment intent: ${error}` }, // Use error.message for better error handling
            { status: 500 }
        );
    }
}
