import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  console.log('=== CREATE SUBSCRIPTION API CALLED ===');
  try {
    const { customerName, customerEmail, patientNumber, prescribingDoctor, membershipType } = await request.json();
    console.log('Creating subscription for:', { customerName, customerEmail, patientNumber, prescribingDoctor, membershipType });

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
      address: {
        line1: "1 W main street",
        city: "Marshalltown",
        state: "Iowa",
        country: "US",
        postal_code: "50158",
        line2: "",
      },
      shipping: {
        name: customerName,
        address: {
          line1: "1 W main street",
          city: "Marshalltown",
          state: "Iowa",
          country: "US",
          postal_code: "50158",
          line2: "",
        },
      },
    });
    console.log('Customer created:', customer.id);

              // 3. Create a checkout session for payment method collection
          console.log('Creating checkout session...');
          
          // Calculate prescription_valid date based on membership type
          const currentDate = new Date();
          let prescriptionValidDate;
          
          if (membershipType === 'quarterly') {
            // For quarterly: 6 months from now
            const endDate = new Date(currentDate);
            endDate.setMonth(endDate.getMonth() + 6);
            prescriptionValidDate = endDate.toISOString().split('T')[0]; // YYYY-MM-DD format
          } else if (membershipType === 'annual') {
            // For annual: 12 months from now
            const endDate = new Date(currentDate);
            endDate.setMonth(endDate.getMonth() + 12);
            prescriptionValidDate = endDate.toISOString().split('T')[0]; // YYYY-MM-DD format
          } else {
            // For monthly: 1 month from now
            const endDate = new Date(currentDate);
            endDate.setMonth(endDate.getMonth() + 1);
            prescriptionValidDate = endDate.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
          
          const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'], // Force US card payment methods
            mode: 'setup',
            currency: 'usd',
            locale: 'en', // Set to US English locale
            billing_address_collection: 'required', // Force address collection
            custom_text: {
              submit: {
                message: "Please enter your billing address to complete the setup.",
              },
            },
            automatic_tax: {
              enabled: false,
            },
            success_url: `${request.nextUrl.origin}/api/complete-subscription?session_id={CHECKOUT_SESSION_ID}&customer_id=${customer.id}&test_clock_id=${testClock.id}&customer_name=${encodeURIComponent(customerName)}`,
            cancel_url: `${request.nextUrl.origin}/?canceled=true`,
            metadata: {
              customer_id: customer.id,
              test_clock_id: testClock.id,
              price_id: membershipType === 'monthly' ? 'price_1RtF7GGSpNbgjDfWCCtMPCqh' : membershipType === 'quarterly' ? 'price_1RtF7pGSpNbgjDfWuamgPFeq' : 'price_1Rtr03GSpNbgjDfWtUM9Nyll',
              membership_type: membershipType,
              patient_number: patientNumber,
              prescribing_doctor: prescribingDoctor,
              prescription_valid: prescriptionValidDate,
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