"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CrewMember = {
  id: string;
  name: string;
  role: string | null;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

type CrewContextValue = {
  crewMembers: CrewMember[];
  addCrewMember: (payload: { name: string; role?: string | null; phone: string }) => void;
  updateCrewMember: (id: string, payload: { name?: string; role?: string | null; phone?: string }) => void;
  deleteCrewMember: (id: string) => void;
  clearAllCrew: () => void;
};

const CrewContext = createContext<CrewContextValue | null>(null);
const STORAGE_KEY = "crew_members";

export const CrewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCrewMembers(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load crew members from sessionStorage", e);
    }
  }, []);

  // Persist to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(crewMembers));
    } catch (e) {
      console.warn("Failed to save crew members to sessionStorage", e);
    }
  }, [crewMembers]);

  const addCrewMember: CrewContextValue["addCrewMember"] = ({ name, role, phone }) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    const now = new Date().toISOString();
    const newMember: CrewMember = {
      id,
      name: name.trim(),
      role: (role ?? null) || null,
      phone: phone.trim(),
      createdAt: now,
      updatedAt: now,
    };
    setCrewMembers((prev) => [...prev, newMember]);
  };

  const updateCrewMember: CrewContextValue["updateCrewMember"] = (id, payload) => {
    const now = new Date().toISOString();
    setCrewMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              name: payload.name !== undefined ? payload.name.trim() : m.name,
              role: payload.role !== undefined ? payload.role || null : m.role,
              phone: payload.phone !== undefined ? payload.phone.trim() : m.phone,
              updatedAt: now,
            }
          : m,
      ),
    );
  };

  const deleteCrewMember: CrewContextValue["deleteCrewMember"] = (id) => {
    setCrewMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const clearAllCrew = () => {
    setCrewMembers([]);
  };

  const value = useMemo(
    () => ({ crewMembers, addCrewMember, updateCrewMember, deleteCrewMember, clearAllCrew }),
    [crewMembers],
  );

  return <CrewContext.Provider value={value}>{children}</CrewContext.Provider>;
};

export const useCrew = () => {
  const ctx = useContext(CrewContext);
  if (!ctx) {
    throw new Error("useCrew must be used within a CrewProvider");
  }
  return ctx;
};

export default CrewProvider;