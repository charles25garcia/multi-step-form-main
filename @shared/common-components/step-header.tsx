// Types
import { StepHeaderPropsType } from "@shared/types";

export function StepHeader({ headerText, description }: StepHeaderPropsType): JSX.Element {
    return <>
        <h1>{headerText}</h1>
        <h5>{description}</h5>
        <br />
        <br />
    </>
}