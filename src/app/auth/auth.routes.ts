import { Routes } from '@angular/router';
import { Auth } from './auth';
import { Login } from './login/login';
import { Otp } from './otp/otp';
import { Register } from './register/register';
import { CompleteRegistration } from './complete-registration/complete-registration';
import { AUTH_ROUTES } from './auth.routes.paths';

export const routes: Routes = [
    {
        path: AUTH_ROUTES.ROOT,
        component: Auth,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: AUTH_ROUTES.LOGIN
            },
            {
                path: AUTH_ROUTES.LOGIN,
                component: Login
            },
            {
                path: `${AUTH_ROUTES.OTP}/:trackingId`,
                component: Otp
            },
            {
                path: AUTH_ROUTES.REGISTER,
                component: Register
            },
            {
                path: AUTH_ROUTES.COMPLETE_REGISTRATION,
                component: CompleteRegistration
            }
        ]
    }
];
