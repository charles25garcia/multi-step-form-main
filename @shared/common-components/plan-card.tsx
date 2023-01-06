// Dependencies
import { useEffect, useState } from "react";

// Types
import { PlanTypeEnum } from "@core/enums";

// Sass
import PlanCardStyle from '../../styles/common-components/plan-card.module.sass';

// Enums
import { PlanCardType } from "@shared/types";


export function PlanCard({ icon, monthlyRate, name, type, active }: PlanCardType): JSX.Element {

    const [rate, setRate] = useState<number>(0);

    useEffect(() => {
        setRate(monthlyRate * (type === PlanTypeEnum.MONTHLY ? 1: 10));
    }, [type]);


    return <>
        <div className={`row ${PlanCardStyle.planCard} ${active ? PlanCardStyle.active : ''}`}>
            <div className={`col-md-12 ${PlanCardStyle.iconContainer}`}>
                <img src={`../${icon}`}  alt="no image" width={50}/>
            </div>
            <div className="col-md-12">
                <h6>{name}</h6>
                <h6 className={PlanCardStyle.rate}>${rate}/{type === PlanTypeEnum.MONTHLY ? 'mo' : 'yr'}</h6>
                <h6 className={PlanCardStyle.freeText}>{type === PlanTypeEnum.YEARLY ? '2 months free': ''}</h6>
            </div>
        </div>
    </>
}