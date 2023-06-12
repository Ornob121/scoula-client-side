import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import "./CheckOutForm.css";

const CheckOutForm = ({ price, classes }) => {
  // console.log(classes);
  const stripe = useStripe();
  const [axiosSecure] = useAxiosSecure();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure
      .post("/create_payment_intent", { price })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => console.log(error));
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // console.log(card, "card");
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error, "error");
      setCardError(error.message);
    } else {
      setCardError("");
      //   console.log(paymentMethod, "payment method");
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      // setCardError()
      console.log(confirmError);
    }
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      setTransactionId(transactionId);
      const paymentAmount = paymentIntent.amount / 100;
      const time = new Date();
      const buyerName = user.displayName;
      const buyerEmail = user.email;
      const payment = {
        paymentAmount,
        transactionId,
        paymentTime: time,
        buyerName,
        buyerEmail,
        quantity: classes.length,
        courseName: classes.map((course) => course.name),
        selectedCourseId: classes.map((course) => course._id),
        courseId: classes.map((course) => course.classId),
      };
      axiosSecure
        .post("/payments", payment)
        .then((res) => {
          if (res.data.insertResult.acknowledged) {
            Swal.fire(
              "Transaction Complete!",
              "Your Transaction has been completed",
              "success"
            );
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn-sm btn-warning rounded-md mt-10"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && (
        <p className="text-center font-medium text-xl py-10 text-red-600">
          {cardError}
        </p>
      )}
      {transactionId && (
        <p className="text-xl font-medium text-green-500 text-center">
          Transaction Complete With TransactionId {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckOutForm;
