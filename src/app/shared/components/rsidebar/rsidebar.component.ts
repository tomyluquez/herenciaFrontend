import { Component, effect } from '@angular/core';
import { RSidebarService } from '../../../services/rsidebar.service';
import { CommonModule } from '@angular/common';
import { ShadowBgComponent } from '../shadow-bg/shadow-bg.component';

@Component({
  selector: 'app-rsidebar',
  standalone: true,
  imports: [CommonModule, RSidebarComponent, ShadowBgComponent],
  templateUrl: './rsidebar.component.html',
  styleUrl: './rsidebar.component.css',
})
export class RSidebarComponent {
  isOpen = true;

  constructor(private _sidebar: RSidebarService) {
    effect(() => {
      this.isOpen = this._sidebar.isSidebarOpen();
    });
  }

  closeSidebar() {
    this._sidebar.closeSidebar();
  }
}
