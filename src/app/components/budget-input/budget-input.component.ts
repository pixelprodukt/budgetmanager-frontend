import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { twoDecimalPlacesValidator } from '../../validators/two-decimal-places';

@Component({
    selector: 'bm-budget-input',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './budget-input.component.html',
    styleUrl: './budget-input.component.css'
})
export class BudgetInputComponent {

    private readonly formBuilder = inject(FormBuilder);

    protected amountForm = this.formBuilder.group({ amountInput: ['', [twoDecimalPlacesValidator, Validators.required]] });

    protected debug(): void {
        console.log('amountForm', this.amountForm);
    }
}
