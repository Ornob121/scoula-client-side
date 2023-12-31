import useSelectClass from "../../../Hooks/useSelectClass";

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SelectedClasses = () => {
  const [selectedClasses, refetch] = useSelectClass();
  const navigate = useNavigate();

  const totalPrice = selectedClasses.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You this class will be removed from selected class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://scoula-server-side.vercel.app/selectedClasses/${id}`)
          .then((data) => {
            if (data.data.acknowledged) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div className="py-20">
      <div className="flex justify-evenly pb-12 items-center">
        <h3 className="text-4xl font-semibold">
          Total Selected: {selectedClasses.length}
        </h3>
        <h4 className="text-4xl font-semibold">Total Price: ${totalPrice}</h4>
        <button
          onClick={() => navigate("/dashboard/payment")}
          className={`btn btn-xs btn-warning ${
            selectedClasses.length < 1 && "btn-disabled"
          }`}
        >
          pay all
        </button>
      </div>
      <div className="mx-auto w-4/5">
        <table className="table mx-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {selectedClasses.map((selected, i) => (
              <tr key={selected._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={selected.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">{selected.name}</h3>
                    </div>
                  </div>
                </td>
                <td>
                  <h4 className="text-lg">{selected.instructorName}</h4>
                </td>
                <td>
                  <p className="text-center">{selected.availableSeats}</p>
                </td>
                <td>
                  <p className="text-right">${selected.price}</p>
                </td>
                <td>
                  <p className="">
                    <Link to={`/dashboard/payment/${selected._id}`}>
                      <button className="btn-xs bg-yellow-400 hover:text-white rounded-md">
                        Pay
                      </button>
                    </Link>
                  </p>
                </td>
                <th>
                  <button
                    className="btn bg-red-500"
                    onClick={() => handleDelete(selected._id)}
                  >
                    <FaTrashAlt className="text-2xl font-semibold text-white" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClasses;
