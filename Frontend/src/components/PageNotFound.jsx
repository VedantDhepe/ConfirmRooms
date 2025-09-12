import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
