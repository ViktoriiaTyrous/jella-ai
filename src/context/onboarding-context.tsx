"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface OnboardingData {
  websiteUrl: string;
  brandName: string;
  niche: string;
  region: string;
  language: string;
  description: string;
}

const initialData: OnboardingData = {
  websiteUrl: "",
  brandName: "",
  niche: "",
  region: "",
  language: "",
  description: "",
};

type Action =
  | { type: "UPDATE_FIELD"; field: keyof OnboardingData; value: string }
  | { type: "RESET" };

function reducer(state: OnboardingData, action: Action): OnboardingData {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialData;
    default:
      return state;
  }
}

const OnboardingContext = createContext<{
  data: OnboardingData;
  updateField: (field: keyof OnboardingData, value: string) => void;
  reset: () => void;
} | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, initialData);

  const updateField = (field: keyof OnboardingData, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const reset = () => dispatch({ type: "RESET" });

  return (
    <OnboardingContext.Provider value={{ data, updateField, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
