import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "antd";

type CheckoutFormProps = {
  onSuccess: () => void;
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      console.log(result);
      if (result.error) {
        setError(result.error.message || "Error");
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing the payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card-element">Credit or Debit Card</label>
        <PaymentElement />
      </div>
      <Button style={{ margin: "12px 0" }} type="primary" htmlType="submit">
        Pay
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};
