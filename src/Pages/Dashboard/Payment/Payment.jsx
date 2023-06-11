import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import useSelectClass from "../../../Hooks/useSelectClass";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
  const [selectedClasses] = useSelectClass();

  const totalPrice = selectedClasses.reduce(
    (total, selected) => selected.price + total,
    0
  );
  if (totalPrice === 0) {
    return;
  }
  const price = parseFloat(totalPrice.toFixed(2));
  console.log(price);
  return (
    <div className="w-3/4 mx-auto mt-[40vh]">
      <Elements stripe={stripePromise}>
        <CheckOutForm price={price} classes={selectedClasses} />
      </Elements>
    </div>
  );
};

export default Payment;
