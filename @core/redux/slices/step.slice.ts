// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Types
import { StepStateType } from "../types/step-state.type";

// Constants
import { AddOnsListConts, PlansConst, StepsConst } from "@shared/constants";

// Actions
import { changeSelectedStepAction } from "../actions/change-selected-step.action";
import { setPersonalInfoAction } from "../actions/set-personal-info.action";
import { setNextStepAction } from "../actions/set-next-step.action";
import { setPlanAction } from "../actions/set-plan.action";
import { setStatusStepAction } from "../actions/set-step-status.action";
import { updatePlanTypeAction } from "../actions/update-plan-type.action";
import { changeActiveAddOnsAction } from "../actions/change-active-add-ons.action";

const initialState: StepStateType = {
  stepList: StepsConst,
  currentStepSetup: {
    activeStep: StepsConst[0],
    nextStep: StepsConst[1],
    planInfo: PlansConst[0],
    addOns: AddOnsListConts
  },
};

export const StepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    changeSelectedStep: changeSelectedStepAction,
    setPersonalInfo: setPersonalInfoAction,
    setNextStep: setNextStepAction,
    setPlan: setPlanAction,
    setStatusStep: setStatusStepAction,
    updatePlanType: updatePlanTypeAction,
    changeActiveAddOns: changeActiveAddOnsAction
  },
});

export const {
  changeSelectedStep,
  setPersonalInfo,
  setNextStep,
  setPlan,
  setStatusStep,
  updatePlanType,
  changeActiveAddOns
} = StepSlice.actions;

export default StepSlice.reducer;
