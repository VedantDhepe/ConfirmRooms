const appUrl = import.meta.env.VITE_APP_URL;import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import './NewListing.css'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react'
const NewListing = () => {
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const {
        register,
        handleSubmit, 
        
        formState: {errors, isSubmitting},

    } = useForm({
      defaultValues: {
    image: {
      url : "https://www.idiosystech.com/uploads/blog_image/76801577783280-property-listing-website.jpg",
    }
  },
    });

    const onSubmit = async(data) => {

      const formData = new FormData();

    // Append text fields
    formData.append("title", data.title);
    formData.append('description', data.description);
    formData.append('location',data.location);
    formData.append('price', data.price);
    formData.append('country', data.country);

    // Append file (react-hook-form gives file inputs as FileList)
    formData.append("image", data.image[0]); 



        let res = await fetch(`${appUrl}/listing`, {
            method : 'POST',
            // headers: {
            //     'Content-Type' : 'application/json',
            // },
            body: formData,
            credentials : 'include',
        });
        let resJson = await res.json();
        console.log(resJson);
        toast.success("Listing added Successfully")
        navigate('/');
    }
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Create New Listing
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter listing title"
                {...register("title", { required: "Title is required" })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                rows="3"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              />
              <input
              id="image"
              type="file"
              placeholder="Add Image"
              {...register("image",{
                required : {value : true, message :  "Please upload Listing Photo"}
              })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
               />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter location"
                {...register("location", { required: "Location is required" })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                placeholder="Enter country"
                {...register("country", { required: "Country is required" })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Image Link */}
           
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price/month
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewListing
