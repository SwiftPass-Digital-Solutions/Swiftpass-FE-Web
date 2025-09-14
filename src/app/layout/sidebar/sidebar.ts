import { LogoComponent } from '../../shared/components/logo';
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MenuItem {
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
export class Sidebar {

  private sanitizer = inject(DomSanitizer);

  menuItems = signal<MenuItem[]>([]);

  getSafeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
