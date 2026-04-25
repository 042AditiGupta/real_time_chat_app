import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
]);

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

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
    if (authUser) {
      socketRef.current = io(BASE_URL, {
        query: {
          userId: authUser._id
        }
      });

      socketRef.current.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketRef.current.close();
      };
    }
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