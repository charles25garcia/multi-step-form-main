// Dependencies
import { PayloadAction } from "@reduxjs/toolkit";

// Enums
import { StepEnum } from "@core/enums";

// Types
import { StepStateType } from "..";

// Utils
import { setStepStatus } from "@shared/utils";

/**
 *
 * @param state
 * @param action
 */
export const setStatusStepAction = (
  state: StepStateType,
  {
    payload: { status, step },
  }: PayloadAction<{ status: boolean; step?: StepEnum }>
) => {
  const {
    stepList,
    currentStepSetup: { nextStep },
  } = state;

  setStepStatus(state, status, step);

  if (nextStep) {
    nextStep.enabled = status; // nextStep?.id === step;
  }
};
