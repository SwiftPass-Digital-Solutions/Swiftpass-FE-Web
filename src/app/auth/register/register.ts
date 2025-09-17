import { Component, inject, OnInit, signal } from '@angular/core';
import { Logo } from '@shared/components/logo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from "@shared/components/input/input";
import { Button } from "@shared/components/button";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { RegisterUser } from '../auth.model';
import { UserType } from '@shared/enums/app-enums';

@Component({
  selector: 'app-register',
  imports: [Logo, ReactiveFormsModule, Input, Button, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = signal(false);

  registrationForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    terms: [false, [Validators.requiredTrue]]
  });

  initRegistration(){
    if(!this.registrationForm.valid){
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { terms, ...swiftPassUser } = this.registrationForm.value;
    const payload: RegisterUser = {
      swiftPassUser,
      userType: UserType.SwiftPassUser
    };

    this.isLoading.set(true);

    this.authService.registerUser(payload)
    .pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: (res) => {
        this.router.navigate(['otp', res.data]);
      },
    })
  }
}
