# Stripe Integration Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Setup Instructions

1. **Get Stripe API Keys:**
   - Sign up for a Stripe account at https://stripe.com
   - Go to the Stripe Dashboard
   - Navigate to Developers > API keys
   - Copy your test secret key and publishable key

2. **Create the Price in Stripe:**
   - In your Stripe Dashboard, go to Products
   - Create a new product for your monthly membership
   - Add a recurring price with ID: `price_1RtF7GGSpNbgjDfWCCtMPCqh`
   - Set the price to $25/month

3. **Test the Integration:**
   - Use Stripe's test card numbers for testing:
     - Success: `4242 4242 4242 4242`
     - Decline: `4000 0000 0000 0002`

## How It Works

1. **Customer clicks "Choose Monthly"** → Opens modal for name/email
2. **Customer submits form** → Creates Stripe customer with test clock
3. **Redirects to Stripe Checkout** → Customer enters payment method
4. **Payment successful** → Creates subscription and advances test clock by 1 hour
5. **Redirects back** → Shows success/error message

## API Endpoints

- `POST /api/create-subscription` - Creates customer and checkout session
- `GET /api/complete-subscription` - Completes subscription after payment

## Test Clock Features

- Creates a test clock with current time
- Associates customer with test clock
- Advances clock by 1 hour after subscription creation
- Allows testing of subscription lifecycle in accelerated time 