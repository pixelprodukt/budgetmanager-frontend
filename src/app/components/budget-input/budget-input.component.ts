import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild } from '@angular/core';
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
        console.log('parsed', parsed);
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
    }

    public ngAfterViewInit(): void {
        this.amountInputElement?.nativeElement.focus();
    }

    protected debug(): void {
        console.log(this.value());
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
            console.log('expenses', this.expenses());
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
            description: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}, ${now.getHours()}:${now.getMinutes()}`,
            spentAt: now
        }
    }
}
