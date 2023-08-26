import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { setIsSubscribe } from "../features/RichpanelSlice";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";
  const { activeTab, activePlan, isSubscribe } = useSelector(
    (state) => state.counter
  );

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const addSubscription = async () => {
    try {
      console.log({ activePlan, activeTab });
      const { data } = await axios.post(
        `${baseUrl}/api/addSubscription`,
        { activePlan, activeTab },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("auth-token")),
          },
        }
      );
      const result = data.subscribed;
      console.log("result is", result);
      dispatch(setIsSubscribe(true));

      if (result === true) {
        navigate("/home/content");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    await addSubscription();
    console.log("Helo");
    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:5173",
    //   },
    // });
    notifications.show({
      title: "Subscription Added",
      message: "Now you are eligible to watch content",
    });
    console.log("error on checkout", error);
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
