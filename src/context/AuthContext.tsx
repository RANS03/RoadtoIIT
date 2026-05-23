"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  email: string;
  isGoogleUser: boolean;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if session exists in local storage
    try {
      const session = localStorage.getItem("roadtoiit_session");
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (e) {
      console.error("Error reading auth session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  // Helper delay to mimic server response
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Sign up
  const signup = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await delay(1200);

    try {
      const normalizedEmail = email.toLowerCase().trim();

      // Retrieve existing users
      const usersStr = localStorage.getItem("roadtoiit_users") || "[]";
      const users = JSON.parse(usersStr);

      // Check if user exists
      const userExists = users.some((u: any) => u.email === normalizedEmail);
      if (userExists) {
        setError("An account with this email address already exists.");
        setLoading(false);
        return false;
      }

      // Add new user
      const newUser = { email: normalizedEmail, password };
      users.push(newUser);
      localStorage.setItem("roadtoiit_users", JSON.stringify(users));

      // Log the user in directly
      const sessionUser: User = {
        email: normalizedEmail,
        isGoogleUser: false,
        name: normalizedEmail.split("@")[0],
      };
      localStorage.setItem("roadtoiit_session", JSON.stringify(sessionUser));
      setUser(sessionUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Failed to register. Please try again.");
      setLoading(false);
      return false;
    }
  };

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await delay(1000);

    try {
      const normalizedEmail = email.toLowerCase().trim();

      // Retrieve existing users
      const usersStr = localStorage.getItem("roadtoiit_users") || "[]";
      const users = JSON.parse(usersStr);

      // Check credentials
      const foundUser = users.find(
        (u: any) => u.email === normalizedEmail && u.password === password
      );

      if (!foundUser) {
        setError("Invalid email credentials or password.");
        setLoading(false);
        return false;
      }

      // Log in
      const sessionUser: User = {
        email: normalizedEmail,
        isGoogleUser: false,
        name: normalizedEmail.split("@")[0],
      };
      localStorage.setItem("roadtoiit_session", JSON.stringify(sessionUser));
      setUser(sessionUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      setLoading(false);
      return false;
    }
  };

  // Google Sign-In
  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await delay(1500); // Simulate Google OAuth page dialogue transition delay

    try {
      const googleUser: User = {
        email: "classified.operative@gmail.com",
        isGoogleUser: true,
        name: "Classified Operative",
        avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=operative",
      };

      localStorage.setItem("roadtoiit_session", JSON.stringify(googleUser));
      setUser(googleUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Google authentication process was interrupted.");
      setLoading(false);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    await delay(500);
    localStorage.removeItem("roadtoiit_session");
    setUser(null);
    setLoading(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        loginWithGoogle,
        logout,
        clearError,
      }}
    >
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
