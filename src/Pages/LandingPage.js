import React from 'react';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Student Management App
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-8">
        This platform is designed to manage CT Technician courses, enabling seamless workflows for students and teachers.
      </p>
    </div>
  );
}

export default LandingPage;
