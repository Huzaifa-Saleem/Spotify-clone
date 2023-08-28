import Stripe from "stripe";

export interface ISongs {
  id: string;
  title: string;
  author: string;
  user_id: string;
  song_path: string;
  image_path: string;
}

export interface IUserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ISubscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  current_period_end?: string;
  current_period_start?: string;
  created?: string;
  canceled_at?: string;
  ended_at?: string;
  trial_end?: string;
  trial_start?: string;
  price?: IPrice;
}

export interface IPrice {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trail_period_days?: number | null;
  metadata?: Stripe.Metadata;
  product?: IProduct;
}

export interface IProduct {
  id: string;
  active?: boolean;
  description?: string;
  name?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}
