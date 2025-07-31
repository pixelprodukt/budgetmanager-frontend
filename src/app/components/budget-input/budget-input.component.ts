import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
    selector: 'bm-budget-input',
    imports: [],
    templateUrl: './budget-input.component.html',
    styleUrl: './budget-input.component.css'
})
export class BudgetInputComponent implements AfterViewInit {

    @ViewChild('amountInput') amountInputElement?: ElementRef;

    private value = computed(() => {
        const val = this.displayValue().replace(this.delimiter, '.');
        const parsed = parseFloat(val);
        console.log('parsed', parsed);
        return isNaN(parsed) ? null : parsed;
    });

    protected readonly currencySymbol = signal('€');
    protected readonly placeholder = '0,00';
    protected readonly maxValue = 999999.99;
    protected readonly minValue = 0;

    protected displayValue = signal('');
    protected delimiter: '.' | ',' = ',';

    public ngAfterViewInit(): void {
        this.amountInputElement?.nativeElement.focus();
    }

    protected onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value;
        const sanitized = this.sanitizeInput(inputValue);

        if (sanitized !== this.displayValue()) {
            this.displayValue.set(sanitized);
        } else {
            input.value = this.displayValue();
        }

        //input.value = sanitized;

        /* const input = event.target as HTMLInputElement;
        let inputValue = input.value;

        // Remove all non-digit and non-decimal characters
        inputValue = inputValue.replace(`/[^\d${this.delimiter}]/g`, '');

        // TODO: Handle local specifix character for decimals, either dot or comma depending on system used by user
        // Handle multiple decimal points - keep only the first one
        const decimalIndex = inputValue.indexOf(this.delimiter);
        if (decimalIndex !== -1) {
            inputValue = inputValue.substring(0, decimalIndex + 1) +
                inputValue.substring(decimalIndex + 1).replace(/\./g, '');
        }

        // Limit to 2 decimal places
        if (decimalIndex !== -1 && inputValue.length > decimalIndex + 3) {
            inputValue = inputValue.substring(0, decimalIndex + 3);
        }

        // Convert to number and validate range
        const numericValue = parseFloat(inputValue) || 0;

        if (numericValue > this.maxValue) {
            inputValue = this.maxValue.toFixed(2);
        }

        if (numericValue < this.minValue) {
            // Allow temporary values less than min while typing
            if (!this.isFocused) {
                inputValue = this.minValue.toFixed(2);
            }
        }

        // Update cursor position
        const cursorPosition = input.selectionStart;
        input.value = inputValue;
        this.displayValue.set(inputValue);

        // Restore cursor position
        if (cursorPosition !== null) {
            input.setSelectionRange(cursorPosition, cursorPosition);
        }

        this.value = parseFloat(inputValue) || 0; */
    }

    /* protected onFocus(event: Event): void {
        this.isFocused = true;
        const input = event.target as HTMLInputElement;

        // Show raw value when focused (remove formatting)
        if (this.value === 0) {
            this.displayValue.set('');
        } else {
            this.displayValue.set(this.value.toString());
        }

        // Select all text for easy editing
        setTimeout(() => input.select(), 0);
    } */

    /* protected onBlur(event: Event): void {
        this.isFocused = false;

        // Validate final value
        if (this.value < this.minValue) {
            this.value = this.minValue;
        }

        this.updateDisplayValue();
    } */

    /* protected onKeyDown(event: KeyboardEvent): void {
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, decimal point
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '.', ','
        ];

        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
        if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
            return;
        }

        // Allow numbers
        if (event.key >= '0' && event.key <= '9') {
            return;
        }

        // Allow allowed keys
        if (allowedKeys.includes(event.key)) {
            return;
        }

        // Prevent everything else
        event.preventDefault();
    } */

    onKeyDown(event: KeyboardEvent) {
        // Allow control keys
        if (event.ctrlKey || event.metaKey) return;

        if (event.key === 'Enter') {
            // TODO: Save current value, 
            // reload list of last added values, 
            // reset displayValue and value
            this.displayValue.set('');
        }

        const allowed = /^[0-9]$/.test(event.key) || event.key === this.delimiter || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight';

        if (!allowed) {
            event.preventDefault();
        }
    }

    private sanitizeInput(input: string): string {
        // Remove any invalid characters
        //const regex = new RegExp(`[^0-9\\${this.delimiter}]`, 'g');
        let sanitized = input.replace(`/[^\d${this.delimiter}]/g`, '');

        // Prevent delimiter as first character
        if (sanitized.startsWith(this.delimiter)) {
            sanitized = `0${sanitized}`;
            console.log('startsWith Delimiter', sanitized);
        }

        // Only allow one delimiter
        const parts = sanitized.split(this.delimiter);
        if (parts.length > 2) {
            sanitized = parts[0] + this.delimiter + parts[1];
        }

        // Limit to 2 decimals if delimiter present
        if (parts.length === 2) {
            parts[1] = parts[1].slice(0, 2);
            sanitized = parts[0] + this.delimiter + parts[1];
        }
        console.log('sanitized', sanitized);
        return sanitized;
    }
}
