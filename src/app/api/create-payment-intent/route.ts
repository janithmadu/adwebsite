import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"; // Use the ES import syntax

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not set.");
}

// Use the required apiVersion
const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-09-30.acacia', // Update to the required API version
});

interface PaymentRequestBody {
    amount: number;
}

export async function POST(request: NextRequest) {
    try {
        const { amount }: PaymentRequestBody = await request.json();
        console.log(amount);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true }
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
        
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: `Error creating payment intent: ${error.message}` }, // Use error.message for better error handling
            { status: 500 }
        );
    }
}
