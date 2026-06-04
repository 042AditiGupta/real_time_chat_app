import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    const isSelected = selectedUser?._id === user?._id;

    return (
        // 🌟 REMOVED: Replaced fragment/divider architecture with smooth spacing and crisp margins
        <div
            onClick={() => selectedUserHandler(user)}
            className={`flex gap-3 items-center rounded-xl px-3 py-2.5 my-0.5 cursor-pointer border transition-all duration-200 select-none
                ${
                    isSelected
                        ? 'bg-sky-500 text-white border-transparent shadow-md shadow-sky-500/20 font-semibold scale-[1.01]'
                        : 'text-slate-700 dark:text-zinc-200 border-transparent hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                }
            `}
        >
            {/* User Profile Avatar with Online Ring indicator */}
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className={`w-10 sm:w-11 rounded-full transition-transform duration-200 ${isSelected ? 'scale-95 ring-2 ring-white' : ''}`}>
                    <img src={user?.profilePhoto} alt="user-profile" />
                </div>
            </div>

            {/* User name information block */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-sm sm:text-base truncate font-medium tracking-tight">
                        {user?.fullName}
                    </p>
                    {isOnline && !isSelected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse"></span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtherUser;