import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
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

    // Set as default payment method and update customer with address from checkout
    console.log('Setting payment method as default and updating customer address');
    
    // Get customer details from checkout session
    const checkoutCustomerDetails = session.customer_details;
    console.log('=== CHECKOUT SESSION ADDRESS DEBUG ===');
    console.log('Full session object:', JSON.stringify(session, null, 2));
    console.log('Customer details from checkout:', checkoutCustomerDetails);
    console.log('Address from checkout:', checkoutCustomerDetails?.address);
    console.log('Name from checkout:', checkoutCustomerDetails?.name);
    
    // Just set the payment method as default - don't override the address that was set during customer creation
    console.log('Setting payment method as default...');
    await stripe.customers.update(customerId as string, {
      invoice_settings: {
        default_payment_method: setupIntent.payment_method as string,
      },
    });
    console.log('Payment method set as default');
    
    // Verify the customer address is correct
    const customerForVerification = await stripe.customers.retrieve(customerId as string);
    if ('address' in customerForVerification) {
      console.log('Customer address (should be Marshalltown):', customerForVerification.address);
      console.log('Customer shipping:', customerForVerification.shipping);
    }

              // 4. Create a subscription schedule directly (no regular subscription)
          const priceId = session.metadata?.price_id || 'price_1Ruv0qGSpNbgjDfWZDPO913q';
          console.log('Creating subscription schedule with price:', priceId);
          
          // Calculate end date based on membership type
          const startDate = new Date();
          const endDate = new Date(startDate);
          
          // Get membership type from session metadata
          const membershipType = session.metadata?.membership_type || 'monthly';
          
          if (membershipType === 'annual') {
            endDate.setMonth(endDate.getMonth() + 12); // Add exactly 12 months for annual
          } else {
            endDate.setMonth(endDate.getMonth() + 6); // Add exactly 6 months for monthly/quarterly
          }
          
          // Format prescription_valid as date only (YYYY-MM-DD) - this will be the subscription schedule end date
          const prescriptionValidDate = endDate.toISOString().split('T')[0]; // Gets YYYY-MM-DD format
          
          console.log('Creating subscription schedule with automatic tax enabled...');
          console.log('Session metadata:', session.metadata);
          console.log('Metadata being set:', {
            patient_number: session.metadata?.patient_number || '',
            prescribing_doctor: session.metadata?.prescribing_doctor || '',
            prescription_valid: prescriptionValidDate
          });
          console.log('Raw session metadata values:', {
            patient_number_raw: session.metadata?.patient_number,
            prescribing_doctor_raw: session.metadata?.prescribing_doctor,
            prescription_valid_raw: session.metadata?.prescription_valid
          });
          
          // Debug: Check customer details
          console.log('=== CUSTOMER DEBUG INFO ===');
          if ('address' in customerForVerification) {
            console.log('Customer address:', customerForVerification.address);
            console.log('Customer tax info:', customerForVerification.tax);
            console.log('Customer metadata:', customerForVerification.metadata);
          }
          
          // Debug: Check price details
          console.log('=== PRICE DEBUG INFO ===');
          const priceDetails = await stripe.prices.retrieve(priceId);
          console.log('Price details:', {
            id: priceDetails.id,
            currency: priceDetails.currency,
            unit_amount: priceDetails.unit_amount,
            product: priceDetails.product,
            tax_behavior: priceDetails.tax_behavior,
          });
          
          const subscriptionSchedule = await stripe.subscriptionSchedules.create({
            customer: customerId as string,
            start_date: Math.floor(startDate.getTime() / 1000), // Current time
            end_behavior: 'cancel',
            default_settings: {
            default_payment_method: setupIntent.payment_method as string,
            automatic_tax: {
                enabled: true,  // true | false 
              },
            },
            metadata: {
              patient_number: session.metadata?.patient_number || '',
              prescribing_doctor: session.metadata?.prescribing_doctor || '',
              prescription_valid: prescriptionValidDate, // Subscription schedule end date as YYYY-MM-DD
            },
            phases: [
              {
                automatic_tax: {
                  enabled: true,
                },
                items: [
                  {
                    price: priceId,
                    quantity: 1,
                  },
                ],
                end_date: Math.floor(endDate.getTime() / 1000), // Exactly 6 months from start
                metadata: {
                  patient_number: session.metadata?.patient_number || '',
                  prescribing_doctor: session.metadata?.prescribing_doctor || '',
                  prescription_valid: prescriptionValidDate, // Subscription schedule end date as YYYY-MM-DD
                },
              },
            ],
          });
          
          console.log('Subscription schedule created successfully!');
          console.log('Schedule ID:', subscriptionSchedule.id);
          console.log('Schedule metadata:', subscriptionSchedule.metadata);
          console.log('Schedule details:', {
            id: subscriptionSchedule.id,
            end_behavior: subscriptionSchedule.end_behavior,
            metadata: subscriptionSchedule.metadata,
            phases: subscriptionSchedule.phases.map(phase => ({
              start_date: phase.start_date,
              end_date: phase.end_date,
              items: phase.items.map(item => ({
                price: item.price,
                quantity: item.quantity,
              })),
            })),
          });
          console.log('=== SUBSCRIPTION SCHEDULE CREATION SUCCESSFUL ===');

    // 6. Advance the test clock by 1 hour
    await stripe.testHelpers.testClocks.advance(testClockId as string, {
      frozen_time: Math.floor(Date.now() / 1000) + 3600, // Current time + 1 hour
    });

    console.log('Test clock advanced by 1 hour');

              const customerName = searchParams.get('customer_name') || 'Customer';
          return NextResponse.redirect(`${request.nextUrl.origin}/?success=true&subscription_id=${subscriptionSchedule.id}&customer_name=${encodeURIComponent(customerName)}`);

  } catch (error) {
    console.error('=== ERROR IN COMPLETE SUBSCRIPTION ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=subscription_failed`);
  }
} 