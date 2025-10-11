import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserType } from '@shared/enums/app-enums';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessMenu, UserMenu } from './sidebar-constants';
import { Logo } from '@shared/components/logo';
import { SafeHtmlPipe } from '@shared/pipes/safe-html-pipe';

export interface MenuItem {
  label: string;
  routerLink: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Logo, SafeHtmlPipe],
  templateUrl: './sidebar.html',

})
export class Sidebar implements OnInit {
  private authService = inject(AuthService);

  user = computed(() => this.authService.user());
  UserType = UserType;

  menuItems = signal<MenuItem[]>([]);

  toggleSidebar = output();

  ngOnInit(){
    if(this.user()?.userType === UserType.SwiftPassUser){
      this.menuItems.set(UserMenu);
    }else if(this.user()?.userType === UserType.Business){
      this.menuItems.set(BusinessMenu);
    }
  }
}
