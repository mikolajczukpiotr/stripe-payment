import { useEffect, useState } from "react";
import { SuccessIcon } from "../assets/SuccessIcon";
import "../style/Completion.css";
import { CompletionProps } from "../types";

function Completion(props: CompletionProps) {
  const [messageBody, setMessageBody] = useState<JSX.Element | string>("");
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe: any) => {
      const url = new URL(window.location.href);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");

      try {
        const { error, paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );

        setMessageBody(
          error ? (
            `> ${error.message}`
          ) : (
            <>
              Payment {paymentIntent.status}:{" "}
              <a
                href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {paymentIntent.id}
              </a>
            </>
          )
        );
      } catch (e) {
        if (e instanceof Error) {
          setMessageBody(`> Error: ${e.message}`);
        } else {
          setMessageBody(`> Error: ${e}`);
        }
      }
    });
  }, [stripePromise]);

  return (
    <div className="success">
      <h1>Thank you!</h1>
      <SuccessIcon height="15rem" width="15rem" />
      <div>
        <p>Your payment is complete.</p>
        <a href="/">Go Back</a>
      </div>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </div>
  );
}

export default Completion;
