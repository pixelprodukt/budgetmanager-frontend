import { Component, computed, signal } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import {
    NgpDatePicker,
    NgpDatePickerLabel,
    NgpDatePickerNextMonth,
    NgpDatePickerPreviousMonth,
    NgpDatePickerGrid,
    NgpDatePickerCell,
    NgpDatePickerRowRender,
    NgpDatePickerCellRender,
    NgpDatePickerDateButton,
} from 'ng-primitives/date-picker';

@Component({
    selector: 'bm-custom-datepicker',
    imports: [
        LucideAngularModule,
        NgpDatePicker,
        NgpDatePickerLabel,
        NgpDatePickerPreviousMonth,
        NgpDatePickerNextMonth,
        NgpDatePickerGrid,
        NgpDatePickerCell,
        NgpDatePickerRowRender,
        NgpDatePickerCellRender,
        NgpDatePickerDateButton
    ],
    templateUrl: './custom-datepicker.component.html',
    styleUrl: './custom-datepicker.component.css'
})
export class CustomDatepickerComponent {
    protected readonly arrowLeft = ChevronLeft;
    protected readonly arrowRight = ChevronRight;
    protected readonly date = signal<Date>(new Date());
    protected readonly focused = signal<Date>(new Date());
    protected readonly label = computed(() => `${this.focused().toLocaleString("default", { month: "long" })} ${this.focused().getFullYear()}`);
}
