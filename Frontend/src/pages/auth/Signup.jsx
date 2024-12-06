import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (response.status === 200) {
        setRegistrationStatus("success");
      } else {
        setRegistrationStatus("error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setRegistrationStatus("error");
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24" style={{ backgroundImage: "url('/login_bg.png')" }}>
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-black transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        <form onSubmit={handleSignup} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-cyan-500 px-3.5 py-2.5 font-semibold leading-7 text-black"
              >
                Create Account <ArrowUpRight className="ml-2" size={16} />
              </button>
            </div>
            {registrationStatus === "success" && (
              <p className="text-green-600 text-center">
                Registration successful!
              </p>
            )}
            {registrationStatus === "error" && (
              <p className="text-red-600 text-center">
                Registration failed. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
