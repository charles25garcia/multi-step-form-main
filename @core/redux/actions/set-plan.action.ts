// Dependencies
import { PayloadAction } from "@reduxjs/toolkit";

// Types
import { PlanInfoType, StepStateType } from "..";

export const setPlanAction = (
  state: StepStateType,
  action: PayloadAction<PlanInfoType>
) => {
  state.currentStepSetup.planInfo = action.payload;
};
