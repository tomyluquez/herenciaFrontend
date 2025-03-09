import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static onlyNumbers(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
            if (control.value && !regex.test(control.value)) {
                return { onlyNumbers: true };
            }
            return null;
        };
    }
}
