import useSelectClass from "../../../Hooks/useSelectClass";

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const SelectedClasses = () => {
  const [selectedClasses, refetch] = useSelectClass();
  console.log(selectedClasses);

  const totalPrice = selectedClasses.reduce((sum, item) => item.price + sum, 0);
  console.log(totalPrice);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/selectedClasses/${id}`)
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
        <button className="btn btn-xs btn-warning">pay</button>
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
