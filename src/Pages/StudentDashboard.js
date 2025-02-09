

// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { FaBell, FaCog, FaUser } from 'react-icons/fa';

// const StudentDashboard = () => {
//     return (
//         <div className="flex min-h-screen bg-gray-200">
//             {/* Sidebar */}
//             <div className="bg-gradient-to-b from-teal-500 to-purple-600 text-white w-64 flex flex-col">
//                 {/* Profile Section */}
//                 <div className="p-6 text-center border-b border-gray-400">
//                     <div className="flex flex-col items-center">
//                         <FaUser className="text-white text-4xl mb-2" />
//                         <p className="text-lg font-semibold">Welcome</p>
//                         <p className="text-sm text-yellow-300">@Student</p>
//                     </div>
//                 </div>

//                 {/* Navigation Menu */}
//                 <nav className="flex-grow mt-4">
//                     <ul className="flex flex-col p-4 space-y-4">
//                         <li>
//                             <Link to="/student-dashboard/home" className="flex items-center space-x-2 hover:text-gray-300">
//                                 📋 Dashboard
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/assignments" className="flex items-center space-x-2 hover:text-gray-300">
//                                 📚 Assignments
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/patient" className="flex items-center space-x-2 hover:text-gray-300">
//                                 🖼️ Image Comparison
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/report" className="flex items-center space-x-2 hover:text-gray-300">
//                                 🤖 AI ChatBot
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>

//             {/* Main Content Area */}
//             <div className="flex flex-col flex-grow bg-white">
//                 {/* Top Navbar */}
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
//                     <h2 className="text-lg font-semibold">User Dashboard</h2>
//                     <div className="flex space-x-4">
//                         <FaBell className="cursor-pointer hover:text-gray-200" />
//                         <FaCog className="cursor-pointer hover:text-gray-200" />
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;
// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { FaBell, FaCog, FaUser } from 'react-icons/fa';

// const StudentDashboard = () => {
//     return (
//         <div className="flex min-h-screen bg-gray-200">
//             {/* Sidebar */}
//             <div className="bg-gradient-to-b from-teal-500 to-purple-600 text-white w-64 flex flex-col">
//                 {/* Profile Section */}
//                 <div className="p-6 text-center border-b border-gray-400">
//                     <div className="flex flex-col items-center">
//                         <FaUser className="text-white text-4xl mb-2" />
//                         <p className="text-lg font-semibold">Welcome</p>
//                         <p className="text-sm text-yellow-300">@Student</p>
//                     </div>
//                 </div>

//                 {/* Navigation Menu */}
//                 <nav className="flex-grow mt-4">
//                     <ul className="flex flex-col p-4 space-y-4">
//                         <li>
//                             <Link to="/student-dashboard/home" className="flex items-center space-x-2 hover:text-gray-300">
//                                 📋 Dashboard
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/courses" className="flex items-center space-x-2 hover:text-gray-300">
//                                 📚 Courses
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/patient" className="flex items-center space-x-2 hover:text-gray-300">
//                                 🖼️ Formus
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/report" className="flex items-center space-x-2 hover:text-gray-300">
//                                 🤖 Account
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/student-dashboard/report" className="flex items-center space-x-2 hover:text-gray-300">
//                                 🤖 Messages
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>

//             {/* Main Content Area */}
//             <div className="flex flex-col flex-grow bg-white">
//                 {/* Top Navbar */}
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
//                     <h2 className="text-lg font-semibold">User Dashboard</h2>
//                     <div className="flex space-x-4">
//                         <FaBell className="cursor-pointer hover:text-gray-200" />
//                         <FaCog className="cursor-pointer hover:text-gray-200" />
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;


import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBell, FaCog, FaUser, FaChevronDown, FaChevronUp, FaBook } from 'react-icons/fa';

const StudentDashboard = () => {
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isProtocolsOpen, setIsProtocolsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-200">
            {/* Sidebar */}
            <div className="bg-gradient-to-b from-teal-500 to-purple-600 text-white w-64 flex flex-col">
                {/* Profile Section */}
                <div className="p-6 text-center border-b border-gray-400">
                    <div className="flex flex-col items-center">
                        <FaUser className="text-white text-4xl mb-2" />
                        <p className="text-lg font-semibold">Welcome</p>
                        <p className="text-sm text-yellow-300">@Student</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-grow mt-4">
                    <ul className="flex flex-col p-4 space-y-4">
                        <li>
                            <Link to="/student-dashboard/home" className="flex items-center space-x-2 hover:text-gray-300">
                                📋 Dashboard
                            </Link>
                        </li>

                        {/* Courses - Expandable */}
                        <li>
                            <button
                                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                                className="w-full flex items-center justify-between hover:text-gray-300"
                            >
                                <div className="flex items-center space-x-2">
                                    <FaBook />
                                    <span>Courses</span>
                                </div>
                                {isCoursesOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </button>

                            {isCoursesOpen && (
                                <ul className="ml-4 mt-2 space-y-2">
                                    <li>
                                        <Link to="/student-dashboard/courses/ongoing" className="block hover:text-gray-300">
                                            📘 Ongoing Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student-dashboard/courses/completed" className="block hover:text-gray-300">
                                            ✅ Completed Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setIsProtocolsOpen(!isProtocolsOpen)}
                                            className="w-full flex items-center justify-between hover:text-gray-300"
                                        >
                                            📋 Select Protocols
                                            {isProtocolsOpen ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>

                                        {isProtocolsOpen && (
                                            <ul className="ml-4 mt-2 space-y-2 border-l-2 border-white pl-4">
                                                <li><Link to="/student-dashboard/protocols/patient-registration" className="block hover:text-gray-300">📝 Patient Registration</Link></li>
                                                <li><Link to="/student-dashboard/protocols/patient-preparation" className="block hover:text-gray-300">🛠 Patient Preparation</Link></li>
                                                <li><Link to="/student-dashboard/protocols/consent-form" className="block hover:text-gray-300">📄 Precounselling & Consent</Link></li>
                                                <li><Link to="/student-dashboard/protocols/patient-positioning" className="block hover:text-gray-300">📌 Patient Positioning</Link></li>
                                                
                                                <li><Link to="/student-dashboard/protocols/image-acquisition" className="block hover:text-gray-300">📷 Image Acquisition</Link></li>
                                                
                                                <li><Link to="/student-dashboard/protocols/post-counselling" className="block hover:text-gray-300">💬 Post Counselling</Link></li>
                                                <li><Link to="/student-dashboard/protocols/image-reporting" className="block hover:text-gray-300">📊 Image Reporting</Link></li>
                                                
                                                <li><Link to="/student-dashboard/protocols/image-analysis" className="block hover:text-gray-300">🔍 Image Analysis</Link></li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <Link to="/student-dashboard/forums" className="flex items-center space-x-2 hover:text-gray-300">
                                🖼️ Forums
                            </Link>
                        </li>
                        <li>
                            <Link to="/student-dashboard/account" className="flex items-center space-x-2 hover:text-gray-300">
                                🤖 Account
                            </Link>
                        </li>
                        <li>
                            <Link to="/student-dashboard/messages" className="flex items-center space-x-2 hover:text-gray-300">
                                📩 Messages
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
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
