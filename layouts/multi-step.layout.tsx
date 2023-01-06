// Dependencies
import { ReactNode, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// CSS
import MultiStepLayoutStyle from '../styles/layouts/multi-step-layout.module.sass';
import CommonStyle from '../styles/common.module.sass';

// Components
import { Steps } from '@shared/common-components';

// Redux
import { StepState, StepStore } from '@core/redux';

// Enums
import { StepEnum } from '@core/enums';
import ThankYou from '../pages/steps/thank-you';

function MultiStepLayout({ children }: { children: ReactNode }): JSX.Element {

    const router = useRouter();
    const { currentStepSetup } = useSelector((state: StepState) => state.step);

    const [isLastStep, setIsLastStep] = useState(false);
    const [disableBackButton, setDisableBackButton] = useState(false);
    const [disableNextutton, setDisableNextButton] = useState(false);
    const [confirmed, setConfirmed] = useState(false);


    const onClickNextStep = (e: any):void => {
        e.preventDefault();
        const { nextStep } =  StepStore.getState().step.currentStepSetup;
        router.replace(`${nextStep?.page}`);
    }

    const onClickGoBack = (): void => {
        const { previousStep } =  StepStore.getState().step.currentStepSetup;

        router.push(`${previousStep?.page}`);
    }

    useEffect(() => {
        const { activeStep, previousStep, nextStep } = currentStepSetup;

        setDisableBackButton(activeStep.id === previousStep?.id);
        setIsLastStep(activeStep.id === nextStep?.id);
        
        setDisableNextButton(!currentStepSetup.nextStep?.enabled);

    }, [
        currentStepSetup  
    ]);

    const onClickConfirm = () => {
        setConfirmed(true);
    }


    return <>
        <div className={`container ${MultiStepLayoutStyle.multiStepLayout}`}>
           <div className={MultiStepLayoutStyle.customCard}>
           <form onSubmit={onClickNextStep} >
            
                <div className={`row ${CommonStyle.inheritHeight}`}>
                    <div className={`col-md-4 ${MultiStepLayoutStyle.left}`}>
                       <Steps />
                    </div>
                    <div className={`col-md-8 ${MultiStepLayoutStyle.right}`}>
                        <div className={`col-md-12 ${CommonStyle.h90}`}>
                            {confirmed ? <ThankYou></ThankYou> :children}
                        </div>
                        <div className="col-md-12" hidden={confirmed}>
                            <button type="button" className={`btn btn-default ${MultiStepLayoutStyle.goBack}`}
                                disabled={disableBackButton}
                                hidden={currentStepSetup.activeStep.id === StepEnum.YOUR_INFO}
                                onClick={onClickGoBack}
                            >
                                <h5>Go Back</h5>
                            </button>
                            {
                                !isLastStep &&  
                                <button type="submit" className={`btn btn-primary ${CommonStyle.floatRight} ${MultiStepLayoutStyle.nextStep}`}
                                    disabled={disableNextutton}
                                >
                                    <h5>Next Step</h5>
                                </button> 
                            }
                           
                           {
                                isLastStep &&  
                                <button type="button" onClick={onClickConfirm} className={`btn btn-primary ${CommonStyle.floatRight} ${MultiStepLayoutStyle.confirm}`}
                                    >
                                    <h5>Confirm</h5>
                                </button>
                            }

                            
                        </div>
                    </div>
                </div>
            </form>
           </div>
        </div>
    </>
}

export default MultiStepLayout;