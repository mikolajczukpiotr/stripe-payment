import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { CompletionProps } from "../types";

function Payment({ stripePromise }: CompletionProps) {
  const [clientSecret, setClientSecret] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${serverUrl}/create-payment-intent`)
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, [serverUrl]);
  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
