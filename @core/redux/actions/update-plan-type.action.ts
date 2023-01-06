// Dependencies
import { PayloadAction } from "@reduxjs/toolkit";

// Enums
import { PlanTypeEnum } from "@core/enums";

// Types
import { StepStateType } from "..";

export const updatePlanTypeAction = (
  state: StepStateType,
  action: PayloadAction<PlanTypeEnum>
) => {
  if (state.currentStepSetup.planInfo) {
    state.currentStepSetup.planInfo.type = action.payload;
  }
};
