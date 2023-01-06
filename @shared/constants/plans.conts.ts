// Enums
import { PlanMonthlyRateEnum, PlanTypeEnum } from "@core/enums";

// Types
import { PlanCardType } from "@shared/types/common-components/plan-card.type";

export const PlansConst: PlanCardType[] = [
    {
        icon: 'icon-arcade.svg',
        name: 'Arcade',
        monthlyRate: PlanMonthlyRateEnum.ARCADE,
        type: PlanTypeEnum.MONTHLY
    },
    {
        icon: 'icon-advanced.svg',
        name: 'Advance',
        monthlyRate: PlanMonthlyRateEnum.ADVANCED,
        type: PlanTypeEnum.MONTHLY
    },
    {
        icon: 'icon-pro.svg',
        name: 'Pro',
        monthlyRate: PlanMonthlyRateEnum.PRO,
        type: PlanTypeEnum.MONTHLY
    }
];
