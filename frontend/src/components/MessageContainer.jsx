import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import { IoArrowBack } from "react-icons/io5";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    useEffect(() => {
        return () => dispatch(setSelectedUser(null));
    }, [dispatch]);

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='w-full md:min-w-[550px] flex flex-col h-full relative'>
                        
                        <div className='flex gap-2 sm:gap-3 items-center bg-white/10 backdrop-blur-md text-white px-3 sm:px-4 py-3 border-b border-white/10'>
                            
                            <button
                                onClick={() => dispatch(setSelectedUser(null))}
                                className='md:hidden mr-1 text-white text-xl'
                            >
                                <IoArrowBack />
                            </button>

                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-9 sm:w-10 rounded-full ring ring-white/20 ring-offset-base-100 ring-offset-2'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>

                            <div className='flex flex-col min-w-0'>
                                <p className='font-bold text-xs sm:text-sm truncate'>{selectedUser?.fullName}</p>
                                <p className='text-[9px] sm:text-[10px] opacity-70'>
                                    {isOnline ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>

                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='w-full md:min-w-[550px] flex flex-col justify-center items-center backdrop-blur-sm bg-black/10 px-4 text-center'>
                        <div className='text-4xl sm:text-5xl mb-3'>💬</div>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold'>
                            Hi, {authUser?.fullName}
                        </h1>
                        <p className='text-base sm:text-xl md:text-2xl text-white/80 mt-2'>
                            Select a chat to start messaging
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer