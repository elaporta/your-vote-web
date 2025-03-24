import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'http://127.0.0.1:8000/auth';
    private isAuthenticated = signal(false);

    constructor(private http: HttpClient) {
        this.checkToken();
    }

    login(email: string, password: string, rememberMe: boolean = false): Observable<any> {
        return this.http.post(`${this.API_URL}/login`, { email, password, rememberMe })
        .pipe(
            tap((response: any) => {
                if (response.accessToken) {
                    localStorage.setItem('token', response.accessToken);
                    localStorage.setItem('email', email);
                    this.isAuthenticated.set(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.isAuthenticated.set(false);
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated();
    }

    updatePassword(password: string, newPassword: string, newPasswordConfirmation: string): Observable<any> {
        const email = localStorage.getItem('email');

        return this.http.put(`${this.API_URL}/password`, {
            email,
            password,
            newPassword,
            newPasswordConfirmation
        });
    }

    private checkToken(): void {
        const token = localStorage.getItem('token');
        this.isAuthenticated.set(!!token);
    }
}