const appUrl = import.meta.env.VITE_APP_URL;
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Show = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // isLoggedIn holds user object or falsy
  const user = isLoggedIn;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${appUrl}/listing/${params.id}`);
        if (!res.ok) {
          setListing(null);
          setLoading(false);
          return;
        }
        const resJson = await res.json();
        setListing(resJson);
      } catch (err) {
        console.error("Fetch listing error:", err);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const isOwner =
    user && listing && listing.owner && String(user._id) === String(listing.owner._id);

  const handleEdit = () => {
    if (!listing) return;
    navigate(`/edit/${listing._id}`);
  };

  const handleDelete = async () => {
    if (!listing) return;
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`${appUrl}/listing/${listing._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Listing deleted successfully!", { position: "top-center" });
        navigate("/");
      } else {
        const err = await res.json();
        toast.error(err?.error || "Failed to delete listing");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing");
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      return navigate("/login", { state: { from: location.pathname }, replace: true });
    }
    setReviewSubmitting(true);
    try {
      const res = await fetch(`${appUrl}/listing/${listing._id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const newReview = await res.json();
        setListing((prev) => ({ ...prev, reviews: [...(prev.reviews || []), newReview] }));
        toast.success("Review added successfully!");
        reset();
      } else {
        const err = await res.json();
        toast.error(err?.error || "Failed to add review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(
        `${appUrl}/listing/${listing._id}/review/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        setListing((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r._id !== reviewId),
        }));
        toast.success("Review deleted successfully!");
      } else {
        const err = await res.json();
        toast.error(err?.error || "Unable to delete the review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete the review");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg font-medium animate-pulse">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="max-w-3xl mx-auto p-8 text-center">
          <h2 className="text-2xl font-semibold">Listing not found</h2>
          <p className="mt-2 text-gray-600">The listing you are looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="max-w-4xl mx-auto p-6">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-white/30 backdrop-blur-md bg-gradient-to-br from-pink-100/50 to-blue-100/50">
          {listing.image?.url ? (
            <img
              src={listing.image.url}
              alt={listing.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-200 text-gray-500">
              <img
                src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment.jpg"
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-6 bg-gradient-to-br from-pink-50/80 to-blue-50/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold mb-1 text-gray-900">{listing.title}</h1>
              <p className="text-sm text-gray-600">
                📍 {listing.location}, {listing.country}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Hosted by{" "}
                <span className="font-semibold text-indigo-700">
                  {listing.owner?.username || "Unknown"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              {listing.price && (
                <div className="text-right">
                  <p className="text-pink-600 font-bold text-lg">
                    ₹ {Number(listing.price).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
              )}

              {isOwner && (
                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-800 mt-4">{listing.description}</p>
        </div>

        {/* Review + Add Review */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Review Form */}
          <div className="bg-gradient-to-br from-pink-50/80 to-blue-50/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Write a Review</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  {...register("comment", { required: "Please add a comment" })}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
                  placeholder="Share your experience..."
                  rows={4}
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  {...register("rating", {
                    required: "Please give a rating",
                    min: { value: 1, message: "Min 1" },
                    max: { value: 5, message: "Max 5" },
                  })}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
                  placeholder="1 - 5"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {reviewSubmitting ? "Posting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>

          {/* Reviews List */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Reviews</h2>

            {(!listing.reviews || listing.reviews.length === 0) && (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            )}

            <div className="space-y-4">
              {listing.reviews &&
                listing.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 rounded-lg shadow bg-gradient-to-br from-pink-100/70 to-blue-100/70 backdrop-blur-md border border-white/30"
                  >
                    <p className="text-gray-900">{review.comment}</p>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">⭐ {review.rating}/5</span>
                        <span className="text-gray-500">- {review.author?.username || "Anonymous"}</span>
                      </div>

                      {user && review.author && String(user._id) === String(review.author._id) && (
                        <button
                          onClick={() => handleReviewDelete(review._id)}
                          className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Show;
