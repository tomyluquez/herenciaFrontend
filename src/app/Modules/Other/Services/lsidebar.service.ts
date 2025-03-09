import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LSidebarService {
  isSidebarOpen = signal(false);

  constructor() {}

  openSidebar() {
    this.isSidebarOpen.set(true);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }
}
