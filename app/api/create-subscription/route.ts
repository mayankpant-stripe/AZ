import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  console.log('=== CREATE SUBSCRIPTION API CALLED ===');
  try {
    const { customerName, customerEmail, membershipType } = await request.json();
    console.log('Creating subscription for:', { customerName, customerEmail, membershipType });

    // 1. Create a test clock with current time
    console.log('Creating test clock...');
    const testClock = await stripe.testHelpers.testClocks.create({
      frozen_time: Math.floor(Date.now() / 1000), // Current time in seconds
    });
    console.log('Test clock created:', testClock.id);

    // 2. Create a customer associated with the test clock
    console.log('Creating customer...');
    const customer = await stripe.customers.create({
      name: customerName,
      email: customerEmail,
      test_clock: testClock.id,
    });
    console.log('Customer created:', customer.id);

    // 3. Create a checkout session for payment method collection
    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      // payment_method_types: ['card', 'bacs_debit', 'sepa_debit', 'ideal', 'sofort'],
      mode: 'setup',
      currency: 'usd',
      automatic_tax: {
        enabled: false,
      },
      success_url: `${request.nextUrl.origin}/api/complete-subscription?session_id={CHECKOUT_SESSION_ID}&customer_id=${customer.id}&test_clock_id=${testClock.id}&customer_name=${encodeURIComponent(customerName)}`,
      cancel_url: `${request.nextUrl.origin}/?canceled=true`,
      metadata: {
        customer_id: customer.id,
        test_clock_id: testClock.id,
        price_id: membershipType === 'monthly' ? 'price_1RtF7GGSpNbgjDfWCCtMPCqh' : 'price_1RtF7pGSpNbgjDfWuamgPFeq',
      },
    });

    console.log('Checkout session created:', session.id, 'URL:', session.url);

    console.log('=== RETURNING SUCCESS RESPONSE ===');
    return NextResponse.json({ 
      sessionId: session.id,
      customerId: customer.id,
      testClockId: testClock.id,
      url: session.url 
    });

  } catch (error) {
    console.error('=== ERROR IN CREATE SUBSCRIPTION ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { 
        error: 'Failed to create subscription',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 