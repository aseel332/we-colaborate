import {  useContext, createContext } from "react";
import { apiRequest } from "../../api";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const login = async (email, password) => {
    // Simulate an API call
    if (email === "") {
      throw new Error("Email is required");
    } if (password === "") { 
      throw new Error("Password is required");
    } 
    const token = await apiRequest('/api/auth/login', 'POST', { email, password });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("email", JSON.stringify(email));
    return token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    // Back to login page
    window.location.href = "/login";
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const register = async (name, email, password) => {
    // Simulate an API call
    if (name === "") {
      throw new Error("Name is required");
    } if (email === "") {
      throw new Error("Email is required");
    } if (password === "") { 
      throw new Error("Password is required");
    } 
    const token = await apiRequest('/api/auth/signup', 'POST', { name, email, password });
    localStorage.setItem("token", JSON.stringify(token) );
    localStorage.setItem("email", JSON.stringify(email));
    return token;
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, register }}>
      {children}
    </AuthContext.Provider>
  );
}