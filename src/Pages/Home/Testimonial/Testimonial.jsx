import axios from "axios";
import { useContext, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { AuthContext } from "../../../Providers/AuthProviders";
import { motion } from "framer-motion";

const Testimonial = () => {
  const { webMode } = useContext(AuthContext);
  // Function to get the inner width of the window
  const [innerWidth, setInnerWidth] = useState();
  useEffect(() => {
    function getInnerWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    }

    function logInnerWidth() {
      var innerWidth = getInnerWidth();
      setInnerWidth(innerWidth);
    }

    window.addEventListener("resize", logInnerWidth);
    logInnerWidth();
  }, []);

  let perViewSlide = false;
  if (innerWidth <= 576) {
    perViewSlide = true;
  } else {
    perViewSlide = false;
  }

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/reviews")
      .then((res) => setReviews(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      className={`text-white py-8 md:py-20 md:px-20 ${
        webMode === "dark" ? "bg-black" : "bg-blue-600"
      }`}
    >
      <h3 className="text-center text-4xl pb-4 font-bold">
        What clients say about us?
      </h3>
      <p className="text-xl font-semibold pb-3 text-center">
        We provide the best service that comes with the best results.
      </p>
      <hr className="border-4 mx-auto border-white w-32" />
      <div className="pt-8 md:pt-28">
        <Swiper
          slidesPerView={perViewSlide ? 1 : 3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => {
            return (
              <SwiperSlide key={review._id}>
                <motion.div
                  initial={{ "--rotate": "0deg" }}
                  animate={{ "--rotate": "360deg" }}
                  transition={{ duration: 2, repeat: 0 }}
                  className="relative"
                >
                  <img
                    src={review.image}
                    className="w-24 h-24 mx-auto top-10 border-2 border-yellow-200 rounded-full z-10 relative"
                    alt=""
                  />
                  <motion.div
                    style={{ transform: "rotate(var(--rotate))" }}
                    className={`px-4 py-8 mb-14 mx-5 h-64 text-black rounded-xl mt-4 text-center  ${
                      webMode === "dark"
                        ? "bg-[#36454F] text-white"
                        : "bg-white"
                    }`}
                  >
                    <p>{review.testimonial}</p>
                    <div className="absolute left-0 right-0 bottom-0">
                      <h4 className="text-2xl font-bold">{review.name}</h4>
                      <p>{review.profession}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
