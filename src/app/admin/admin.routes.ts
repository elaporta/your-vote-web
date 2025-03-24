import { Routes } from '@angular/router';

// Components
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { PasswordComponent } from './components/password/password.component';

// Guard
import { AuthGuard } from '../auth/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminPageComponent,
        children: [
            { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' },
];