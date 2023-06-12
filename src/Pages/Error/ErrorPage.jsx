import { Link, useRouteError } from "react-router-dom";
import errorPic from "../../assets/images/footer/errorPic.png";
const ErrorPage = () => {
  const { error, status } = useRouteError();
  return (
    <section className="flex items-center p-16 h-screen bg-zinc-100 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <img src={errorPic} className="rounded-xl h-48" alt="" />
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-red-600">
            {status || 404}
          </h2>
          <p className="text-2xl font-semibold text-3xl text-red-800 mb-8">
            {error?.message}
          </p>
          <Link to="/" className="btn btn-error">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
