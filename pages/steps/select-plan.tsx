// Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";

// Redux
import { changeSelectedStep, setPlan, setStatusStep, StepState, StepStore, updatePlanType } from "@core/redux";

// Enums
import { PlanTypeEnum, StepEnum } from "@core/enums";

// CSS
import CommonStyle from '../../styles/common.module.sass';
import SelectPlanStyle from '../../styles/pages/select-plan.module.sass';

// Types
import { PlanCardType, StepHeaderPropsType } from "@shared/types";

// Common Components
import { PlanCard, StepHeader } from "@shared/common-components";

// Constants
import { PlansConst } from "@shared/constants";

export default function SelectPlan(): JSX.Element {
    const dispatch = useDispatch();
    const { planInfo, nextStep } = useSelector((state: StepState) => state.step.currentStepSetup);

    const [plans, setPlans] = useState(PlansConst);
    const [toggle, setToggle] = useState(planInfo?.type === PlanTypeEnum.YEARLY);

    const header: StepHeaderPropsType = {
        headerText:'Select Plan',
        description:'You have the option of monthly or yearly billing.'
    };

    useEffect(() => {
        const planStep = StepStore.getState()
            .step.stepList.find(i => i.id === StepEnum.SELECT_PLAN);

        if (planStep) {
            dispatch(changeSelectedStep(planStep));
        }

        const _nextStep = StepStore.getState().step.currentStepSetup.nextStep;

        dispatch(setStatusStep({ status: true, step: _nextStep?.id }));
    }, [])

    const onClickPlanCard = (plan: PlanCardType) => {
        dispatch(setPlan({ ...plan,  type: toggle ? PlanTypeEnum.YEARLY: PlanTypeEnum.MONTHLY}));
    }

    const handleChange = () =>{
        setToggle(!toggle);

        dispatch(updatePlanType(!toggle ? PlanTypeEnum.YEARLY: PlanTypeEnum.MONTHLY));
      }
    

    return <>
     <div className={`${CommonStyle.stepContainer} ${SelectPlanStyle.selectPlan}`}>
        <StepHeader { ...header }>
        </StepHeader>

        <>
            <div className="row">
                {
                    plans.map((plan, index) => {
                        return  (
                        <div className="col-md-4" key={index} onClick={() => onClickPlanCard(plan)}>
                            <PlanCard { ...{
                                    ...plan, 
                                    active: plan.name === planInfo?.name,
                                    type: planInfo?.type || plan.type
                                    } }></PlanCard>
                        </div>
                        )
                    })
                }
            </div>   
        </>
        <br />
        <br />

        <div className={SelectPlanStyle.toggleContainer}>
            <div className="container row">
                <div className="col-md-5"><h6 className={`${CommonStyle.floatRight} ${toggle ? SelectPlanStyle.enactive : ''}`}>Monthly </h6></div>
                <div className="col-md-2">
                    <Switch onChange={handleChange} checkedIcon={false} uncheckedIcon={false} checked={toggle} offColor={'#214374'} onColor="#214374"/>
                </div>
                <div className="col-md-5"><h6 className={`${CommonStyle.floatLeft} ${!toggle ? SelectPlanStyle.enactive : ''}`}>Yearly</h6></div>  
            </div>
        </div>
     </div>
    </>
}