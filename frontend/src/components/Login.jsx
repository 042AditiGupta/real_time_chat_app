import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/v1/user/login', user);

      toast.success("Login Successful");
      dispatch(setAuthUser(res.data));
      navigate("/");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }

    setUser({
      username: "",
      password: ""
    });
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">

      <div className="w-full p-4 sm:p-6 rounded-2xl shadow-xl bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white">
          Login
        </h1>

        <form onSubmit={onSubmitHandler}>

          <div>
            <label className="label p-2">
              <span className="text-sm sm:text-base text-black dark:text-white font-medium">
                Username
              </span>
            </label>

            <input
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full input input-bordered h-10 text-sm sm:text-base bg-white text-black"
              type="text"
              placeholder="Username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-sm sm:text-base text-black dark:text-white font-medium">
                Password
              </span>
            </label>

            <input
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full input input-bordered h-10 text-sm sm:text-base bg-white text-black"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          <p className="text-center my-2 text-sm sm:text-base text-black dark:text-white">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-semibold"
            >
              Signup
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm sm:btn-md mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;