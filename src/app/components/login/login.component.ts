import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { TokenResponse } from '../../models/token-response.model';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'bm-login',
    imports: [
        ReactiveFormsModule,
        CustomInputComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
    private $unsubscribe = new Subject();
    private readonly authService = inject(AuthService);
    private readonly formBuilder = inject(FormBuilder);

    protected loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    protected getError(controlName: string): string | null {
        const control = this.loginForm.get(controlName);
        if (control?.touched && control?.invalid) {
            if (control.errors?.['required']) return 'This field is required';
        }
        return null;
    }

    protected handleSubmit(): void {
        if (this.loginForm.valid) {
            this.authService.logIn(this.loginForm.value.username!, this.loginForm.value.password!)
                .pipe(
                    catchError((error: HttpErrorResponse, caught: Observable<TokenResponse>) => {
                        console.error('Error caught while logging in: ', error);
                        return of();
                    })
                )
                .pipe(takeUntil(this.$unsubscribe))
                .subscribe((response: TokenResponse) => {
                    console.log('response', response);
                    // set loggedIn true and save token
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    public ngOnDestroy(): void {
        this.$unsubscribe.next(null);
        this.$unsubscribe.complete();
    }
}
