import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Services
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-password',
    standalone: true,
    templateUrl: './password.component.html',
    imports: [CommonModule, ReactiveFormsModule]
})
export class PasswordComponent {
    passwordForm: FormGroup;
    loading = signal(false);
    error = signal('');
    success = signal(false);

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.passwordForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%&*()_{};:,.<>?~])([a-zA-Z0-9`!@#$%&*()_{};:,.<>?~]){8,}$/)]],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%&*()_{};:,.<>?~])([a-zA-Z0-9`!@#$%&*()_{};:,.<>?~]){8,}$/)]],
            newPasswordConfirmation: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword')?.value;
        const newPasswordConfirmation = form.get('newPasswordConfirmation')?.value;
        return newPassword === newPasswordConfirmation ? null : { passwordMismatch: true };
    }

    onSubmit() {
        this.loading.set(true);
        this.error.set('');
        this.success.set(false);

        const { password, newPassword, newPasswordConfirmation } = this.passwordForm.value;

        this.authService.updatePassword(password, newPassword, newPasswordConfirmation).subscribe({
            next: () => {
                this.success.set(true);
                this.passwordForm.reset();
            },
            error: (err) => {
                let errorMessage = 'Failed to update password.';
                if(err.error?.message)  errorMessage = (typeof err.error?.message === 'string') ? err.error?.message : JSON.stringify(err.error?.message);
                this.error.set(errorMessage);
                this.loading.set(false);
            },
            complete: () => {
                this.loading.set(false);
            }
        });
    }
}