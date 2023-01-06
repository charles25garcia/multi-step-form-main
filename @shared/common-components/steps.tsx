// Dependencies
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { StepState } from '@core/redux';

// Components
import Step from './step';


export function Steps(): JSX.Element {
    const { 
        currentStepSetup: { activeStep }, 
        stepList
    } = useSelector((state: StepState) => state.step);

    const router = useRouter()

    useEffect(() => {
        router.push(`${router.basePath}/steps/${stepList[0]?.page}`);
    }, []);

    return <>
        {stepList.map((step, index) => {
            return (
                <Step { ...step } key={index}  />
            )
        })}
    </>
}

export default Steps;
