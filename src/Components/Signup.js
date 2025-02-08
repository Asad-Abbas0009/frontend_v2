
import React, { useState } from 'react';
import axios from 'axios';
// import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const apiUrl = process.env.REACT_APP_API_URL; // ✅ Use environment variable

const SignUp = () => {
    const [role, setRole] = useState('teacher'); // Default role
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        // ✅ Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/signup`, {
                username: formData.username,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role,
            });

            setMessage(response.data.message);
            setFormData({ username: '', name: '', email: '', password: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left-side Image Section */}
            <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/sign-up-img.jpg')" }}></div>

            {/* Right-side Signup Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    
                    {/* Role Toggle */}
                    <div className="flex justify-center mb-6">
                        <button className={`w-1/2 py-2 text-lg font-bold ${role === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-lg transition`}
                            onClick={() => setRole('teacher')}>
                            Faculty
                        </button>
                        <button className={`w-1/2 py-2 text-lg font-bold ${role === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-lg transition`}
                            onClick={() => setRole('student')}>
                            Student
                        </button>
                    </div>

                    {/* Signup Form */}
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                        Register for ONE Simulation
                    </h2>
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="name">Full Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>

                        {/* Username */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold text-left" htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>

                        {/* Register Button */}
                        <button type="submit" className="w-full py-2 font-bold text-white rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 transition">
                            Register
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-4 text-gray-600 text-center">
                        Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
