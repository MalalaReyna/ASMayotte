"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WizardFormData } from "@/types/wizardTypes";
import { defaultWizardFormData, WizardSchemaType } from "@/validations/wizard/wizardSchema";

type WizardState = {
  data: WizardSchemaType;
  currentStep: number;
  setData: (data: WizardSchemaType) => void;
  setCurrentStep: (step: number) => void;
  clearData: () => void;
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      data: defaultWizardFormData,
      currentStep: 1,
      setData: (data) => set({ data }),
      setCurrentStep: (step) => set({ currentStep: step }),
      clearData: () => set({ data: defaultWizardFormData, currentStep: 1 }),
    }),
    {
      name: "wizard-form-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);