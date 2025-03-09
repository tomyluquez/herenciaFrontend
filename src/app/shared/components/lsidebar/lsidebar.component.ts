import { Component, effect } from '@angular/core';
import { LSidebarService } from '../../../Modules/Other/Services/lsidebar.service';
import { CommonModule } from '@angular/common';
import { ShadowBgComponent } from '../shadow-bg/shadow-bg.component';

@Component({
  selector: 'app-lsidebar',
  standalone: true,
  imports: [CommonModule, ShadowBgComponent],
  templateUrl: './lsidebar.component.html',
  styleUrl: './lsidebar.component.css',
})
export class LSidebarComponent {
  isOpen = true;

  constructor(private _sidebar: LSidebarService) {
    effect(() => {
      this.isOpen = this._sidebar.isSidebarOpen();
    });
  }

  closeSidebar() {
    this._sidebar.closeSidebar();
  }
}
