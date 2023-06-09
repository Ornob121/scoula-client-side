import useSelectClass from "../../../Hooks/useSelectClass";

import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const SelectedClasses = () => {
  const [selectedClasses] = useSelectClass();
  console.log(selectedClasses);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-red-500 z-10">Hello</h2>
    </div>
  );
};

export default SelectedClasses;
