import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

// Initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  deleteUser: () => {},
  updateUserData: () => {},
  loading: false,
});

// Context provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setUsersData(data);
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  // Function to update a user's data
  const updateUserData = (updatedUsers) => {
    setUsersData(updatedUsers);
  };

  // Function to delete a user by ID
  const deleteUser = (userId) => {
    setUsersData((prevUsersData) => prevUsersData.filter((user) => user.id !== userId));
  };

  const contextValue = useMemo(
    () => ({
      usersData,
      setUsersData,
      updateUserData,
      deleteUser,
      loading,
    }),
    [usersData, loading]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// Consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
