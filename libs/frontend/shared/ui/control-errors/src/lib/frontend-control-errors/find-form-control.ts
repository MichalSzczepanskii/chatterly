import { AbstractControl, ControlContainer } from '@angular/forms';

export function findFormControl(
  controlName: string,
  controlContainer?: ControlContainer
): AbstractControl {
  if (!(controlContainer && controlContainer.control)) {
    throw new Error(
      `getFormControl: control name was given but parent control not found.`
    );
  }
  const controlFromName = controlContainer.control.get(controlName);
  if (!controlFromName) {
    throw new Error(`getFormControl: control '${controlName}' not found.`);
  }
  return controlFromName;
}
