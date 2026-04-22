import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (
      !user.fullName ||
      !user.username ||
      !user.password ||
      !user.confirmPassword ||
      !user.gender
    ) {
      return toast.error("Please fill all fields");
    }

    if (user.password !== user.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Registered Successfully!");

        // Clear form
        setUser({
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
          gender: "",
        });

        // Redirect after 1 sec
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log("FULL ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
      <div className="w-full p-4 sm:p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">

        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler}>

          <div>
            <label className="label p-2">
              <span className="text-sm sm:text-base label-text">
                Full Name
              </span>
            </label>

            <input
              value={user.fullName}
              onChange={(e) =>
                setUser({ ...user, fullName: e.target.value })
              }
              className="w-full input input-bordered h-10 text-sm sm:text-base"
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-sm sm:text-base label-text">
                Username
              </span>
            </label>

            <input
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full input input-bordered h-10 text-sm sm:text-base"
              type="text"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-sm sm:text-base label-text">
                Password
              </span>
            </label>

            <input
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full input input-bordered h-10 text-sm sm:text-base"
              type="password"
              placeholder="Password"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-sm sm:text-base label-text">
                Confirm Password
              </span>
            </label>

            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10 text-sm sm:text-base"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 my-4">

            <div className="flex items-center">
              <p className="text-sm sm:text-base">male</p>

              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2"
              />
            </div>

            <div className="flex items-center">
              <p className="text-sm sm:text-base">female</p>

              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2"
              />
            </div>

          </div>

          <p className="text-center my-2 text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm sm:btn-md mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;