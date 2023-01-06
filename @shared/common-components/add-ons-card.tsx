// Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Types
import { AddOnsType, changeActiveAddOns, StepState } from "@core/redux";

// Sass
import AddOnsCardStyle from '../../styles/common-components/add-ons-card.module.sass';

// Enums
import { PlanTypeEnum } from "@core/enums";


export function AddOnsCard({ name, description, monthlyRate, selected }: AddOnsType): JSX.Element {

    const [rate, setRate] = useState<number>(0);
    const [isSelected, setIsSelected] = useState(selected || false);
    const dispatch = useDispatch();

    const {
        planInfo
    } = useSelector((state: StepState ) => state.step.currentStepSetup);

    useEffect(() => {
        setRate(monthlyRate * (planInfo?.type === PlanTypeEnum.MONTHLY ? 1: 10));
    }, [planInfo]);

    const onClickAddOnsCard = (active: boolean) => {
        dispatch(changeActiveAddOns({ active, addOnsName: name}));
    }

    useEffect(() => {
        setIsSelected(selected || false)
    }, [selected])

    
    return <>
        <div onClick={() => onClickAddOnsCard(!selected)} className={`row ${AddOnsCardStyle.addOnsCard} ${ selected ? AddOnsCardStyle.active : ''}`}>
            <div className="col-md-1">
                <input type="checkbox" checked={isSelected} onChange={() => onClickAddOnsCard(!selected)} />
            </div>
            <div className={`col-md-9 ${AddOnsCardStyle.textContainer}`}>
                <h5 className={AddOnsCardStyle.cardTitle}>{name}</h5>
                <label>{description}</label>
            </div>
            <div className={`col-md-2 ${AddOnsCardStyle.rateContainer}`}>
                +${rate}/{planInfo?.type === PlanTypeEnum.MONTHLY ? 'mo' : 'yr'}
            </div>
        </div>
    </>
}