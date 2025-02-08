
import React, { useEffect, useState } from 'react';
import UserDetails from './UserDetails';
// import RecentActivity from './RecentActivity';

const TeacherHome = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            {user ? (
                <>
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mb-8">
                        <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
                            Welcome, {user.name}!
                        </h1>
                        <UserDetails user={user} />
                    </div>

                    {/* <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                        <RecentActivity />
                    </div> */}
                </>
            ) : (
                <div className="text-center bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
                    <p className="text-gray-700">No user information available. Please log in.</p>
                </div>
            )}
        </div>
    );
};

export default TeacherHome;
