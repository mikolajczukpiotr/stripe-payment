import { Stripe } from "@stripe/stripe-js";

export type CompletionProps = {
  stripePromise: Promise<Stripe>;
};
export type InputFieldProps = {
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
};
