import { AbstractControl, ValidatorFn } from '@angular/forms';

export function twoDecimalPlacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const regex = /^-?\d*(?:\.\d{0,2})?$/;
        if (value !== null && value !== undefined && !regex.test(value)) {
            return { 'twoDecimalPlaces': true };
        }
        return null;
    };
}