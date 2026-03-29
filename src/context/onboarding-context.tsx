"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface Step1Data {
  websiteUrl: string;
  brandName: string;
  niche: string;
  region: string;
  language: string;
  description: string;
}

interface Step2Data {
  goals: string[];
  platforms: string[];
}

interface Step3Data {
  toneOfVoice: string;
  contentTypes: string[];
  postFrequency: string;
  brandColors: string[];
}

export interface OnboardingData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

interface OnboardingContextValue {
  data: OnboardingData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateField: <S extends keyof OnboardingData>(
    step: S,
    field: keyof OnboardingData[S],
    value: OnboardingData[S][keyof OnboardingData[S]]
  ) => void;
}

const defaultData: OnboardingData = {
  step1: {
    websiteUrl: "",
    brandName: "",
    niche: "",
    region: "",
    language: "",
    description: "",
  },
  step2: {
    goals: [],
    platforms: [],
  },
  step3: {
    toneOfVoice: "",
    contentTypes: [],
    postFrequency: "",
    brandColors: [],
  },
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateField = useCallback(
    <S extends keyof OnboardingData>(
      step: S,
      field: keyof OnboardingData[S],
      value: OnboardingData[S][keyof OnboardingData[S]]
    ) => {
      setData((prev) => ({
        ...prev,
        [step]: {
          ...prev[step],
          [field]: value,
        },
      }));
    },
    []
  );

  return (
    <OnboardingContext.Provider value={{ data, currentStep, setCurrentStep, updateField }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
