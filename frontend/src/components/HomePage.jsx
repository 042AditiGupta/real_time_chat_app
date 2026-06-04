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
    
    <div className="h-screen w-full p-2 sm:p-4 bg-slate-100 dark:bg-zinc-950 transition-all duration-300">

    
      <div className="mx-auto flex h-full max-w-6xl rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 transition-all duration-300">

        
        <div
          className={`${selectedUser ? 'hidden' : 'flex'} 
          w-full md:flex md:w-[35%] lg:w-[30%] border-r border-slate-200 dark:border-zinc-800/80`}
        >
          <Sidebar />
        </div>

       
        <div
          className={`${selectedUser ? 'flex' : 'hidden'} 
          w-full md:flex md:w-[65%] lg:w-[70%] bg-slate-50/50 dark:bg-zinc-900/30`}
        >
          <MessageContainer />
        </div>

      </div>
    </div>
  );
};

export default HomePage;