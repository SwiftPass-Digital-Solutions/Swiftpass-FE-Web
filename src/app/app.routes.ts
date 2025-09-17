import { Routes } from '@angular/router';
import { Features } from './features/features';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
    },
    {
        path: 'app',
        loadChildren: () => import('./features/features.routes').then(m => m.featRoutes)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
