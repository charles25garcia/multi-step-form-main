// Dependencies
import { PayloadAction } from "@reduxjs/toolkit";

// Types
import { StepStateType } from "..";

export const changeActiveAddOnsAction = (
  state: StepStateType,
  action: PayloadAction<{ active: boolean; addOnsName: string }>
) => {
  const addOns = state.currentStepSetup.addOns.find(
    (i) => i.name === action.payload.addOnsName
  );

  if (addOns) {
    addOns.selected = action.payload.active;
  }
};
