import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const OtherUsers = ({ filteredUsers }) => {
    useGetOtherUsers();

    if (!filteredUsers || filteredUsers.length === 0) {
        return (
            <div className="text-slate-300 text-center mt-8 sm:mt-10 text-sm sm:text-base opacity-50 px-2">
                No users found
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-1 overflow-auto'>
            {
                filteredUsers.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            }
        </div>
    );
};

export default OtherUsers;