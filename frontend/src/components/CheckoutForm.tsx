import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { InputField } from "./InputField";
import "../style/CheckoutForm.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("John Bravo");
  const [errors, setErrors] = useState({ name: "" });
  const [country, setCountry] = useState("US");

  const fields = [
    {
      id: "name",
      label: "Name",
      value: name,
      error: errors.name,
      setter: setName,
      errorMessage: "Imię i nazwisko jest wymagane",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ name: "" });

    fields.forEach(({ id, value, errorMessage }) => {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: errorMessage,
        }));
      }
    });

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
        payment_method_data: {
          billing_details: {
            name: name,
            address: {
              country: country,
              postal_code: "",
              state: "",
              city: "",
              line1: "",
              line2: "",
            },
          },
        },
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message || "An error occurred");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setName(selectedCountry === "US" ? "John Bravo" : "Jan Kowalski");
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h1>Payment</h1>
      <div>
        <div className="address">
          {fields.map((field, index) => (
            <InputField
              key={index}
              label={field.label}
              value={field.value}
              error={field.error}
              onChange={field.setter}
            />
          ))}
          <label className="label">Kraj</label>
          <select
            className="select"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="US">United States</option>
            <option value="PL">Poland</option>
          </select>
        </div>
        <PaymentElement
          id="payment-element"
          options={{
            fields: {
              billingDetails: {
                address: "never",
              },
            },
          }}
        />
      </div>
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? "Loading" : "Pay now"}</span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
