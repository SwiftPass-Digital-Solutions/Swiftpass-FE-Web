import { Routes } from '@angular/router';
import { User } from './user';
import { Overview } from './overview/overview';
import { Vault } from './vault/vault';

export const userRoutes: Routes = [
    {
        path: '',
        component: User,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'overview'
            },
            {
                path: 'overview',
                component: Overview
            },
            {
                path: 'vault',
                component: Vault
            },
            {
                path: '**',
                redirectTo: 'overview'
            }
        ]
    }
];
