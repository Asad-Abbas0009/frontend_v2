import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in a user
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
        setUser(userData);
    };

    // Function to log out a user
    const logout = () => {
        localStorage.removeItem("user"); // Clear user data from localStorage
        setUser(null);
    };

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for using the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
