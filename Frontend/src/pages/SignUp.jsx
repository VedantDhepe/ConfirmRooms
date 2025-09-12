const appUrl = import.meta.env.VITE_APP_URL;
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import {ToastContainer, toast} from 'react-toastify';
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react'
const Signup = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${appUrl}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔹 send cookies
        body: JSON.stringify(data),
      });

      // if (!res.ok) {
      //   const errData = await res.json();
      //   throw new Error(errData.error || "Signup failed");
      // }
      // else{
      // const result = await res.json();
      // console.log("Signup successful:", result); 
      // setIsLoggedIn(result.login);
      // if (result.user) toast.success(result.user);
      // navigate("/"); // redirect after signup
      // }
      const result = await res.json();
      if(result.user){
        console.log("Sign in successful", result);
        setIsLoggedIn(result.user);
        toast.success(`Welcome ${result.user.username}`);
        console.log(result);
        navigate('/')
      }
      else if(result.error){
        toast.error(result.error);
      }

    } catch (err) { 
      toast.error(err.message);
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <div>
      <Navbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          {/* Email */}
          <input
  type="text"
  className="w-full px-4 py-2 border rounded-lg"
  placeholder="email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email",
    },
  })}
/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 chars" } })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login here
          </NavLink>
        </p>


        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Signup;
