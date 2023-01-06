// Dependencies
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { changeSelectedStep, PersonalInfoType, setPersonalInfo, StepState, StepStore } from "@core/redux";

// Enums
import { StepEnum } from "@core/enums";

// CSS
import YourInfoStyle from '../../styles/pages/your-info.module.sass';
import CommonStyle from '../../styles/common.module.sass';

// Common Components
import { StepHeader } from "@shared/common-components";

// Types
import { StepHeaderPropsType } from "@shared/types";


export default function YourInfo(): JSX.Element {
    const dispatch = useDispatch();
    const { personalInfo } = useSelector((state: StepState) => state.step.currentStepSetup);

    const [ personalInfoData, setPersonalInfoData ] = useState(
        personalInfo || {
        name: '',
        email: '',
        phoneNumber: ''
    });

    const header: StepHeaderPropsType = {
        headerText:'Personal Info',
        description:'Please provide your name, email address, and phone number.'
    };


    useEffect(() => {
        const yourInfoStep = StepStore.getState()
            .step.stepList.find(i => i.id === StepEnum.YOUR_INFO);

        if (yourInfoStep) {
            dispatch(changeSelectedStep(yourInfoStep));
        }
    }, [])

    const onNameChange = (e: any) => {
        const inputValue = e.target.value;
        setPersonalInfoData({
            ...personalInfoData,
            name: inputValue.trim() === '' ? '' : inputValue
        });

        dispatch(setPersonalInfo(personalInfoData));
    } 

    const onEmailChange = (e: any) => {
        const inputValue = e.target.value;

        setPersonalInfoData({
            ...personalInfoData,
            email: inputValue.trim() === '' ? '' : inputValue
        });

        dispatch(setPersonalInfo(personalInfoData));

    } 

    const onPhoneNumberChange = (e: any) => {
        const inputValue = e.target.value;
        setPersonalInfoData({
            ...personalInfoData,
            phoneNumber: inputValue.trim() === '' ? '' : inputValue
        });

        dispatch(setPersonalInfo(personalInfoData));
    } 

    return <>
        <div className={`${YourInfoStyle.yourInfoContainer} ${CommonStyle.stepContainer}`}>
            <StepHeader { ...header }>
            </StepHeader>

            <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input required onChange={onNameChange} onBlur={onNameChange} value={personalInfoData.name} type="text" placeholder="e.g. Stephen King" className="form-control" id="exampleInputName" aria-describedby="nameHelp"/>
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="exampleInputEmail">Email Address</label>
                <input required onChange={onEmailChange} onBlur={onEmailChange} value={personalInfoData.email} type="email" placeholder="e.g. stephenking@lorem.com" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"/>
            </div>

            <br />

            <div className="form-group">
                <label htmlFor="exampleInputPhoneNumber">Phone Number</label>
                <input required onChange={onPhoneNumberChange} onBlur={onPhoneNumberChange} value={personalInfoData.phoneNumber} type="number" placeholder="e.g. +1 234 567 890" className="form-control" id="exampleInputPhoneNumber" aria-describedby="phoneNumberHelp"/>
            </div>
        </div>
    </>
}