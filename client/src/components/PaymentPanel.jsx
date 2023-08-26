import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function PaymentPanel() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";

  useEffect(() => {
    fetch(`${baseUrl}/api/getPublishKey`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/api/paymentStripe`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#184d99",
        color: "white",
      }}
    >
      <div
        style={{
          width: "40%",
          padding: 20,
          backgroundColor: "white",
          borderRadius: 20,
        }}
      >
        {clientSecret && stripePromise && (
          <Elements
            style={{ color: "white" }}
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default PaymentPanel;
