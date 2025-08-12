# Mochi website clone

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mayankpant-4790s-projects/v0-mochi-website-clone)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/i3t7nptZExk)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Local Development

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm package manager
- A Stripe account (for testing payment functionality)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd AZ
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```
   
   See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for detailed Stripe configuration instructions.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Starts the development server on port 3000
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code issues

### Testing Stripe Integration

#### Standard Test Cards

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`

Any expiry date in the future and any 3-digit CVC will work with test cards.

#### HSA/FSA Test Cards

The following card numbers can be used to test HSA/FSA flows for both IIAS certified or 90% merchants:

- **HSA Card (Visa)**: `4000 0512 3000 2839`
- **FSA Card with IIAS Reporting (Visa)**: `4000 0512 3000 0072`
- **FSA Card with IIAS Reporting (Mastercard)**: `5200 8282 8282 8897`

These cards are specifically designed for testing healthcare-related payment scenarios and can be used to validate HSA (Health Savings Account) and FSA (Flexible Spending Account) payment flows in your medication subscription system.

## Deployment

Your project is live at:

**[https://vercel.com/mayankpant-4790s-projects/v0-mochi-website-clone](https://vercel.com/mayankpant-4790s-projects/v0-mochi-website-clone)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/i3t7nptZExk](https://v0.dev/chat/projects/i3t7nptZExk)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository


# Add AI capabilities
 TBD