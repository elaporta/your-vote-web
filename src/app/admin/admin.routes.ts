import { Routes } from '@angular/router';

// Components
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PasswordComponent } from './components/password/password.component';
import { VoterFormComponent } from './components/voter-form/voter-form.component';

// Guard
import { AuthGuard } from '../auth/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminPageComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
            { path: 'voter', component: VoterFormComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' },
];