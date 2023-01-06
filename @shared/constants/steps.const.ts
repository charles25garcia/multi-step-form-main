import { StepEnum } from "@core/enums";
import { StepType } from "@core/redux";

export const StepsConst: StepType[] = [
  {
    id: StepEnum.YOUR_INFO,
    description: "YOUR INFO",
    page: "your-info",
    isActive: true,
    enabled: true,
  },
  {
    id: StepEnum.SELECT_PLAN,
    page: "select-plan",
    description: "SELECT PLAN",
  },
  {
    id: StepEnum.ADD_ONS,
    page: "add-ons",
    description: "ADD-ONS",
  },
  {
    id: StepEnum.SUMMARY,
    page: "summary",
    description: "SUMMARY",
  },
];
