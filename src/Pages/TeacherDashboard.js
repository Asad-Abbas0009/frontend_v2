// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';

// const TeacherDashboard = () => {
//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <div className="bg-gray-800 text-white w-64 flex flex-col">
//                 <div className="p-4 text-2xl font-bold text-center border-b border-gray-600">
//                     Teacher Dashboard
//                 </div>
//                 <nav className="flex-grow">
//                     <ul className="flex flex-col p-4 space-y-4">
//                         <li>
//                             <Link to="/teacher-dashboard/home" className="hover:text-blue-400">
//                                 Home
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/teacher-dashboard/case-library" className="hover:text-blue-400">
//                                 Case Library
//                             </Link>
//                         </li>
//                         {/* <li>
//                             <Link to="/teacher-dashboard/patient" className="hover:text-blue-400">
//                                 Progress
//                             </Link>
//                         </li> */}
//                         <li>
//                             <Link to="/teacher-dashboard/report" className="hover:text-blue-400">
//                                 Report
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>

//             {/* Content Area */}
//             <div className="flex-grow bg-gray-100">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default TeacherDashboard;
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBell, FaCog, FaUser } from 'react-icons/fa';

const TeacherDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-200">
            {/* Sidebar */}
            <div className="bg-gradient-to-b from-teal-500 to-purple-600 text-white w-64 flex flex-col">
                {/* Profile Section */}
                <div className="p-6 text-center border-b border-gray-400">
                    <div className="flex flex-col items-center">
                        <FaUser className="text-white text-4xl mb-2" />
                        <p className="text-lg font-semibold">Welcome</p>
                        <p className="text-sm text-yellow-300">@Teacher</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-grow mt-4">
                    <ul className="flex flex-col p-4 space-y-4">
                        <li>
                            <Link to="/teacher-dashboard/home" className="flex items-center space-x-2 hover:text-gray-300">
                                📋 Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher-dashboard/case-library" className="flex items-center space-x-2 hover:text-gray-300">
                                📚 Case Library
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher-dashboard/report" className="flex items-center space-x-2 hover:text-gray-300">
                                📊 Report
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-grow bg-white">
                {/* Top Navbar */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
                    <h2 className="text-lg font-semibold">User Dashboard</h2>
                    <div className="flex space-x-4">
                        <FaBell className="cursor-pointer hover:text-gray-200" />
                        <FaCog className="cursor-pointer hover:text-gray-200" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
