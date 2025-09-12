const appUrl = import.meta.env.VITE_APP_URL;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react'
const Login = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${appUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // keep session cookie
      });

      if (res.ok) {
        let result = await res.json();
        console.log(result);
        toast.success(`Welcome ${result.username}`);
        setIsLoggedIn(result);
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath) // redirect on success
      } else {
        const error = await res.json();
        // setErrorMessage(error.message || "Invalid credentials");
        toast.error(error.message || "Invalid credentials");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  <div className="flex flex-col items-center justify-center">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        {/* Dont Have Accout : Sign up */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Register here
          </NavLink>
        </p>


      </form>

      {errorMessage && (
        <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
      )}
    </div>
  </div>
  <Footer />
    </>
  );
};

export default Login;
