import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  return (
    <div className="h-screen w-full p-2 sm:p-4">
      <div className="mx-auto flex h-full max-w-6xl rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        
        
        <div className={`${selectedUser ? 'hidden' : 'flex'} w-full md:flex md:w-[35%] lg:w-[30%]`}>
          <Sidebar />
        </div>

        
        <div className={`${selectedUser ? 'flex' : 'hidden'} w-full md:flex md:w-[65%] lg:w-[70%]`}>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;