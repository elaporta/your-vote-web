import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Services
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    
})
export default class LoginPageComponent {
    loginForm: FormGroup;
    loading = signal(false);
    error = signal('');
    
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%&*()_{};:,.<>?~])([a-zA-Z0-9`!@#$%&*()_{};:,.<>?~]){8,}$/)]],
            rememberMe: [false]
        });
    }
    
    onSubmit() {
        if(this.loginForm.valid) {
            this.loading.set(true);
            this.error.set('');
            
            const { email, password, rememberMe } = this.loginForm.value;

            this.authService.login(email, password, rememberMe).subscribe({
                next: () => {
                    this.router.navigate(['/admin']);
                },
                error: (err) => {
                    let errorMessage = 'Invalid email or password.';
                    if(err.error?.message) errorMessage = (typeof err.error?.message === 'string') ? err.error?.message : JSON.stringify(err.error?.message);
                    this.error.set(errorMessage);
                    this.loading.set(false);
                }
            });
        }
    }
}