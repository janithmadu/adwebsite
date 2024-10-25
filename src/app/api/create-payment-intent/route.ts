import { NextRequest, NextResponse } from "next/server";

const stripePromis = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(reqest:NextRequest) {

    try {

        const {amount} = await reqest.json()
        console.log(amount);
        
        const paymentIntent = await stripePromis.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods:{enabled:true}
        })

        return NextResponse.json({clientSecret:paymentIntent.client_secret})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error:`Error creating payment intent: ${error}`},
            {status:500}
        )
        
        
    }
    
}

