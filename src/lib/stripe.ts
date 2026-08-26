import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "Stripe is not configured. Add STRIPE_SECRET_KEY to your .env file."
    );
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}
