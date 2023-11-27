import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState('patient'); // Initialize with a default role
  const [loggedInUserName, setLoggedInUserName] = useState('Akhil'); // Initialize with a default role
  const [allSessionsData, setAllSessionsData] = useState([]); // Initialize with a default role

  const setLoggedInUserType = (type) => {
    setUserType(type);
  };

  return (
    <AuthContext.Provider value={{ userType, setLoggedInUserType, loggedInUserName, setLoggedInUserName, setAllSessionsData, allSessionsData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};