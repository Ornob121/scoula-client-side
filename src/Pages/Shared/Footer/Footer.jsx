import logo from "../../../assets/images/logo.svg";
import footerImage from "../../../assets/images/footer/footerImg.png";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const Footer = () => {
  const { webMode } = useContext(AuthContext);
  return (
    <footer
      className={`relative bottom-0 pb-4 pt-10 ${
        webMode === "dark" ? "bg-[#36454F]" : "bg-white"
      }`}
    >
      <hr className="border-2 mb-10 text-gray-200" />
      <form>
        <div className="grid md:grid-cols-5 grid-cols-1 gap-5 px-10 md:px-20 md:my-16 my-8">
          <input
            className="outline-2 outline-yellow-400 py-3 md:text-xl border border-gray-50 px-4 shadow-sm"
            type="text"
            placeholder="Name"
            id=""
          />
          <input
            className="outline-2 outline-yellow-400 py-3 md:text-xl border border-gray-50 px-4 shadow-sm"
            type="email"
            placeholder="Email"
            id=""
          />
          <select
            className="outline-2 w-full outline-yellow-400 py-3 md:text-xl border border-gray-50 text-gray-400 px-4 shadow-sm"
            name=""
            id=""
            defaultValue="Who Are You?"
          >
            <option value="Who Are You?">Who Are You?</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Parent">Parent</option>
          </select>
          <input
            className="outline-2 outline-yellow-400 py-3 md:text-xl border border-gray-50 px-4 shadow-sm"
            type="text"
            placeholder="Phone"
            id=""
          />
          <button className="btn btn-warning md:text-xl h-16 w-full">
            Subscribe
          </button>
        </div>
      </form>
      <section className="md:px-20 px-10">
        <div className=" grid md:grid-cols-6 grid-cols-2 my-4 gap-5">
          <div className="col-span-2">
            <img src={logo} alt="" />
            <p className="py-6 text-gray-500">
              Scuola School was founded in 1998 as a summer camp international
              language learning school in Dhaka. We are a premier licensed
              private career school offering a variety of high quality courses.
            </p>
            <p className="flex items-center gap-3 text-xl">
              <FaPhoneAlt /> +880 17673-67722
            </p>
          </div>
          <div className=" my-4">
            <h5 className="uppercase font-medium mb-4">Courses</h5>
            <Link className="text-gray-500">General English</Link>
            <Link className="text-gray-500">Young Learners</Link>
            <Link className="text-gray-500">Dutch Language</Link>
            <Link className="text-gray-500">German Language</Link>
            <Link className="text-gray-500">French Language</Link>
            <Link className="text-gray-500">Italian Language</Link>
          </div>
          <div className="mx-auto">
            <h5 className="uppercase font-medium my-4">About</h5>
            <Link className="text-gray-500">Home</Link>
            <br />
            <Link className="text-gray-500">About US</Link>
            <br />
            <Link className="text-gray-500">Courses</Link>
            <br />
            <Link className="text-gray-500">Teachers</Link>
          </div>
          <div className="col-span-2 my-4">
            <h5 className="uppercase font-medium pb-8 ">Follow US</h5>
            <div className="flex gap-20 md:gap-0">
              <div className="flex gap-5 md:gap-0 h-10 text-4xl">
                <Link className="text-gray-500">
                  <FaFacebook />
                </Link>
                <Link className="text-gray-500">
                  <FaTwitter />
                </Link>
                <Link className="text-gray-500">
                  <FaInstagram />
                </Link>
              </div>
              <img src={footerImage} alt="" />
            </div>
          </div>
        </div>
        <hr className="border-2 my-4 text-gray-200" />
        <div className="md:flex text-center md:text-left justify-between">
          <p>© 2023 Scuola by Shadman Tahmid</p>
          <div className="flex gap-20 mt-5 md:mt-0 md:gap-10">
            <Link>Terms & Conditions</Link>
            <Link>Privacy Policy</Link>
            <Link>Legal</Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
