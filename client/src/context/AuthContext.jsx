import API from "@/api";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (formData) => {
    try {
      const res = await API.post("/auth/login", formData, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const res = await API.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
