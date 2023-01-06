// Enums
import { PlanMonthlyRateEnum, PlanTypeEnum } from "@core/enums";

export interface PlanInfoType {
  monthlyRate: PlanMonthlyRateEnum;
  type: PlanTypeEnum;
  name: string;
}
