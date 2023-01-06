// Dependencies
import Link from 'next/link';

// Types
import { StepType } from '@core/redux';

// Css
import StepStyle from '../../styles/layouts/step.module.sass';
import CommonStyle from '../../styles/common.module.sass';


export function Step(step: StepType): JSX.Element {

    return <>
        <Link className={!step.enabled ? CommonStyle.disabled : ''} href={`/steps/${step.page}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className={`row ${StepStyle.customCard}`}>
                <div className="col-md-3">
                    <div className={`${StepStyle.circle} ${step.isActive ? StepStyle.active : ''}`}>
                        <h5>{step.id}</h5>
                    </div>
                </div>
                <div className="col-md-9">
                    <h6 className={CommonStyle.bluredTitle}>STEP {step.id}</h6>
                    <h5>{step.description}</h5>
                </div>
            </div>
        </Link>
    </>
}

export default Step;
