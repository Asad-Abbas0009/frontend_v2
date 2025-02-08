//   // Use environment variable for backend URL
//   // const apiUrl = process.env.REACT_APP_API_URL;

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const response = await axios.post(`${apiUrl}/api/login`, {
//   //       email,
//   //       password,
//   //       role: activeRole,
//   //     });

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useUser } from '../UserContext'; // Import the custom hook from UserContext


// const apiUrl = process.env.REACT_APP_API_URL;
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [activeRole, setActiveRole] = useState('teacher');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useUser(); // Get the login function from UserContext

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('${apiUrl}/api/login', {
//         email,
//         password,
//         role: activeRole,
//       });

//       // Use UserContext to log in the user
//       const userData = {
//         name: response.data.user.name,
//         email: response.data.user.email,
//         role: activeRole,
//         token: response.data.user.token, // Assume the API returns a token
//       };
//       login(userData); // Save user data to context

//       // Redirect to the appropriate dashboard
//       if (activeRole === 'teacher') {
//         navigate('/teacher-dashboard/home');
//       } else {
//         navigate('/student-dashboard/home');
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//          style={{ backgroundImage: "url('/background.jpg')" }}>  
//       <div className="absolute inset-0 bg-white bg-opacity-50"></div>

//       <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
//         {/* Logo */}
//         {/* <div className="absolute top-5 left-5">
//           <img src="/logo.png" alt="ONE Simulation" className="w-24" />
//         </div> */}

//         {/* Welcome Message */}
//         <h1 className="text-3xl font-bold text-gray-800">
//           Welcome To The <span className="text-blue-500">ONE</span> Simulation
//         </h1>

//         {/* Role Selection Buttons */}
//         <div className="flex justify-center mt-6 mb-4">
//           <button
//             className={`w-1/2 py-2 text-lg font-bold ${
//               activeRole === 'student' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
//             } rounded-l-lg transition`}
//             onClick={() => setActiveRole('student')}
//           >
//             Student
//           </button>
//           <button
//             className={`w-1/2 py-2 text-lg font-bold ${
//               activeRole === 'teacher' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
//             } rounded-r-lg transition`}
//             onClick={() => setActiveRole('teacher')}
//           >
//             Faculty
//           </button>
//         </div>

//         {/* Form */}
//         <h2 className="text-lg font-semibold text-gray-700">Welcome Back!</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="email">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="password">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 font-bold text-white rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Register Link */}
//         <p className="mt-4 text-gray-600">
//           Don't have an account? <a href="/register" className="text-blue-500 font-semibold">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext"; // Import UserContext for login state

const apiUrl = process.env.REACT_APP_API_URL; // Backend API URL from .env file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState("teacher");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // Get login function from UserContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error before new request

    try {
      const response = await axios.post(
        `${apiUrl}/api/login`, // ✅ Fixed API URL interpolation
        {
          email,
          password,
          role: activeRole,
        },
        {
          headers: { "Content-Type": "application/json" }, // Ensure JSON format
          withCredentials: true, // Include credentials if needed
        }
      );

      // Handle successful login
      const userData = {
        name: response.data.user.name,
        email: response.data.user.email,
        role: activeRole,
        token: response.data.user.token, // Assuming API returns a token
      };

      login(userData); // Save user data to context
      localStorage.setItem("authToken", response.data.token); 

      // Redirect based on role
      if (activeRole === "teacher") {
        navigate("/teacher-dashboard/home");
      } else {
        navigate("/student-dashboard/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      // style={{ backgroundImage: "url('/background.jpg')" }} // ✅ Fixed background image path
    >
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome To The <span className="text-blue-500">ONE</span> Simulation
        </h1>

        {/* Role Selection Buttons */}
        <div className="flex justify-center mt-6 mb-4">
          <button
            className={`w-1/2 py-2 text-lg font-bold ${
              activeRole === "student"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-l-lg transition`}
            onClick={() => setActiveRole("student")}
          >
            Student
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-bold ${
              activeRole === "teacher"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-r-lg transition`}
            onClick={() => setActiveRole("teacher")}
          >
            Faculty
          </button>
        </div>

        {/* Form */}
        <h2 className="text-lg font-semibold text-gray-700">Welcome Back!</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold text-left"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold text-left"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-bold text-white rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
