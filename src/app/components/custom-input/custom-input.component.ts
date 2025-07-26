import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bm-custom-input',
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ],
    templateUrl: './custom-input.component.html',
    styleUrl: './custom-input.component.css'
})
export class CustomInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() type = 'text';
    @Input() error: string | null = null;
    @Input() id = crypto.randomUUID();

    protected value = '';

    protected onChange: (value: string) => void = () => { };
    protected onTouched: () => void = () => { };

    public writeValue(value: string): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    convertTarget(target: EventTarget): HTMLInputElement {
        return target as HTMLInputElement;
    }
}
