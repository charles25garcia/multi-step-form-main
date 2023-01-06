// Types
import {  StepStateType, } from "..";

export const setNextStepAction = (state: StepStateType) => {
  const {
    currentStepSetup: { activeStep },
    stepList,
  } = state;

  const activeStepIndex = stepList.findIndex((i) => i.id === activeStep.id);

  const nextStep = stepList[activeStepIndex + 1] || activeStep;

  state.currentStepSetup.activeStep = nextStep;
  state.currentStepSetup.previousStep = activeStep;

  // Update active step in stepList
  state.stepList.forEach((i) => {
    i.isActive = i.id === nextStep.id;
  });
};
