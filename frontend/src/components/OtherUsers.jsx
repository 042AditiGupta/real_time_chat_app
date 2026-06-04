import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const OtherUsers = ({ filteredUsers }) => {
    // Call the hook to fetch online contacts
    useGetOtherUsers();

    if (!filteredUsers || filteredUsers.length === 0) {
        return (
            // 🌟 UPDATED: Refined text colors and weights to look less muddy against the background surfaces
            <div className="text-slate-400 dark:text-zinc-500 text-center mt-12 text-xs sm:text-sm font-medium px-4">
                <p className="text-xl sm:text-2xl mb-2">🔍</p>
                No users found
            </div>
        );
    }

    return (
        // 🌟 UPDATED: Tweaked scrolling behaviors and vertical padding for dynamic sidebar comfort
        <div className="flex flex-col gap-1 overflow-y-auto py-1 custom-scrollbar">
            {filteredUsers.map((user) => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;