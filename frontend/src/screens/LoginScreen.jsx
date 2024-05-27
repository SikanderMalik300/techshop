import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/login.svg"; // Ensure you have an SVG file in the specified path
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res })); // Assuming `res` contains the user info
      navigate(redirect);
    } catch (err) {
      console.error("Login error:", err); // Check console for more detailed error message
      toast.error(err?.data?.message || err.error || "Failed to log in");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden md:flex h-full">
        {/* Image on the right */}
        <div className="relative w-full md:w-2/5 bg-gray-200">
          <img
            src={LoginImage}
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Form on the left */}
        <div className="w-full md:w-3/5 p-8 flex items-center justify-center">
          <div className="max-w-md w-full">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
              Sign in to your account
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  Sign in
                </button>
                {isLoading && <Spinner />}
              </div>
              {/* Register Now section */}
              <div className="text-center text-sm">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Register now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
