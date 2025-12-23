"use client";

import { createContext, useContext, useState, useEffect } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState("founder"); // 'founder' | 'affiliate'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("proovd-role");
    const storedAuth = localStorage.getItem("proovd-auth");

    if (storedRole) setRole(storedRole);
    if (storedAuth === "true") setIsAuthenticated(true);
  }, []);

  // Update local storage when state changes
  useEffect(() => {
    localStorage.setItem("proovd-role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("proovd-auth", isAuthenticated.toString());
  }, [isAuthenticated]);

  const toggleRole = () => {
    setRole((prev) => (prev === "founder" ? "affiliate" : "founder"));
  };

  const login = (passcode) => {
    if (passcode === "777") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <RoleContext.Provider
      value={{ role, setRole, toggleRole, isAuthenticated, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
