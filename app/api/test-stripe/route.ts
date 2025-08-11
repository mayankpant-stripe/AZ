import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(request: NextRequest) {
  try {
    // Test if we can connect to Stripe
    const account = await stripe.accounts.retrieve();
    
    // Test if the price exists
    const price = await stripe.prices.retrieve('price_1Ruv0qGSpNbgjDfWZDPO913q');
    
    return NextResponse.json({
      success: true,
      account: {
        id: account.id,
        business_type: account.business_type,
      },
      price: {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
      }
    });
  } catch (error) {
    console.error('Stripe test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY
      },
      { status: 500 }
    );
  }
} 