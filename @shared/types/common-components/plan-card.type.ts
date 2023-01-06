import { PlanInfoType } from "@core/redux";

export interface PlanCardType extends PlanInfoType {
  icon: string;
  active?: boolean;
}
