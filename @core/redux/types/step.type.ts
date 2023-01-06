import { StepEnum } from "@core/enums";

export interface StepType {
  id: StepEnum;
  description: string;
  page: string;
  isActive?: boolean;
  enabled?: boolean;
}
