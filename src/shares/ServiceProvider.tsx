"use client";

import { createContext, useContext, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores"; // adjust path to your store

interface ServiceContextType {
  dispatch: AppDispatch;
}

export const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
}

export function ServiceProvider({ children }: ServiceProviderProps) {
  const dispatch = useDispatch();

  return (
    <ServiceContext.Provider value={{ dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
