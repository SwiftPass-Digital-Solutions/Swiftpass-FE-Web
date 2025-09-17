import { Routes } from '@angular/router';
import { User } from './user';
import { Overview } from './overview/overview';
import { Vault } from './vault/vault';
import { USER_ROUTES } from './user.routes.paths';

export const userRoutes: Routes = [
    {
        path: USER_ROUTES.ROOT,
        component: User,
        children: [
            {
                path: USER_ROUTES.ROOT,
                pathMatch: 'full',
                redirectTo: USER_ROUTES.OVERVIEW
            },
            {
                path: USER_ROUTES.OVERVIEW,
                component: Overview
            },
            {
                path: USER_ROUTES.VAULT,
                component: Vault
            },
            {
                path: '**',
                redirectTo: USER_ROUTES.OVERVIEW
            }
        ]
    }
];
