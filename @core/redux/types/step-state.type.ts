// Types
import { AddOnsType, PersonalInfoType, PlanInfoType, StepType } from "..";

export interface StepStateType {
  stepList: StepType[];
  currentStepSetup: {
    activeStep: StepType;
    nextStep?: StepType;
    previousStep?: StepType;
    personalInfo?: PersonalInfoType;
    planInfo?: PlanInfoType;
    addOns: AddOnsType[];
  };
}
