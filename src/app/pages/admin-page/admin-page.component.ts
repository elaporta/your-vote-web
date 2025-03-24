import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Services
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class AdminPageComponent {

    constructor(private authService: AuthService, public router: Router) {}

    public logout() {
        this.authService.logout();
        this.router.navigate(['/vote']);
    }
}