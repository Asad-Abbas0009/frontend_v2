// import './App.css';
// import Navbar from './Components/Navbar';
// import { UserProvider } from "./UserContext";
// import Login from './Components/Login';
// import SignUp from './Components/Signup';
// import { Route, Routes } from 'react-router-dom';
// import LandingPage from './Pages/LandingPage';
// import StudentDashboard from './Pages/StudentDashboard';
// import TeacherDashboard from './Pages/TeacherDashboard';
// import Assignments from './Components/Assignment';
// // import StudentPatientRegistration from './Components/StudentPatientRegistration';
// import TeacherHome from './Components/TeacherHome';
// import StudentHome from './Components/StudentHome';
// import TeacherCaseLibrary from './Components/TeacherCaseLibrary';
// import Chatbot from './Components/Chatbot';
// // import Patient from './Components/PatientRegistration';
// // import Report from './Components/Reports';
// import { useState, useEffect } from 'react';
// import ImageComparison from './Components/ImageComparison';
// import CaseReview from './Components/CaseReview'

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check login status on app load
//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     setIsLoggedIn(!!user); // Set true if user exists in localStorage
//   }, []);

//   // Handle login
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   // Handle logout
  
//   const handleLogout = () => {
//     localStorage.removeItem('user'); // Clear user data
//     setIsLoggedIn(false); // Update state
// };


//   return (
//     <UserProvider>
//     <div>
//       {/* Navbar with dynamic props */}
//       <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//       <Routes>
//         <Route path='/login' element={<Login onLogin={handleLogin} />} />
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/student-dashboard/*' element={<StudentDashboard />} >
//           <Route path='home' element={<StudentHome />} />
//           <Route path="assignments" element={<Assignments studentName={localStorage.getItem("studentName")} />}/>
//           <Route path='patient' element={<ImageComparison/>} />
//           <Route path='report' element={<Chatbot />} />
//         </Route>
//         <Route path='/teacher-dashboard/*' element={<TeacherDashboard />}>
//           <Route path='home' element={<TeacherHome />} />
//           <Route path='case-library' element={<TeacherCaseLibrary />} />
//           {/* <Route path='patient' element={<Patient />} /> */}
//           <Route path='report' element={<CaseReview />} />
//         </Route>
//       </Routes>
//     </div>
//     </UserProvider>
//   );
// }

// export default App;
import './App.css';
import Navbar from './Components/Navbar';
import { UserProvider } from "./UserContext";
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import StudentDashboard from './Pages/StudentDashboard';
import TeacherDashboard from './Pages/TeacherDashboard';
import Assignments from './Components/Assignment';
// import StudentPatientRegistration from './Components/StudentPatientRegistration';
import TeacherHome from './Components/TeacherHome';
import StudentHome from './Components/StudentHome';
import TeacherCaseLibrary from './Components/TeacherCaseLibrary';
import Chatbot from './Components/Chatbot';
// import Patient from './Components/PatientRegistration';
// import Report from './Components/Reports';
import { useState, useEffect } from 'react';
import ImageComparison from './Components/ImageComparison';
import CaseReview from './Components/CaseReview'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'
import PatientRegistration from './Pages/Protocols/PatientRegistration'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on app load
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Set true if user exists in localStorage
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout
  
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setIsLoggedIn(false); // Update state
};


  return (
    <UserProvider>
    <div>
      {/* Navbar with dynamic props */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/student-dashboard/*' element={<StudentDashboard />} >
          <Route path='home' element={<StudentHome />} />
          <Route path="courses/ongoing" element={<Assignments studentName={localStorage.getItem("studentName")} />}/>
          <Route path='patient' element={<ImageComparison/>} />
          <Route path='report' element={<Chatbot />} />
          {/* Protocol Routes inside Courses */}
          <Route path="protocols/patient-registration" element={<PatientRegistration />} />
          <Route path="protocols/patient-preparation" element={<PatientPreparation />} />
          <Route path="protocols/consent-form" element={<ConsentForm />} />
          <Route path="protocols/patient-positioning" element={<PatientPositioning />} />
          <Route path="protocols/image-acquisition" element={<ImageAcquisition />} />
          <Route path="protocols/post-counselling" element={<PostCounselling />} />
          <Route path="protocols/image-reporting" element={<ImageReporting />} />
        </Route>
        <Route path='/teacher-dashboard/*' element={<TeacherDashboard />}>
          <Route path='home' element={<TeacherHome />} />
          <Route path='case-library' element={<TeacherCaseLibrary />} />
          {/* <Route path='patient' element={<Patient />} /> */}
          <Route path='report' element={<CaseReview />} />
        </Route>
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
