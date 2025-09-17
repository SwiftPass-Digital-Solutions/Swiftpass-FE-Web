import { Component, inject, signal } from '@angular/core';
import { Logo } from '@shared/components/logo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from "@shared/components/input/input";
import { Button } from "@shared/components/button";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { UserType } from '@shared/enums/app-enums';
import { USER_ROUTES } from 'src/app/features/user/user.routes.paths';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../app.routes.paths';

@Component({
  selector: 'app-login',
  imports: [Logo, ReactiveFormsModule, Input, Button, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  isLoading = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.value)
    .pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: (res) => {
        if(res.status){
          if (res.data.userType === UserType.SwiftPassUser) {
            this.router.navigate([APP_ROUTES.APP, APP_ROUTES.USER, USER_ROUTES.OVERVIEW]);
          }
        }
      },
      error: (err) => {
        this.toast.error(err.error?.message || 'An error occurred during login.');
      }
    });
  }
}
