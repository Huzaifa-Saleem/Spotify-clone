import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromse: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromse) {
    stripePromse = loadStripe(
      String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    );
  }

  return stripePromse;
};
