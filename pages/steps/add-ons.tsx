// Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { AddOnsType, changeSelectedStep, setStatusStep, StepState, StepStore } from "@core/redux";

// Enums
import { StepEnum } from "@core/enums";

// CSS
import CommonStyle from '../../styles/common.module.sass';

// Types
import { StepHeaderPropsType } from "@shared/types";

// Common Components
import { AddOnsCard, StepHeader } from "@shared/common-components";

export default function AddOns(): JSX.Element {

    const dispatch = useDispatch();
    const {
        currentStepSetup: {
            addOns,
            nextStep
        }
    } = useSelector((state: StepState) => state.step);

    const [addOnsList, setAddOnsList] = useState<AddOnsType[]>([]);

    const header: StepHeaderPropsType = {
        headerText:'Pick add-ons',
        description:'Add-ons help enhance your gaming experience.'
    };

    useEffect(() => {
        const yourInfoStep = StepStore.getState()
            .step.stepList.find(i => i.id === StepEnum.ADD_ONS);

        if (yourInfoStep) {
            dispatch(changeSelectedStep(yourInfoStep));
        }

    }, []);

    useEffect(() => {
        setAddOnsList(addOns);
        dispatch(setStatusStep({ status: addOns.some(i => i.selected), step: nextStep?.id }));
    }, [addOns]);

    return <>
        <div className={`${CommonStyle.stepContainer}`}>
            <StepHeader { ...header }>
            </StepHeader>


            {
                addOnsList.map((_addOns, index) => {
                    return (<AddOnsCard key={index} { ..._addOns }></AddOnsCard>)
                })
            }

        </div>
    </>
}