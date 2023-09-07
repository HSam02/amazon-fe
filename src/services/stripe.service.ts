import { loadStripe } from "@stripe/stripe-js";
import { paymentEndpoints } from "../utils/types/endpoints";
import appAxios from "./axios.service";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISH_KEY || ""
);

export const createPaymentIntent = async (reqData: {
  cartItemIds: number[];
  address: string;
}) => {
  try {
    const { data } = await appAxios.post(paymentEndpoints.CREATE, reqData);

    return data.clientSecret as string;
  } catch (error) {
    throw error;
  }
};

export default stripePromise;
