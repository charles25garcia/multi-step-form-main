// Dependencies
import { PayloadAction } from "@reduxjs/toolkit";

// Types
import { StepStateType, StepType } from "..";

export const changeSelectedStepAction = (
  state: StepStateType,
  action: PayloadAction<StepType>
) => {
  const {
    currentStepSetup: { activeStep },
    stepList,
  } = state;

  state.stepList.forEach((i) => {
    i.isActive = i.id === action.payload.id;
  });

  const activeStepIndex = stepList.findIndex((i) => i.id === action.payload.id);

  const nextStep = stepList[activeStepIndex + 1] || action.payload;
  const previousStep = stepList[activeStepIndex - 1] || action.payload;

  const newStepSetup = {
    ...state.currentStepSetup,
    activeStep: { ...action.payload, isActive: true },
    previousStep,
    nextStep
  };

  state.currentStepSetup = newStepSetup;
};
