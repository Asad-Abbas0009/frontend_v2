
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import casesData from '../data/cases.json'; // Import the JSON file
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TeacherCaseLibrary() {
  const [students, setStudents] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState({}); // Store assigned students for each case
  const [activeScenario, setActiveScenario] = useState(null); // Track the active scenario title
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchStudents = async () => {
    try {
      console.log("Fetching students from:", `${apiUrl}/api/students`);
      
      const response = await axios.get(`${apiUrl}/api/students`); // ✅ Use environment variable
      
      const studentOptions = response.data.map((student) => ({
        value: student.id,
        label: student.name,
      }));
  
      setStudents(studentOptions);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students. Please try again.");
    }
  };

  // Handle assigning students to a case
  const handleStudentSelection = (caseKey, selectedOptions) => {
    setAssignedStudents((prevState) => ({
      ...prevState,
      [caseKey]: selectedOptions.map((option) => option.label),
    }));
  };

  // Handle the Assign button click
  const handleAssignCase = async (caseKey, caseDetails) => {
    const selectedStudents = assignedStudents[caseKey] || [];
    if (selectedStudents.length === 0) {
      toast.error('Please assign at least one student before assigning the case.');
      return;
    }

    const payload = {
      caseKey,
      title: caseDetails.title,
      scenarios: caseDetails.scenarios,
      questions: caseDetails.questions,
      assignedStudents: selectedStudents,
    };

    try {
      // Debugging: Log payload before making the API call
      console.log('Assign Case Payload:', payload);

      // Example API call to assign data
      await axios.post('http://localhost:5000/api/assign-case', payload);
      toast.success(`Case "${caseKey}" successfully assigned to students.`);
      // if (ws && ws.readyState === WebSocket.OPEN) {
      //   ws.send(JSON.stringify(payload));
      // }

    } catch (error) {
      console.error('Error assigning case:', error);
      toast.error('Failed to assign case. Please try again.');
    }
  };

  // Custom styles for the react-select dropdown
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: '30px',
      fontSize: '14px',
      border: '1px solid #ddd',
      boxShadow: 'none',
      backgroundColor: '#f9f9f9',
      ':hover': {
        borderColor: '#ccc',
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      marginTop: '2px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '2px 8px',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#aaa',
      fontSize: '14px',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#e6f7ff',
      color: '#007bff',
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: '12px',
      color: '#007bff',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#007bff',
      ':hover': {
        backgroundColor: '#d1e9ff',
        color: '#0056b3',
      },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-50 to-blue-100 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Teacher Case Library
      </h1>

      {casesData && casesData.length > 0 ? (
        casesData.map((caseItem, caseIndex) => {
          const caseKey = Object.keys(caseItem)[0]; // e.g., "case1", "case2"
          const caseDetails = caseItem[caseKey]; // Scenarios and questions of the case

          // Debugging: Log each case's details
          console.log('Case Key:', caseKey);
          console.log('Case Details:', caseDetails);

          return (
            <div
              key={caseIndex}
              className="bg-white shadow-lg rounded-lg border border-gray-300 p-4 mb-6"
            >
              <h2 className="text-lg font-bold text-gray-700 mb-4">{`Case ${caseIndex + 1}`}</h2>

              {/* Render Scenarios */}
              {caseDetails.scenarios?.map((scenario, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow rounded-lg border border-gray-200 p-3 mb-4 cursor-pointer"
                  onClick={() => setActiveScenario(scenario.title)}
                >
                  <h3 className="text-sm font-semibold text-gray-800">{scenario.id}</h3>
                </div>
              )) || <p>No scenarios available for this case.</p>}

              {/* Show Active Scenario Title */}
              {activeScenario && (
                <div className="bg-blue-100 text-blue-800 p-3 mb-4 rounded">
                  <p className="text-sm font-medium">Active Scenario: {activeScenario}</p>
                </div>
              )}

              {/* Render Questions */}
              <div className="bg-gray-50 shadow rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-bold text-gray-800 mb-4">Questions</h3>
                {caseDetails.questions?.map((question, qIndex) => (
                  <div key={qIndex} className="mb-4">
                    <p className="text-sm font-medium text-gray-700">{`Q${qIndex + 1}: ${question.text}`}</p>
                    <ul className="list-disc pl-5 mt-2">
                      {question.options?.map((option, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          <input type="checkbox" className="mr-2" /> {option}
                        </li>
                      )) || <p>No options available for this question.</p>}
                    </ul>
                  </div>
                )) || <p>No questions available for this case.</p>}
              </div>

              {/* Assign Students */}
              <div className="mt-4">
                <Select
                  isMulti
                  options={students}
                  onFocus={fetchStudents}
                  onChange={(selectedOptions) =>
                    handleStudentSelection(caseKey, selectedOptions)
                  }
                  placeholder="Assign students"
                  styles={customSelectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>

              {/* Assign Button */}
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => handleAssignCase(caseKey, caseDetails)}
              >
                Assign Case
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600">No cases available to display.</p>
      )}
    </div>
  );
}

export default TeacherCaseLibrary;
