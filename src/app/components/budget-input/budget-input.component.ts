import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
import { Expense } from '../../models/expense';
import { Pencil, LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'bm-budget-input',
    imports: [
        LucideAngularModule,
        FormsModule
    ],
    templateUrl: './budget-input.component.html',
    styleUrl: './budget-input.component.css'
})
export class BudgetInputComponent implements AfterViewInit {

    @ViewChild('amountInput') amountInputElement?: ElementRef;

    private value = computed(() => {
        const val = this.displayValue().replace(this.delimiter, '.');
        const parsed = parseFloat(val);
        return isNaN(parsed) ? null : parsed;
    });

    protected readonly currencySymbol = signal('€');
    protected readonly placeholder = '0,00';
    protected readonly maxValue = 999999.99;
    protected readonly minValue = 0;
    protected readonly pencilIcon = Pencil;
    protected loading = false;

    protected displayValue = signal('');
    protected delimiter: '.' | ',' = ',';
    protected expenses = signal<Expense[]>([]);
    protected selectedMonth = signal('');

    protected readonly months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    protected totalForSelectedMonth = computed(() => {
        const amounts = this.expenses().map(expense => expense.amount);
        if (amounts.length) {
            return amounts.reduce((a, b) => a + b);
        }
        return 0.0;
    });

    ngOnInit(): void {
        this.selectedMonth.set(this.months[new Date().getMonth()]);

        // TODO some service to fetch expense data for selected month and current user
    }

    public ngAfterViewInit(): void {
        this.amountInputElement?.nativeElement.focus();
    }

    // TODO maybe there is a better way when using DecimalPipe and setup locales
    // currently I have no idea how to determine which delimiter to use
    protected formatNumberToFixed(value: number): string {
        const fixed = value.toFixed(2);
        return this.delimiter === ',' ? fixed.replace('.', ',') : fixed;
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
    }

    protected onKeyDown(event: KeyboardEvent) {

        if (event.key === 'Enter') {
            this.expenses.update(oldVal => [...oldVal, this.createNewExpense()]);
            this.displayValue.set('');
        }

        const allowed = /^[0-9]$/.test(event.key) || event.key === this.delimiter || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight';

        if (!allowed) {
            event.preventDefault();
        }
    }

    private sanitizeInput(input: string): string {
        // Remove any invalid characters
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

        return sanitized;
    }

    private createNewExpense(): Expense {
        const now = new Date();
        return {
            amount: this.value()!,
            description: `${this.getFullDate(now)}, ${this.getHoursAndMinutes(now)}`,
            spentAt: now
        }
    }

    private getFullDate(now: Date): string {
        return `${now.getFullYear()}-${this.getWithPrecedingZero(now.getMonth() + 1)}-${this.getWithPrecedingZero(now.getDate())}`;
    }

    private getHoursAndMinutes(now: Date): string {
        return `${this.getWithPrecedingZero(now.getHours())}:${this.getWithPrecedingZero(now.getMinutes())}`;
    }

    private getWithPrecedingZero(number: number): string {
        return number < 10 ? `0${number}` : `${number}`;
    }
}
