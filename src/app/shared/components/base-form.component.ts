import {FormGroup} from '@angular/forms';

export class BaseFormComponent {
  protected isInvalidControl(form: FormGroup, controlName: string){
    return form.controls[controlName].invalid && form.controls[controlName].touched;
  }

  private errorMessageForControl( controlName: string, errorKey: string) {
    switch (errorKey) {
      case 'required':
        return `The field ${controlName} is required.`;
      default:
        return `The field ${controlName} is invalid.`;
    }
  }

  protected errorMessagesForControl(form: FormGroup, controlName: string) {
    const control = form.controls[controlName];
    let ErrorMessages: string ="";
    let errors = control.errors;
    if (!errors) return ErrorMessages;
    Object.keys(errors).forEach((errorKey) =>
      ErrorMessages += this.errorMessageForControl(controlName, errorKey));
    return ErrorMessages;
  }
}
