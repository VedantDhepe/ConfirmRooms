const appUrl = import.meta.env.VITE_APP_URL;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Edit = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState({
    title: "",
    location: "",
    country: "",
    description: "",
    price: "",
    image: {
      url: "",
      filename: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`${appUrl}/listing/${id}`);
        const data = await res.json();
        setListing(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      const res = await fetch(`${appUrl}/listing/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        toast.success("Listing updated successfully");
        navigate(`/show/${id}`);
      } else {
        toast.error("Failed to update listing");
        navigate(`/show/${id}`);
      }
    } catch (err) {
      console.error("Error updating listing:", err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[85vh]">
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
            ✨ Edit Listing
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={listing.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={listing.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={listing.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={listing.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Old Image */}
            {listing.image && listing.image.url && (
              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-sm mb-2">Current Image</p>
                <img
                  src={listing.image?.url}
                  alt="Listing"
                  className="w-48 h-32 object-cover rounded-lg shadow-md border"
                />
              </div>
            )}

            {/* Upload New Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload New Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                value={listing.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Edit;
