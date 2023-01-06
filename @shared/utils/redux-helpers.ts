import { StepEnum } from "@core/enums";
import { PersonalInfoType, StepStateType } from "@core/redux";
import { isValidEmail } from "./validators";

export function enableNextStepOfPersonalInfo(
  state: StepStateType,
  personalInfo: PersonalInfoType
): void {
  const {
    currentStepSetup: { nextStep },
    stepList,
  } = state;

  const _nextStep = stepList.find((i) => i.id === nextStep?.id);

  const nextStepStatus =
    personalInfo.name.trim() !== "" &&
    isValidEmail(personalInfo.email) &&
    personalInfo.email.trim() !== "" &&
    personalInfo.phoneNumber.trim() !== "" // &&
    // personalInfo.phoneNumber.trim().length === 10;

  if (_nextStep) {
    _nextStep.enabled = nextStepStatus;
  }

  if (nextStep) {
    nextStep.enabled = nextStepStatus;
  }

  if (!nextStepStatus) {
    setStepStatus(state, nextStepStatus, _nextStep?.id);
  }
}

export function setStepStatus(
  state: StepStateType,
  status: boolean,
  step?: StepEnum
): void {
  const { stepList } = state;

  if (status) {
    stepList.forEach((i) => {
      if (step && i.id <= step) {
        i.enabled = status;
      }
    });
  } else {
    stepList.forEach((i) => {
      if (step && i.id >= step) {
        i.enabled = status;
      }
    });
  }
}
