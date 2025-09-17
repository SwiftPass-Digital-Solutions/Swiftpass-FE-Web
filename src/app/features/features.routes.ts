import { Route } from "@angular/router";
import { Features } from "./features";

export const featRoutes: Route[] = [
    {
        path: '',
        component: Features,
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.routes').then(m => m.userRoutes)
            },
            {
                path: 'business',
                loadChildren: () => import('./business/business.routes').then(m => m.businessRoutes)
            }
        ]
    }
];
