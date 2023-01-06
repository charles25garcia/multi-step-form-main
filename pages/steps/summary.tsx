// Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// Redux
import { changeSelectedStep, StepState, StepStore } from "@core/redux";

// Enums
import { PlanTypeEnum, StepEnum } from "@core/enums";

// Sass
import CommonStyle from '../../styles/common.module.sass';
import SummaryStyle from '../../styles/pages/summary.module.sass';

// Types
import { StepHeaderPropsType } from "@shared/types";

// Common Components
import { StepHeader } from "@shared/common-components";

export default function Summary(): JSX.Element {

    const dispatch = useDispatch();
    const {
        planInfo,
        addOns
    } = useSelector((state: StepState) => state.step.currentStepSetup);

    const header: StepHeaderPropsType = {
        headerText:'Finishing up',
        description:'Double-check everything looks OK before confirming.'
    };

    const [multiplier, setMultiplier] = useState(0);
    const [totalAddOns, setTotalAddOns] = useState(0);

    const [shortTermText, setShortTermText] = useState('');
    const [termText, setTermText] = useState('');
    const [normalTermText, setNormalTermText] = useState('');

    const rateWithMultiplier = (rate: number) => {
        return rate * multiplier;
    }

    useEffect(() => {
        const yourInfoStep = StepStore.getState()
            .step.stepList.find(i => i.id === StepEnum.SUMMARY);

        if (yourInfoStep) {
            dispatch(changeSelectedStep(yourInfoStep));
        }

        setMultiplier(planInfo?.type === PlanTypeEnum.MONTHLY ? 1 : 10);

        if (planInfo?.type === PlanTypeEnum.MONTHLY) {
            setShortTermText('mo');
            setTermText('Monthly');
            setNormalTermText('month');
        } else {
            setShortTermText('yr');
            setTermText('Yearly');
            setNormalTermText('year');
        }

        const ratesOfSelectedAddOns = addOns.filter(i => i.selected).map(i => i.monthlyRate);

        if (ratesOfSelectedAddOns.length > 0) {
            setTotalAddOns(ratesOfSelectedAddOns.reduce((a, b) => a + b));
        }
        
    }, [])

    return <>
        <div className={`${CommonStyle.stepContainer} ${SummaryStyle.summary}`}>
            <StepHeader { ...header }>
            </StepHeader>


            <div className={`container ${SummaryStyle.info}`}>
                <div className={`row ${SummaryStyle.header}`}>
                    <div className="col-md-6">
                        <h6>{planInfo?.name} ({termText})</h6>
                        <Link href="/steps/select-plan">
                           Change
                        </Link>
                    </div>
                    <div className={`col-md-6 ${SummaryStyle.headerRate}`}>
                        <h6>
                            ${rateWithMultiplier(planInfo?.monthlyRate || 0)}/{shortTermText}
                        </h6>
                    </div>
                </div>
                <div className={`${SummaryStyle.body}`}>
                    {
                        addOns.filter(i => i.selected).map((data, index) => {
                            return ( 
                                <div key={index} className="row">
                                    <div className="col-md-6">
                                        <h6 className={SummaryStyle.colorGray}>{data.name}</h6>
                                    </div>
                                    <div  className="col-md-6">
                                        <h6 className={`${SummaryStyle.addOnsRate} ${CommonStyle.floatRight}`}>+${rateWithMultiplier(data.monthlyRate)}/{shortTermText}</h6>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
            <div className={`row ${SummaryStyle.totalContainer}`}>
                <div className="col-md-6">
                    <h6 className={SummaryStyle.colorGray}>Total (per {normalTermText})</h6>
                </div>
                <div className={`col-md-6 ${SummaryStyle.totalRate}`}>
                    <h6 className={CommonStyle.floatRight}>+${rateWithMultiplier((planInfo?.monthlyRate || 0)) + rateWithMultiplier(totalAddOns)}/{shortTermText}</h6>
                </div>
            </div>
        </div>
    </>
}