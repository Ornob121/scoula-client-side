import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";

const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure(`/payments?email=${user?.email}`)
      .then((res) => setPayments(res.data))
      .catch((error) => console.log(error));
  }, [user?.email, axiosSecure]);
  //   console.log(payments);

  if (payments.length <= 0) {
    return (
      <h2 className="text-center font-semibold text-4xl text-red-500">
        You Do Not Have Any Payment History
      </h2>
    );
  }

  return (
    <div className="py-20">
      <h2 className="text-center font-semibold text-4xl text-yellow-400 uppercase">
        Here are all of your payments history
      </h2>
      <div className="flex justify-evenly pb-12 items-center"></div>
      <div className="mx-auto w-4/5">
        <table className="table mx-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Payment Amount</th>
              <th>Course Bought</th>
              <th>Payment Date</th>
              <th>TransactionId</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((enrolled, i) => (
              <tr key={enrolled._id}>
                <th>{i + 1}</th>
                <td>
                  <h2>{enrolled.buyerName}</h2>
                </td>
                <td>
                  <h3 className="font-medium text-xl">{enrolled.buyerEmail}</h3>
                </td>
                <td>
                  <p className="text-center">${enrolled.paymentAmount}</p>
                </td>
                <td>
                  <p className="text-center">{enrolled.quantity}</p>
                </td>
                <td>
                  <p>{enrolled.paymentTime.slice(0, 10)}</p>
                </td>
                <td>
                  <p>{enrolled.transactionId}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
