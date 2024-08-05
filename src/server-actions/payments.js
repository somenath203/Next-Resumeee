'use server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export const getStripeClientSecret = async () => {

    try {
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100000, 
            currency: 'inr',
            description: 'Subscription Payment of Next Resume Builder'
        });

        return {
            success: true,
            data: paymentIntent?.client_secret
        }

    } catch (error) {

        console.log(error);
               
        return {
            success: false,
            message: error?.message
        }

    }

}