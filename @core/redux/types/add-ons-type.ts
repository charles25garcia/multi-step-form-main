import { AddOnsMonthlyRateEnum } from "@core/enums";

export interface AddOnsType {
    name: string;
    description: string;
    monthlyRate: AddOnsMonthlyRateEnum;
    selected?: boolean;
}
