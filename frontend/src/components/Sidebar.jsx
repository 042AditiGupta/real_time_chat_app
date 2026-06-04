import React, { useState, useEffect } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';

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
            const res = await axios.get('/api/v1/user/logout');
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages([]));
            dispatch(setOtherUsers([]));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.error(error);
        }
    };

    return (
       
        <div className="w-full p-3 sm:p-4 flex flex-col h-full bg-white dark:bg-zinc-900 transition-colors duration-300">

           
            <div className="mb-4 sm:mb-5 text-left px-1">
                <h1 className="text-slate-900 dark:text-zinc-50 text-xl sm:text-2xl font-black tracking-tight">
                    Connectly
                </h1>
                <p className="text-slate-500 dark:text-zinc-400 text-xs font-medium">
                    Connect instantly
                </p>
            </div>

            
            <div className="relative flex items-center mb-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-slate-100 dark:bg-zinc-800/80 border border-transparent focus:border-sky-500 text-slate-800 dark:text-zinc-100 text-sm rounded-full block w-full pl-9 sm:pl-10 p-2.5 placeholder-slate-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 shadow-inner"
                    type="text"
                    placeholder="Search contacts..."
                />
                <BiSearchAlt2 className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-zinc-500" />
            </div>

            
            <div className="flex-1 overflow-y-auto pr-1">
                <OtherUsers filteredUsers={filteredUsers} />
            </div>

           
            <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-100 dark:border-zinc-800/60">
                <button
                    onClick={logoutHandler}
                    className="w-full text-center text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 font-semibold transition-all duration-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;