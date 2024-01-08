import "./App.css";
import Payment from "./pages/Payment";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Completion from "./pages/Completion";

function App() {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${serverUrl}/config`).then(async (data) => {
      const { publishableKey } = await data.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Payment stripePromise={stripePromise} />} />
          <Route
            path="/completion"
            element={<Completion stripePromise={stripePromise} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
