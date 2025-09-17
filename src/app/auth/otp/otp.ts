import { AfterViewInit, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Logo } from '@shared/components/logo';
import { Button } from "@shared/components/button";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgOtpInputComponent } from 'ng-otp-input';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AUTH_ROUTES } from '../auth.routes.paths';


@Component({
  selector: 'app-login',
  imports: [Logo, Button, NgOtpInputComponent],
  templateUrl: './otp.html',
})
export class Otp implements OnInit, AfterViewInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private authService = inject(AuthService);

  user = computed(() => this.authService.user());

  otp = signal('');
  isLoading = signal(false);
  countDown = signal(120);
  trackingId = signal('');

  countDownInterval!: number;

  ngOnInit(): void {
    this.trackingId.set(this.route.snapshot.paramMap.get('trackingId') as string);
  }

  ngAfterViewInit(): void {
    this.startCountDown();
  }

  onOtpChange(otp: string){
    this.otp.set(otp);
  }

  confirm() {
    if(this.otp().length !== 5) return;
  
    const payload = {
      email: this.user()?.email as string,
      otp: this.otp(),
      trackingId: this.trackingId()
    };

    this.isLoading.set(true);

    this.authService.confirmEmail(payload)
    .pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: (res) => {
        this.authService.setToken(res.data);
        this.router.navigate([AUTH_ROUTES.COMPLETE_REGISTRATION]);
      }
    })
  }

  resendOtp(){
    this.resetCountDown();

    this.authService.resendOTP(this.user()?.email as string)
    .subscribe({
      next: (res) => {
        this.trackingId.set(res.data);
        this.router.navigate([AUTH_ROUTES.OTP, res.data]);
        this.toast.success('OTP sent successfully');
      }
    })
  }

  goBack(){
    this.router.navigate([`/${AUTH_ROUTES.REGISTER}`]);
  }

  startCountDown(){
    this.countDownInterval = setInterval(() => {
        if(this.countDown() > 0) this.countDown.update((value) => value - 1);
      },
      1000
    )
  }

  resetCountDown(){
    clearInterval(this.countDownInterval);
    this.countDown.set(120);
    this.startCountDown();
  }
}
