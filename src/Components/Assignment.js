// import React, { useState, useEffect } from "react";
// import PatientRegistration from "./PatientRegistration";
// import Questions from "./Questions"; // Import Questions component
// import casesData from "../data/cases.json";

// const Assignments = () => {
//     const [cases, setCases] = useState([]); // Flattened cases
//     const [selectedCase, setSelectedCase] = useState(null); // Selected case for registration
//     const [showRegistration, setShowRegistration] = useState(false); // Control registration modal visibility
//     const [showQuestions, setShowQuestions] = useState(false); // Control questions modal visibility

//     // Flatten and load cases data from JSON file
//     useEffect(() => {
//         const flattenedCases = casesData.map((caseObj) => {
//             const caseKey = Object.keys(caseObj)[0];
//             const caseDetails = caseObj[caseKey];
//             return {
//                 caseId: caseKey,
//                 ...caseDetails,
//             };
//         });
//         setCases(flattenedCases);
//     }, []);

//     // Prevent background scrolling when modals are open
//     useEffect(() => {
//         if (showRegistration || showQuestions) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "auto";
//         }
//     }, [showRegistration, showQuestions]);

//     const handleRegister = (caseItem) => {
//         setSelectedCase(caseItem);
//         setShowRegistration(true);
//     };

//     const handleRegistrationComplete = () => {
//         setShowRegistration(false); // Close registration modal
//         setShowQuestions(true); // Open questions modal
//     };

//     const handleCloseQuestions = () => {
//         setShowQuestions(false); // Close questions modal
//     };

//     const handleModalClick = (e) => {
//         if (e.target === e.currentTarget) {
//             setShowRegistration(false);
//             setShowQuestions(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

//             {/* Display cases */}
//             {cases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {cases.map((caseItem) => (
//                         <div key={caseItem.caseId} className="p-6 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow">
//                             <h3 className="font-bold text-lg mb-2">{caseItem.title || "Untitled Case"}</h3>
//                             <p className="text-sm text-gray-600 mb-4">Case ID: {caseItem.caseId || "N/A"}</p>
//                             <button
//                                 className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
//                                 onClick={() => handleRegister(caseItem)}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No cases available at the moment.</p>
//             )}

//             {/* Patient Registration Modal */}
//             {showRegistration && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto">
//                         <PatientRegistration
//                             caseId={selectedCase.caseId}
//                             defaultCaseId={selectedCase.caseId} // Pass caseId as a prop
//                             onRegistrationComplete={handleRegistrationComplete}
//                             onCancel={() => setShowRegistration(false)}
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Questions Modal */}
//             {showQuestions && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto">
//                         <Questions
//                             caseId={selectedCase.caseId}
//                             questions={selectedCase.questions || []}
//                         />
//                         <div className="mt-4 text-right">
//                             <button
//                                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 onClick={handleCloseQuestions}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext"; // Import UserContext
// import axios from "axios";
// import PatientRegistration from "./PatientRegistration";
// import Questions from "./Questions";

// const Assignments = () => {
//     const { user } = useUser(); // Access user from context
//     const [cases, setCases] = useState([]); // Assigned cases for the student
//     const [selectedCase, setSelectedCase] = useState(null); // Selected case for registration
//     const [showRegistration, setShowRegistration] = useState(false); // Control registration modal visibility
//     const [showQuestions, setShowQuestions] = useState(false); // Control questions modal visibility
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     // Fetch assigned cases for the logged-in student
//     useEffect(() => {
//         if (!user || !user.name) {
//             setError("Student name is required to view assignments.");
//             setLoading(false);
//             return;
//         }

//         const fetchAssignedCases = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:5000/api/student-assignments/${user.name}`
//                 );
//                 setCases(response.data); // Set fetched cases
//             } catch (err) {
//                 console.error("Error fetching cases:", err);
//                 setError("Failed to fetch assignments. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignedCases();
//     }, [user]);

//     const handleRegister = (caseItem) => {
//         setSelectedCase(caseItem);
//         setShowRegistration(true);
//     };

//     const handleRegistrationComplete = () => {
//         setShowRegistration(false); // Close registration modal
//         setShowQuestions(true); // Open questions modal
//     };

//     const handleCloseQuestions = () => {
//         setShowQuestions(false); // Close questions modal
//     };

//     const handleModalClick = (e) => {
//         if (e.target === e.currentTarget) {
//             setShowRegistration(false);
//             setShowQuestions(false);
//         }
//     };

//     if (loading) {
//         return <p>Loading your assignments...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

//             {/* Display cases */}
//             {cases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {cases.map((caseItem) => (
//                         <div
//                             key={caseItem.caseId}
//                             className="p-6 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="font-bold text-lg mb-2">{caseItem.title || "Untitled Case"}</h3>
//                             <p className="text-sm text-gray-600 mb-4">Case ID: {caseItem.caseId || "N/A"}</p>
//                             <button
//                                 className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
//                                 onClick={() => handleRegister(caseItem)}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No cases assigned to you at the moment.</p>
//             )}

//             {/* Patient Registration Modal */}
//             {showRegistration && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto">
//                         <PatientRegistration
//                             caseId={selectedCase.caseId}
//                             defaultCaseId={selectedCase.caseId} // Pass caseId as a prop
//                             onRegistrationComplete={handleRegistrationComplete}
//                             onCancel={() => setShowRegistration(false)}
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Questions Modal */}
//             {showQuestions && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto">
//                         <Questions
//                             caseId={selectedCase.caseId}
//                             questions={selectedCase.questions || []}
//                         />
//                         <div className="mt-4 text-right">
//                             <button
//                                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 onClick={handleCloseQuestions}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Assignments;


// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext"; // Import UserContext
// import axios from "axios";
// import PatientRegistration from "./PatientRegistration";
// import Questions from "./Questions";

// const Assignments = () => {
//     const { user } = useUser(); // Access user from context
//     const [cases, setCases] = useState([]); // Assigned cases for the student
//     const [selectedCase, setSelectedCase] = useState(null); // Selected case for registration
//     const [showRegistration, setShowRegistration] = useState(false); // Control registration modal visibility
//     const [showQuestions, setShowQuestions] = useState(false); // Control questions modal visibility
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     // Fetch assigned cases for the logged-in student
//     useEffect(() => {
//         if (!user || !user.name) {
//             console.error("User name is missing in the context.", user);
//             setError("Student name is required to view assignments.");
//             setLoading(false);
//             return;
//         }

//         const fetchAssignedCases = async () => {
//             try {
//                 console.log("Fetching cases for student:", user.name);
//                 const response = await axios.get(
//                     `http://localhost:5000/api/student-assignments/${user.name}`
//                 );
//                 setCases(response.data); // Set fetched cases
//                 console.log("this is data", response.data)
//             } catch (err) {
//                 console.error("Error fetching cases:", err);
//                 setError("Failed to fetch assignments. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignedCases();
//     }, [user]);

//     const handleRegister = (caseItem) => {
//         setSelectedCase(caseItem);
//         setShowRegistration(true);
//     };

//     const handleRegistrationComplete = () => {
//         setShowRegistration(false); // Close registration modal
//         setShowQuestions(true); // Open questions modal
//     };

//     const handleCloseQuestions = () => {
//         setShowQuestions(false); // Close questions modal
//     };

//     const handleModalClick = (e) => {
//         if (e.target === e.currentTarget) {
//             setShowRegistration(false);
//             setShowQuestions(false);
//         }
//     };

//     if (loading) {
//         return <p>Loading your assignments...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

//             {/* Display cases */}
//             {cases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {cases.map((caseItem, index) => (
//                         <div
//                             key={caseItem.caseId || index} // Ensure unique key
//                             className="p-6 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="font-bold text-lg mb-2">{caseItem.title || "Untitled Case"}</h3>
//                             <p className="text-sm text-gray-600 mb-4">Case ID: {caseItem.case_id || "N/A"}</p>
//                             <button
//                                 className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
//                                 onClick={() => handleRegister(caseItem)}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No cases assigned to you at the moment.</p>
//             )}

//             {/* Patient Registration Modal */}
//             {showRegistration && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto">
//                         <PatientRegistration
//                             caseId={selectedCase.caseId}
//                             defaultCaseId={selectedCase.caseId} // Pass caseId as a prop
//                             onRegistrationComplete={handleRegistrationComplete}
//                             onCancel={() => setShowRegistration(false)}
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Questions Modal */}
//             {showQuestions && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto">
//                         <Questions
//                             caseId={selectedCase.caseId}
//                             questions={selectedCase.questions || []}
//                         />
//                         <div className="mt-4 text-right">
//                             <button
//                                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 onClick={handleCloseQuestions}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Assignments;
// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext"; // Import UserContext
// import axios from "axios";
// import PatientRegistration from "./PatientRegistration";
// import Questions from "./Questions";

// const Assignments = () => {
//     const { user } = useUser(); // Access user from context
//     const [cases, setCases] = useState([]); // Assigned cases for the student
//     const [selectedCase, setSelectedCase] = useState(null); // Selected case for registration
//     const [showRegistration, setShowRegistration] = useState(false); // Control registration modal visibility
//     const [showQuestions, setShowQuestions] = useState(false); // Control questions modal visibility
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     // Fetch assigned cases for the logged-in student
//     useEffect(() => {
//         if (!user || !user.name) {
//             console.error("User name is missing in the context.", user);
//             setError("Student name is required to view assignments.");
//             setLoading(false);
//             return;
//         }

//         const fetchAssignedCases = async () => {
//             try {
//                 console.log("Fetching cases for student:", user.name);
//                 const response = await axios.get(
//                     `http://localhost:5000/api/student-assignments/${user.name}`
//                 );
//                 setCases(response.data); // Set fetched cases
//             } catch (err) {
//                 console.error("Error fetching cases:", err);
//                 setError("Failed to fetch assignments. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignedCases();
//     }, [user]);

//     const handleRegister = (caseItem) => {
//         setSelectedCase(caseItem);
//         setShowRegistration(true);
//     };

//     const handleRegistrationComplete = () => {
//         setShowRegistration(false); // Close registration modal
//         setShowQuestions(true); // Open questions modal
//     };

//     const handleCloseQuestions = () => {
//         setShowQuestions(false); // Close questions modal
//     };

//     const handleModalClick = (e) => {
//         if (e.target === e.currentTarget) {
//             setShowRegistration(false);
//             setShowQuestions(false);
//         }
//     };

//     if (loading) {
//         return <p>Loading your assignments...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

//             {/* Display cases */}
//             {cases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {cases.map((caseItem, index) => (
//                         <div
//                             key={caseItem.caseId || index} // Ensure unique key
//                             className="p-6 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="font-bold text-lg mb-2">{caseItem.title || "Untitled Case"}</h3>
//                             <p className="text-sm text-gray-600 mb-4">Case ID: {caseItem.case_id || "N/A"}</p>
//                             <button
//                                 className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
//                                 onClick={() => handleRegister(caseItem)}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No cases assigned to you at the moment.</p>
//             )}

//             {/* Patient Registration Modal */}
//             {showRegistration && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto">
//                         <PatientRegistration
//                             caseId={selectedCase.case_id}
//                             defaultCaseId={selectedCase.case_id} // Pass caseId as a prop
//                             onRegistrationComplete={handleRegistrationComplete}
//                             onCancel={() => setShowRegistration(false)}
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Questions Modal */}
//             {showQuestions && selectedCase && (
//     <div
//         className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//         onClick={handleModalClick}
//     >
//         <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto">
//             <Questions
//                 caseId={selectedCase.case_id || "N/A"} // Ensure caseId is passed
//                 questions={Array.isArray(selectedCase?.questions) ? selectedCase.questions : []} // Ensure questions is an array
//             />
//             <div className="mt-4 text-right">
//                 <button
//                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                     onClick={handleCloseQuestions}
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     </div>
// )}

//         </div>
//     );
// };

// export default Assignments;
// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext"; // Import UserContext
// import axios from "axios";
// import PatientRegistration from "./PatientRegistration";
// import Questions from "./Questions";

// const Assignments = () => {
//     const { user } = useUser(); // Access user from context
//     const [cases, setCases] = useState([]); // Assigned cases for the student
//     const [selectedCase, setSelectedCase] = useState(null); // Selected case for registration
//     const [showRegistration, setShowRegistration] = useState(false); // Control registration modal visibility
//     const [showQuestions, setShowQuestions] = useState(false); // Control questions modal visibility
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     // Fetch assigned cases for the logged-in student
//     useEffect(() => {
//         if (!user || !user.name) {
//             console.error("User name is missing in the context.", user);
//             setError("Student name is required to view assignments.");
//             setLoading(false);
//             return;
//         }

//         const fetchAssignedCases = async () => {
//             try {
//                 console.log("Fetching cases for student:", user.name);
//                 const response = await axios.get(
//                     `http://localhost:5000/api/student-assignments/${user.name}`
//                 );
//                 const transformedCases = response.data.map((caseItem, index) => ({
//                     ...caseItem,
//                     key: `${caseItem.caseId}-${caseItem.assignedAt || index}`, // Ensure unique keys
//                 }));
//                 console.log("data come from server ", transformedCases)
//                 setCases(transformedCases); // Set fetched and transformed cases
//             } catch (err) {
//                 console.error("Error fetching cases:", err);
//                 setError("Failed to fetch assignments. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignedCases();
//     }, [user]);

//     const handleRegister = (caseItem) => {
//         setSelectedCase(caseItem);
//         setShowRegistration(true);
//     };

//     const handleRegistrationComplete = async () => {
//         console.log("Registration Complete Triggered");
//         setShowRegistration(false); // Close the registration modal
//         console.log("Closing Registration Modal");
    
//         // Open questions modal
//         setShowQuestions(true);
//         console.log("Opening Questions Modal");
//     };
    
    

//     const handleCloseQuestions = () => {
//         setShowQuestions(false); // Close questions modal
//     };

//     const handleModalClick = (e, modalType) => {
//         console.log(`Clicked Modal Overlay: ${modalType}`);
//         if (e.target === e.currentTarget) {
//             if (modalType === "registration") {
//                 console.log("Closing Registration Modal via Overlay Click");
//                 setShowRegistration(false);
//             } else if (modalType === "questions") {
//                 console.log("Closing Questions Modal via Overlay Click");
//                 setShowQuestions(false);
//             }
//         }
//     };
    
    
    

//     if (loading) {
//         return <p>Loading your assignments...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

//             {/* Display cases */}
//             {cases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {cases.map((caseItem) => (
//                         <div
//                             key={caseItem.key} // Unique key for React
//                             className="p-6 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="font-bold text-lg mb-2">{caseItem.title || "Untitled Case"}</h3>
//                             <p className="text-sm text-gray-600 mb-4">Case ID: {caseItem.caseId || "Not Assigned"}</p>
//                             <button
//                                 className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
//                                 onClick={() => handleRegister(caseItem)}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No cases assigned to you at the moment.</p>
//             )}

//             {/* Patient Registration Modal */}
//             {/* {showRegistration && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto">
//                         <PatientRegistration
//                             caseId={selectedCase.caseId}
//                             defaultCaseId={selectedCase.caseId} // Pass caseId as a prop
//                             onRegistrationComplete={handleRegistrationComplete}
//                             onCancel={() => setShowRegistration(false)}
//                         />
//                     </div>
//                 </div>
//             )} */}

//             {showRegistration && selectedCase && (
//     <div
//         className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//         onClick={(e) => handleModalClick(e, "registration")}>
//         <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto">
//             <PatientRegistration
//                 caseId={selectedCase.caseId}
//                 defaultCaseId={selectedCase.caseId} // Pass caseId as a prop
//                 onRegistrationComplete={handleRegistrationComplete}
//                 onCancel={() => setShowRegistration(false)}
//             />
//         </div>
//     </div>
// )}


//             {/* Questions Modal */}
//             {/* {showQuestions && selectedCase && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//                     onClick={handleModalClick}
//                 >
//                     <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto">
//                         <Questions
//                             caseId={selectedCase.caseId || "N/A"} // Ensure caseId is passed
//                             questions={Array.isArray(selectedCase.questions) ? selectedCase.questions : []} // Ensure questions is an array
//                         />
//                         <div className="mt-4 text-right">
//                             <button
//                                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 onClick={handleCloseQuestions}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )} */}
//             {showQuestions && selectedCase && (
//     <div
//         className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
//         onClick={(e) => handleModalClick(e, "questions")}
//     >
//         <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto">
//             <Questions
//                 caseId={selectedCase.caseId || "N/A"} // Ensure caseId is passed
//                 questions={Array.isArray(selectedCase.questions) ? selectedCase.questions : []} // Ensure questions is an array
//             />
//             <div className="mt-4 text-right">
//                 <button
//                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                     onClick={handleCloseQuestions}
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     </div>
// )}

//         </div>
//     );
// };

// export default Assignments;
import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext"; // Import UserContext
import axios from "axios";
import PatientRegistration from "./PatientRegistration";
import Questions from "./Questions";

const Assignments = () => {
    const { user } = useUser(); // Access user from context
    const [cases, setCases] = useState([]); // Assigned cases for the student
    const [selectedCase, setSelectedCase] = useState(null); // Selected case for registration
    const [showRegistration, setShowRegistration] = useState(false); // Control registration modal visibility
    const [showQuestions, setShowQuestions] = useState(false); // Control questions modal visibility
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const apiUrl = process.env.REACT_APP_API_URL; // Backend API URL from .env file

    // Fetch assigned cases for the logged-in student
    useEffect(() => {
        if (!user || !user.name) {
            console.error("User name is missing in the context.", user);
            setError("Student name is required to view assignments.");
            setLoading(false);
            return;
        }
        const fetchAssignedCases = async () => {
            try {
                console.log("Fetching cases for student:", user.name);
                const response = await axios.get(
                    `http://localhost:5000/api/student-assignments/${user.name}`
                );
                const transformedCases = response.data.map((caseItem, index) => ({
                    ...caseItem,
                    key: `${caseItem.caseId}-${caseItem.assignedAt || index}`, // Ensure unique keys
                }));
                console.log("data come from server ", transformedCases);
                setCases(transformedCases); // Set fetched and transformed cases
            } catch (err) {
                console.error("Error fetching cases:", err);
                setError("Failed to fetch assignments. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchAssignedCases();
    }, [user]);

    const handleRegister = (caseItem) => {
        setSelectedCase(caseItem);
        setShowRegistration(true);
    };

    const handleNextToQuestions = () => {
        setShowRegistration(false); // Close registration modal
        setShowQuestions(true); // Open questions modal
    };

    const handleCloseQuestions = () => {
        setShowQuestions(false); // Close questions modal
    };

    const handleModalClick = (e, modalType) => {
        if (e.target !== e.currentTarget) return; // Prevent closure if the click is inside the modal content

        console.log(`Clicked Modal Overlay: ${modalType}`);
        if (modalType === "registration") {
            console.log("Closing Registration Modal via Overlay Click");
            setShowRegistration(false);
        } else if (modalType === "questions") {
            console.log("Closing Questions Modal via Overlay Click");
            setShowQuestions(false);
        }
    };

    if (loading) {
        return <p>Loading your assignments...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>

            {/* Display cases */}
            {cases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cases.map((caseItem) => (
                        <div
                            key={caseItem.key} // Unique key for React
                            className="p-6 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-bold text-lg mb-2">{caseItem.title || "Untitled Case"}</h3>
                            <p className="text-sm text-gray-600 mb-4">Case ID: {caseItem.caseId || "Not Assigned"}</p>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
                                onClick={() => handleRegister(caseItem)}
                            >
                                Register
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No cases assigned to you at the moment.</p>
            )}

            {/* Patient Registration Modal */}
            {showRegistration && selectedCase && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
                    onClick={(e) => handleModalClick(e, "registration")}
                >
                    <div className="bg-white p-6 rounded shadow-lg modal-container max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <PatientRegistration
                            caseId={selectedCase.caseId}
                            defaultCaseId={selectedCase.caseId} // Pass caseId as a prop
                            onRegistrationComplete={handleNextToQuestions}
                            onCancel={() => setShowRegistration(false)}
                        />
                        <div className="mt-4 text-right">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-600"
                                onClick={handleNextToQuestions}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Questions Modal */}
            {showQuestions && selectedCase && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
                    onClick={(e) => handleModalClick(e, "questions")}
                >
                    <div className="bg-white p-6 rounded shadow-lg modal-container w-3/4 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <Questions
                            caseId={selectedCase.caseId || "N/A"} // Ensure caseId is passed
                            questions={Array.isArray(selectedCase.questions) ? selectedCase.questions : []} // Ensure questions is an array
                        />
                        <div className="mt-4 text-right">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={handleCloseQuestions}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
