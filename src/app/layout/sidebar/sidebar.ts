import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '@shared/enums/app-enums';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessMenu, UserMenu } from './sidebar-constants';

export interface MenuItem {
  label: string;
  routerLink: string;
  svg: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',

})
export class Sidebar implements OnInit {
  private authService = inject(AuthService);

  user = computed(() => this.authService.user());

  menuItems = signal<MenuItem[]>([]);

  ngOnInit(){
    if(this.user()?.userType === UserType.SwiftPassUser){
      this.menuItems.set(UserMenu);
    }else if(this.user()?.userType === UserType.Business){
      this.menuItems.set(BusinessMenu);
    }
  }
}
