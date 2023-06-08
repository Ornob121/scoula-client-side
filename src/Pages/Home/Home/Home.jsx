import PopularClasses from "../PopuarClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <PopularClasses />
      <PopularInstructors />
    </div>
  );
};

export default Home;
