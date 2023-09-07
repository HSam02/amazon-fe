import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAddresses from "../../utils/Addresses/useAddressess";
import { Button, Form, Select } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { Link, Navigate } from "react-router-dom";
import { selectAddresses, selectCart } from "../../redux/selectors";
import { CheckoutForm } from "../../components/features/Order/CheckoutForm";
import stripePromise, {
  createPaymentIntent,
} from "../../services/stripe.service";
import { requiredRule } from "../../utils/Products/form.rules";

export const MakeOrder = () => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>();
  const [address, setAddress] = useState<string>();
  const { cartItems } = useSelector(selectCart);
  const { addresses } = useSelector(selectAddresses);
  const { defaultAddress } = useAddresses();

  const handlePaymentSuccess = () => {
    setPaymentConfirmed(true);
  };

  useEffect(() => {
    if (cartItems && address) {
      (async () => {
        try {
          const data = await createPaymentIntent({
            cartItemIds: cartItems.map(({ id }) => id),
            address,
          });

          setClientSecret(data);
        } catch (error) {
          setAddress(undefined);
        }
      })();
    }
  }, [cartItems, address]);

  if (!cartItems || cartItems.length === 0) {
    return <Navigate to="/" />;
  }

  if (!addresses?.length) {
    return <Navigate to="/user/settings" />;
  }

  if (!address) {
    return (
      <Form onFinish={(values) => setAddress(values.address)}>
        <Form.Item
          name="address"
          initialValue={defaultAddress?.value}
          rules={[requiredRule]}
        >
          <Select options={addresses} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <div style={{ paddingInline: 20 }}>
      <h1>Stripe Payment Example</h1>
      {paymentConfirmed ? (
        <div>
          <h2>Payment Confirmed!</h2>
          <p>Thank you for your payment.</p>
          <Link to="/user/orders">Go to Orders</Link>
        </div>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};
