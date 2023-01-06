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

// Utils
import { isBlank, isValidEmail, isValidPhoneNumber } from "@shared/utils";


export default function YourInfo(): JSX.Element {
    const dispatch = useDispatch();
    const { personalInfo } = useSelector((state: StepState) => state.step.currentStepSetup);

    const [ personalInfoData, setPersonalInfoData ] = useState(
        personalInfo || {
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [ invalidName, setInvalidName ] = useState(false);
    const [ invalidEmail, setInvalidEmail ] = useState(false);
    const [ invalidPhoneNumber, setInvalidPhoneNumber ] = useState(false);

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

        setInvalidName(isBlank(inputValue));

        dispatch(setPersonalInfo(personalInfoData));
    } 

    const onEmailChange = (e: any) => {
        const inputValue = e.target.value;

        setInvalidEmail(!isValidEmail(inputValue));

        setPersonalInfoData({
            ...personalInfoData,
            email: inputValue.trim() === '' ? '' : inputValue
        });

        dispatch(setPersonalInfo(personalInfoData));

    } 

    const onPhoneNumberChange = (e: any) => {
        const inputValue = e.target.value;

        setInvalidPhoneNumber(isBlank(inputValue));

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
                { invalidName ? <text className={YourInfoStyle.errorText}>This field is required</text>: <text></text>}
                <input required onChange={onNameChange} onBlur={onNameChange} value={personalInfoData.name} type="text" placeholder="e.g. Stephen King" 
                className={`form-control ${invalidName? YourInfoStyle.error :''}`} id="exampleInputName" aria-describedby="nameHelp"/>
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="exampleInputEmail">Email Address</label>
                { invalidEmail ? <text className={YourInfoStyle.errorText}>Invalid Email</text>: <text></text>}
                <input required onChange={onEmailChange} onBlur={onEmailChange} value={personalInfoData.email} type="email" placeholder="e.g. stephenking@lorem.com" 
                className={`form-control ${invalidEmail? YourInfoStyle.error :''}`} id="exampleInputEmail" aria-describedby="emailHelp"/>
            </div>

            <br />

            <div className="form-group">
                <label htmlFor="exampleInputPhoneNumber">Phone Number</label>
                { invalidPhoneNumber ? <text className={YourInfoStyle.errorText}>This field is required</text>: <text></text>}
                <input required minLength={10} onChange={onPhoneNumberChange} onBlur={onPhoneNumberChange} value={personalInfoData.phoneNumber} type="number" placeholder="e.g. +1 234 567 890" 
                className={`form-control ${invalidPhoneNumber? YourInfoStyle.error :''}`} id="exampleInputPhoneNumber" aria-describedby="phoneNumberHelp"/>
            </div>
        </div>
    </>
}