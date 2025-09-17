import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './layout.html',
})
export class Layout {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }
}