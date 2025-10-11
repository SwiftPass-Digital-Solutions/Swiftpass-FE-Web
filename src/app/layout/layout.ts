import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  title = signal('');
  isSidebarOpen = signal(false);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(this.router.url),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['title'];
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(title => {
        if (title) {
          this.title.set(title);
        }
      });
  }

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }
}