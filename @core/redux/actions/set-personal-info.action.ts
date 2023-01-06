// Dependencies
import { PayloadAction } from "@reduxjs/toolkit";

// Types
import { PersonalInfoType, StepStateType, StepType } from "..";

// Utils
import { enableNextStepOfPersonalInfo } from "@shared/utils";

export const setPersonalInfoAction = (
  state: StepStateType,
  action: PayloadAction<PersonalInfoType>
) => {
 
  enableNextStepOfPersonalInfo(state, action.payload);

  const newStepSetup = {
    ...state.currentStepSetup,
    personalInfo: action.payload,
  };

  state.currentStepSetup = newStepSetup;
};
