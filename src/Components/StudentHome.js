
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaTasks,
  FaChartBar,
  FaEnvelope,
  FaUserCircle,
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL; // Backend API URL from .env file
const StudentHome = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    availableCourses: 0,
    assignedCourses: 0,
    amendments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Student Details from LocalStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setStudentDetails(storedUser);
      } else {
        setStudentDetails(null);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      setStudentDetails(null);
    }
  }, []);

useEffect(() => {
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/dashboard-stats`); // Use dynamic API URL
      setDashboardStats(response.data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardStats();
}, []);

  // useEffect(() => {
  //   const fetchDashboardStats = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get("http://localhost:5000/api/dashboard-stats");
  //       setDashboardStats(response.data);
  //     } catch (err) {
  //       console.error("Error fetching dashboard stats:", err);
  //       setError("Failed to load dashboard statistics.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardStats();
  // }, []);

  return (
    <div className="min-h-screen w-[100%] flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 overflow-hidden">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-lg p-8 h-full w-full max-w-5xl transition transform">
        {studentDetails ? (
          <div className="text-center">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
              <FaUserCircle className="text-indigo-600 text-7xl mb-4 drop-shadow-lg" />
              <h1 className="text-4xl font-bold text-gray-800">{`Welcome, ${studentDetails.name}!`}</h1>
              <p className="text-lg text-gray-600 mt-1">{`Role: ${studentDetails.role}`}</p>
            </div>

            {/* Course Statistics Section */}
            {loading ? (
              <p className="text-center text-gray-700">Loading dashboard statistics...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="stat-card bg-green-500">
                  <FaClipboardList className="stat-icon" />
                  <h3 className="text-white text-lg font-semibold">Available Courses</h3>
                  <p className="text-white text-3xl font-bold">{dashboardStats.availableCourses}</p>
                </div>

                <div className="stat-card bg-yellow-500">
                  <FaExclamationTriangle className="stat-icon" />
                  <h3 className="text-white text-lg font-semibold">Assigned Courses</h3>
                  <p className="text-white text-3xl font-bold">{dashboardStats.assignedCourses}</p>
                </div>

                <div className="stat-card bg-red-500">
                  <FaCheckCircle className="stat-icon" />
                  <h3 className="text-white text-lg font-semibold">Amendments</h3>
                  <p className="text-white text-3xl font-bold">{dashboardStats.amendments}</p>
                </div>
              </div>
            )}

            {/* Quick Action Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <Link to="/student-dashboard/courses" className="dashboard-card hover:scale-105 transition transform">
                <FaBook className="icon" />
                <span>My Courses</span>
              </Link>

              <Link to="/student-dashboard/courses/ongoing" className="dashboard-card hover:scale-105 transition transform">
                <FaTasks className="icon" />
                <span>Assignments</span>
              </Link>

              <Link to="/student-dashboard/report" className="dashboard-card hover:scale-105 transition transform">
                <FaChartBar className="icon" />
                <span>Reports</span>
              </Link>

              <Link to="/student-dashboard/messages" className="dashboard-card hover:scale-105 transition transform">
                <FaEnvelope className="icon" />
                <span>Messages</span>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Access Denied. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default StudentHome;
