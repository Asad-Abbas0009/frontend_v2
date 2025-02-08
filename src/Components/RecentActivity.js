// import React, { useEffect, useState } from 'react';

// const RecentActivity = () => {
//   const [activities, setActivities] = useState([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [error, setError] = useState(null);
//   let reconnectAttempts = 0;
//   let socket;

//   useEffect(() => {
//     const connectWebSocket = () => {
//       socket = new WebSocket('ws://localhost:5000');

//       socket.onopen = () => {
//         console.log('Connected to WebSocket server');
//         setIsConnected(true);
//         setError(null);
//         reconnectAttempts = 0;
//       };

//       socket.onmessage = (event) => {
//         try {
//           console.log('Raw WebSocket message received:', event.data);
//           const data = JSON.parse(event.data);

//           if (data.caseKey && data.title) {
//             const newActivity = {
//               timestamp: new Date().toLocaleString(),
//               title: data.title || 'Unknown Title',
//               caseKey: data.caseKey || 'N/A',
//               assignedStudents: Array.isArray(data.assignedStudents)
//                 ? data.assignedStudents
//                 : [],
//             };

//             setActivities((prevActivities) => [newActivity, ...prevActivities]);
//             console.log('Activity added:', newActivity);
//           } else if (data.message) {
//             console.log('Informational message received:', data.message);
//           } else {
//             console.warn('Unexpected WebSocket data format:', data);
//           }
//         } catch (err) {
//           console.error('Error parsing WebSocket message:', err);
//           setError('Error processing received data.');
//         }
//       };

//       socket.onerror = (error) => {
//         console.error('WebSocket error:', error);
//         setError('Unable to connect to real-time updates.');
//       };

//       socket.onclose = () => {
//         console.warn('WebSocket disconnected');
//         setIsConnected(false);
//         if (reconnectAttempts < 5) {
//           const delay = Math.min(5000 * (reconnectAttempts + 1), 30000); // Exponential backoff
//           console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);
//           setTimeout(() => {
//             reconnectAttempts++;
//             connectWebSocket();
//           }, delay);
//         } else {
//           console.error('Max reconnection attempts reached. Please check server status.');
//         }
//       };
//     };

//     connectWebSocket();

//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     console.log('Updated activities state:', activities);
//   }, [activities]);

//   return (
//     <div className="mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>

//       {error && (
//         <div className="text-red-500 bg-red-100 p-2 rounded-md">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {!isConnected && !error && (
//         <p className="text-gray-500">Connecting to real-time updates...</p>
//       )}

//       <ul className="bg-gray-100 p-4 rounded-lg shadow-md max-h-60 overflow-y-auto">
//         {activities.length > 0 ? (
//           activities.map((activity, index) => (
//             <li key={index} className="border-b last:border-none py-2">
//               <span className="font-semibold">{activity.timestamp}</span>: 
//               📚 Assignment: <strong>{activity.title}</strong> 
//               (ID: {activity.caseKey}) assigned to {activity.assignedStudents.length > 0
//                 ? activity.assignedStudents.join(', ')
//                 : 'No students assigned'}
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No recent activities available.</p>
//         )}
//       </ul>

//       {activities.length > 0 && (
//         <button
//           className="bg-red-500 text-white px-3 py-1 rounded mt-3"
//           onClick={() => setActivities([])}
//         >
//           Clear Activities
//         </button>
//       )}
//     </div>
//   );
// };

// export default RecentActivity;
import React, { useEffect, useState, useRef } from 'react';

const RecentActivity = () => {
  const [activities, setActivities] = useState(() => {
    // Load activities from localStorage on initial render
    const savedActivities = localStorage.getItem('recentActivities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  useEffect(() => {
    const connectWebSocket = () => {
      socketRef.current = new WebSocket('ws://localhost:5000');

      socketRef.current.onopen = () => {
        console.log('Connected to WebSocket server');
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      socketRef.current.onmessage = (event) => {
        try {
          console.log('Raw WebSocket message received:', event.data);
          const data = JSON.parse(event.data);

          if (data.caseKey && data.title) {
            const newActivity = {
              timestamp: new Date().toLocaleString(),
              title: data.title || 'Unknown Title',
              caseKey: data.caseKey || 'N/A',
              assignedStudents: Array.isArray(data.assignedStudents)
                ? data.assignedStudents
                : [],
            };

            setActivities((prevActivities) => {
              const updatedActivities = [newActivity, ...prevActivities];
              localStorage.setItem('recentActivities', JSON.stringify(updatedActivities)); // Save to localStorage
              return updatedActivities;
            });
            console.log('Activity added:', newActivity);
          } else if (data.message) {
            console.log('Informational message received:', data.message);
          } else {
            console.warn('Unexpected WebSocket data format:', data);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
          setError('Error processing received data.');
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Unable to connect to real-time updates.');
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        setIsConnected(false);
        if (reconnectAttemptsRef.current < 5) {
          const delay = Math.min(5000 * (reconnectAttemptsRef.current + 1), 30000);
          setTimeout(() => {
            reconnectAttemptsRef.current++;
            connectWebSocket();
          }, delay);
        } else {
          console.error('Max reconnection attempts reached. Please check server status.');
        }
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log('Updated activities state:', activities);
  }, [activities]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>

      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!isConnected && !error && (
        <p className="text-gray-500">Connecting to real-time updates...</p>
      )}

      <ul className="bg-gray-100 p-4 rounded-lg shadow-md max-h-60 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index} className="border-b last:border-none py-2">
              <span className="font-semibold">{activity.timestamp}</span>: 
              📚 Assignment: <strong>{activity.title}</strong> 
              (ID: {activity.caseKey}) assigned to {activity.assignedStudents.length > 0
                ? activity.assignedStudents.join(', ')
                : 'No students assigned'}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No recent activities available.</p>
        )}
      </ul>

      {activities.length > 0 && (
        <button
          className="bg-red-500 text-white px-3 py-1 rounded mt-3"
          onClick={() => {
            setActivities([]);
            localStorage.removeItem('recentActivities'); // Clear localStorage
          }}
        >
          Clear Activities
        </button>
      )}
    </div>
  );
};

export default RecentActivity;