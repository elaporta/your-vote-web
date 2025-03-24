import { Routes } from '@angular/router';

// Guard
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: 'vote', loadComponent: () => import('./pages/vote-page/vote-page.component') },
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component') },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'vote', pathMatch: 'full' },
    { path: '**', redirectTo: 'vote' },
];