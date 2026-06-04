import Signup from "./components/Signup";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import { BASE_URL } from ".";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    // Sync theme with both HTML classes/attributes for clean Tailwind support
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (!authUser?._id) {
      dispatch(setSocket(null));
      return;
    }

    const socketio = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      transports: ["websocket"],
      withCredentials: true,
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
  
    <div className="relative p-2 sm:p-4 h-screen w-screen flex items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 transition-all duration-300 ease-in-out">
      
      
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-white text-slate-800 dark:bg-zinc-900 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 font-medium text-xs sm:text-sm"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;