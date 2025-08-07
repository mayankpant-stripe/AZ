import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(request: NextRequest) {
  console.log('=== COMPLETE SUBSCRIPTION API CALLED ===');
  console.log('Request URL:', request.url);
  console.log('Request method:', request.method);
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const customerId = searchParams.get('customer_id');
    const testClockId = searchParams.get('test_clock_id');

    console.log('Complete subscription called with:', { sessionId, customerId, testClockId });

    if (!sessionId || !customerId || !testClockId) {
      return NextResponse.redirect(`${request.nextUrl.origin}/?error=missing_params`);
    }

    // Retrieve the checkout session
    console.log('Retrieving checkout session:', sessionId);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Session retrieved:', { 
      id: session.id, 
      payment_status: session.payment_status,
      setup_intent: session.setup_intent 
    });
    
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      console.log('Payment status not valid, redirecting to error');
      return NextResponse.redirect(`${request.nextUrl.origin}/?error=payment_failed`);
    }

    // Get the setup intent from the session
    console.log('Retrieving setup intent:', session.setup_intent);
    const setupIntent = await stripe.setupIntents.retrieve(session.setup_intent as string);
    console.log('Setup intent retrieved:', { 
      id: setupIntent.id, 
      status: setupIntent.status,
      payment_method: setupIntent.payment_method 
    });
    
    if (!setupIntent.payment_method) {
      console.log('No payment method found, redirecting to error');
      return NextResponse.redirect(`${request.nextUrl.origin}/?error=no_payment_method`);
    }

    // Attach the payment method to the customer
    console.log('Attaching payment method to customer');
    await stripe.paymentMethods.attach(setupIntent.payment_method as string, {
      customer: customerId as string,
    });
    console.log('Payment method attached successfully');

    // Set as default payment method
    console.log('Setting payment method as default');
    await stripe.customers.update(customerId as string, {
      invoice_settings: {
        default_payment_method: setupIntent.payment_method as string,
      },
    });
    console.log('Payment method set as default');

    // 4. Create a subscription with the specified price
    const priceId = session.metadata?.price_id || 'price_1RtF7GGSpNbgjDfWCCtMPCqh';
    console.log('Creating subscription with price:', priceId);
    // Create subscription with automatic tax enabled (matching dashboard request)
    console.log('Creating subscription with automatic tax enabled...');
    const subscription = await stripe.subscriptions.create({
      customer: customerId as string,
      items: [{ price: priceId, quantity: 1 }],
      default_payment_method: setupIntent.payment_method as string,
      automatic_tax: {
        enabled: true,
      },
      currency: 'usd',
      off_session: true,
      payment_behavior: 'error_if_incomplete',
      proration_behavior: 'none',
    });
    console.log('Subscription created with automatic tax:', subscription.id);
    console.log('Subscription details:', {
      id: subscription.id,
      status: subscription.status,
      automatic_tax: subscription.automatic_tax,
      tax_percent: subscription.tax_percent,
      items: subscription.items.data.map(item => ({
        price: item.price.id,
        amount: item.price.unit_amount,
        currency: item.price.currency
      }))
    });

    console.log('Subscription created:', subscription.id);

    // 5. Advance the test clock by 1 hour
    await stripe.testHelpers.testClocks.advance(testClockId as string, {
      frozen_time: Math.floor(Date.now() / 1000) + 3600, // Current time + 1 hour
    });

    console.log('Test clock advanced by 1 hour');

    const customerName = searchParams.get('customer_name') || 'Customer';
    return NextResponse.redirect(`${request.nextUrl.origin}/?success=true&subscription_id=${subscription.id}&customer_name=${encodeURIComponent(customerName)}`);

  } catch (error) {
    console.error('=== ERROR IN COMPLETE SUBSCRIPTION ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=subscription_failed`);
  }
} 