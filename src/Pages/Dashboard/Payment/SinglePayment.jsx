import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const SinglePayment = () => {
  // const [selectedClasses] = useSelectClass();
  const [axiosSecure] = useAxiosSecure();
  const [course, setCourse] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axiosSecure(`/selectedClasses/${id}`)
      .then((data) => setCourse(data.data))
      .catch((error) => console.log(error));
  }, [id, axiosSecure]);
  console.log(course?.price);

  if (!course.price || !course) {
    return;
  }

  const selectedClass = [];
  selectedClass.push(course);
  // console.log(selectedClass);

  if (selectedClass.length <= 0) {
    return;
  }

  const price = parseFloat(course?.price.toFixed(2));
  console.log(price);
  return (
    <div className="w-3/4 mx-auto mt-[40vh]">
      <Elements stripe={stripePromise}>
        <CheckOutForm price={price} classes={selectedClass} />
      </Elements>
    </div>
  );
};

export default SinglePayment;
