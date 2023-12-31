import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/images/footer/banner2.svg";
import banner2 from "../../../assets/images/footer/banner4.jpg";
import banner3 from "../../../assets/images/footer/teacherImg.jpg";
import banner5 from "../../../assets/images/footer/banner5.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const Slider = () => {
  const { webMode } = useContext(AuthContext);
  return (
    <section
      className={`md:pt-10 md:pb-20  ${
        webMode === "dark" ? "bg-[#36454F]" : "bg-white"
      }`}
    >
      <Carousel showArrows={true}>
        <div
          className={`md:h-[500px] h-[400px] grid grid-cols-2 items-center px-8 md:px-20 ${
            webMode === "dark" ? "bg-[#36454F]" : "bg-[bisque]"
          }`}
        >
          <div>
            <h3 className="capitalize text-xl md:text-5xl font-bold">
              Achieve The best result with Scuola
            </h3>
            <p className="font-extralight py-3 md:py-7 ">
              With over 45 years of experience, Scuola is internationally
              recognized as an american leader in effective and optimal language
              training for beginners and intermediates.
            </p>
            <div>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 bg-yellow-400 rounded mr-4 md:mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
          <img className="h-[400px]  w-auto" src={banner1} />
        </div>
        <div className="md:h-[500px] grid grid-cols-2 items-center px-8 md:px-20">
          <img className="h-[400px] w-auto" src={banner2} />
          <div>
            <h3 className="capitalize text-xl md:text-5xl font-bold">
              Learn In the best environment.
            </h3>
            <p className="font-extralight py-3 md:py-7  ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur doloribus fuga distinctio ipsam mollitia nisi culpa
              excepturi, alias iure omnis corporis beatae. Earum, dignissimos
              vero laudantium nam dolore iure assumenda!
            </p>
            <div>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 bg-yellow-400 rounded mr-4 md:mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
        </div>
        <div
          className={`md:h-[500px] grid grid-cols-2 items-center px-8 md:px-20 ${
            webMode === "dark" ? "bg-[#36454F]" : "bg-gray-300"
          }`}
        >
          <div>
            <h3 className="capitalize text-xl md:text-5xl font-bold">
              Learn from the best in the world
            </h3>
            <p className="font-extralight py-3 md:py-7  ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              tempora blanditiis ad excepturi sapiente accusamus accusantium, ab
              quo molestias id dolores dolore sed, a nemo sunt natus, magnam
              odit. Praesentium.
            </p>
            <div>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 bg-yellow-400 rounded mr-4 md:mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
          <img className="h-[300px] w-[200px]" src={banner3} />
        </div>
        <div
          className={`md:h-[500px] grid grid-cols-2 items-center px-8 md:px-20 ${
            webMode === "dark" ? "bg-[#36454F]" : "bg-blue-300"
          }`}
        >
          <img className="h-[300px] w-[200px]" src={banner5} />
          <div>
            <h3 className="capitalize text-xl md:text-5xl font-bold">
              So, Which language are you learning today?
            </h3>
            <p className="font-extralight py-3 md:py-7  ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              tempora blanditiis ad excepturi sapiente accusamus accusantium, ab
              quo molestias id dolores dolore sed, a nemo sunt natus, magnam
              odit. Praesentium.
            </p>
            <div>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 bg-yellow-400 rounded mr-4 md:mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-4 md:px-8 md:text-xl font-medium py-2 md:py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Slider;
