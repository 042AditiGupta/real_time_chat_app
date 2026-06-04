import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { IoArrowBack } from "react-icons/io5";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  return (
    <>
      {selectedUser !== null ? (
        // 🌟 UPDATED: Removed transparency so it doesn't leak underlying background image colors in light mode
        <div className="w-full md:min-w-[550px] flex flex-col h-full relative bg-slate-50/50 dark:bg-zinc-900/30 transition-colors duration-300">
          
          {/* 🌟 UPDATED: Styled the header banner into a premium, distinct pane layer */}
          <div className="flex gap-2 sm:gap-3 items-center bg-white dark:bg-zinc-900/90 backdrop-blur-md text-slate-800 dark:text-zinc-100 px-3 sm:px-4 py-3 border-b border-slate-200 dark:border-zinc-800/80 shadow-sm">
            <button
              onClick={() => dispatch(setSelectedUser(null))}
              className="md:hidden mr-1 text-slate-800 dark:text-zinc-100 text-xl hover:opacity-70 transition-opacity"
            >
              <IoArrowBack />
            </button>

            {/* Avatar status indicator ring */}
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-9 sm:w-10 rounded-full ring ring-slate-200 dark:ring-zinc-700 ring-offset-base-100 ring-offset-2">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="font-bold text-xs sm:text-sm truncate text-slate-900 dark:text-zinc-50">
                {selectedUser?.fullName}
              </p>

              {/* Online/Offline status tag */}
              <p className={`text-[10px] font-semibold ${isOnline ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500"}`}>
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>

          {/* Input Box Footer */}
          <div className="shrink-0">
            <SendInput />
          </div>
        </div>
      ) : (
        // 🌟 UPDATED: Styled empty chat landing screen to match the premium, minimalistic palette
        <div className="w-full md:min-w-[550px] flex flex-col justify-center items-center bg-white dark:bg-zinc-900/40 px-4 text-center transition-colors duration-300">
          <div className="text-4xl sm:text-5xl mb-4 animate-bounce">💬</div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-zinc-50 font-black tracking-tight">
            Hi, {authUser?.fullName}
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 font-medium mt-2 max-w-sm">
            Select a contact from the sidebar panel to start messaging instantly.
          </p>
        </div>
      )}
    </>
  );
};

export default MessageContainer;