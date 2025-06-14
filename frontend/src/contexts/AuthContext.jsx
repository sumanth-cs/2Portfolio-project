import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout, login, signup } from "../api/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();
      if (response?.user) {
        console.log("Auth check: User found:", response.user.email); // Debug log
        setUser(response.user);
      } else {
        console.log("Auth check: No user found");
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

const loginUser = async (email, password) => {
  try {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    setUser(response.user);

    // Wait for user state to update before refetching
    setTimeout(async () => {
      if (window.portfolioRefetch) {
        await window.portfolioRefetch();
      }
    }, 0);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const signupUser = async (name, email, password) => {
  try {
    const response = await signup(name, email, password);
    console.log('Signup response:', response);
    localStorage.setItem('token', response.token);
    setUser(response.user);

    // Wait for user state to update before refetching
    setTimeout(async () => {
      if (window.portfolioRefetch) {
        await window.portfolioRefetch();
      }
    }, 0);

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'Signup failed');
  }
};

  const signout = async () => {
    try {
      await logout();
      console.log("Signed out successfully"); // Debug log
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login: loginUser, signup: signupUser, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
