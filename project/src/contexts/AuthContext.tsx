/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../service/api";

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  departmentId: number;
  schoolId: number;
  phoneNumber?: string;
  employeeId?: string;
  currentRank?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on app load
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("suza_token");
      if (token) {
        // Verify token by fetching user profile
        const userProfile = await apiClient.getUserProfile(
          Number(localStorage.getItem("suza_user_id"))
        );
        setUser(userProfile);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("suza_token");
      localStorage.removeItem("suza_user_id");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);

      if (!response || !response.userId || !response.role) {
        throw new Error("Invalid login response");
      }
      localStorage.setItem("suza_user_id", response.userId.toString());
      localStorage.setItem("suza_user_role", response.role);
      localStorage.setItem("suza_user_name", response.fullName);

      // Optionally: fetch full user profile using ID & role
      const userProfile = await apiClient.getUserProfile(response.userId);
      setUser(userProfile);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };


  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("suza_token");
      localStorage.removeItem("suza_user_id");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
