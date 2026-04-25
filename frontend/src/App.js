import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';
import { BASE_URL } from '.';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (!authUser) {
      dispatch(setSocket(null));
      return;
    }

    const socketio = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    return () => {
      socketio.off("getOnlineUsers");
      socketio.disconnect();
      dispatch(setSocket(null));
    };
  }, [authUser, dispatch]);

  return (
    <div className="relative p-4 h-screen flex items-center justify-center bg-white text-black dark:bg-zinc-900 dark:text-white">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white shadow-md font-semibold"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;