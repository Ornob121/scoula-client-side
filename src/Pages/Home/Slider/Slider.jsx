import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/images/footer/banner2.svg";
import banner2 from "../../../assets/images/footer/banner4.jpg";
import banner3 from "../../../assets/images/footer/teacherImg.jpg";
import banner5 from "../../../assets/images/footer/banner5.jpg";

const Slider = () => {
  return (
    <section className="md:mt-10 md:mb-20">
      <Carousel showArrows={true}>
        <div className="h-[500px] grid grid-cols-2 items-center bg-[bisque] px-20">
          <div>
            <h3 className="capitalize text-5xl font-bold">
              Achieve The best result with Scuola
            </h3>
            <p className="text-xl font-extralight py-7 ">
              With over 45 years of experience, Scuola is internationally
              recognized as an american leader in effective and optimal language
              training for beginners and intermediates.
            </p>
            <div>
              <button className="px-8 text-xl font-medium py-4 bg-yellow-400 rounded mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-8 text-xl font-medium py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
          <img className="h-[400px] w-auto" src={banner1} />
        </div>
        <div className="h-[500px] grid grid-cols-2 items-center px-20">
          <img className="h-[400px] w-auto" src={banner2} />
          <div>
            <h3 className="capitalize text-5xl font-bold">
              Learn In the best environment.
            </h3>
            <p className="text-xl font-extralight py-7 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur doloribus fuga distinctio ipsam mollitia nisi culpa
              excepturi, alias iure omnis corporis beatae. Earum, dignissimos
              vero laudantium nam dolore iure assumenda!
            </p>
            <div>
              <button className="px-8 text-xl font-medium py-4 bg-yellow-400 rounded mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-8 text-xl font-medium py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
        </div>
        <div className="h-[500px] grid grid-cols-2 items-center gap-8 bg-gray-300 px-20">
          <div>
            <h3 className="capitalize text-5xl font-bold">
              Learn from the best in the world
            </h3>
            <p className="text-xl font-extralight py-7 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              tempora blanditiis ad excepturi sapiente accusamus accusantium, ab
              quo molestias id dolores dolore sed, a nemo sunt natus, magnam
              odit. Praesentium.
            </p>
            <div>
              <button className="px-8 text-xl font-medium py-4 bg-yellow-400 rounded mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-8 text-xl font-medium py-4 hover:bg-black hover:text-white">
                About Us
              </button>
            </div>
          </div>
          <img className="h-[300px] w-[200px]" src={banner3} />
        </div>
        <div className="h-[500px] grid grid-cols-2 items-center gap-8 bg-blue-300 px-20">
          <img className="h-[300px] w-[200px]" src={banner5} />
          <div>
            <h3 className="capitalize text-5xl font-bold">
              So, Which language are you learning today?
            </h3>
            <p className="text-xl font-extralight py-7 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              tempora blanditiis ad excepturi sapiente accusamus accusantium, ab
              quo molestias id dolores dolore sed, a nemo sunt natus, magnam
              odit. Praesentium.
            </p>
            <div>
              <button className="px-8 text-xl font-medium py-4 bg-yellow-400 rounded mr-6 hover:bg-black hover:text-white">
                Apply Now
              </button>
              <button className="px-8 text-xl font-medium py-4 hover:bg-black hover:text-white">
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
