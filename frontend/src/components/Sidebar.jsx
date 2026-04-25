import React, { useState, useEffect } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!search.trim()) {
            setFilteredUsers(otherUsers || []);
        } else {
            const filtered = otherUsers?.filter((user) =>
                user.fullName.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(filtered || []);
        }
    }, [search, otherUsers]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full border-r border-zinc-300 dark:border-white/10 p-3 sm:p-4 flex flex-col h-full bg-white/40 dark:bg-black/20 backdrop-blur-xl">

            <div className="mb-3 sm:mb-4 text-center">
                <h1 className="text-black dark:text-white text-lg sm:text-xl font-bold">
                    Connectly
                </h1>
                <p className="text-zinc-600 dark:text-white/60 text-xs sm:text-sm">
                    Connect instantly
                </p>
            </div>

            <div className="relative flex items-center mb-3 sm:mb-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white dark:bg-slate-800/60 border border-zinc-300 dark:border-white/20 text-black dark:text-white text-sm sm:text-base rounded-full block w-full pl-9 sm:pl-10 p-2 sm:p-2.5 focus:ring-sky-500 focus:border-sky-500 placeholder-zinc-500 dark:placeholder-slate-400 outline-none transition-all"
                    type="text"
                    placeholder="Search contacts..."
                />

                <BiSearchAlt2 className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 dark:text-slate-400" />
            </div>

            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2">
                <OtherUsers filteredUsers={filteredUsers} />
            </div>

            <div className="mt-auto pt-3 sm:pt-4 border-t border-zinc-300 dark:border-white/10">
                <button
                    onClick={logoutHandler}
                    className="w-full sm:w-auto text-white bg-zinc-800 hover:bg-zinc-700 dark:bg-white/10 dark:hover:bg-white/20 transition-all text-xs sm:text-sm px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;