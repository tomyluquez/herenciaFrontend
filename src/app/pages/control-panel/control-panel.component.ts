import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import menuesControlPanel from '../../data/menuesControlPanel.json';
import { LSidebarComponent } from '../../shared/components/lsidebar/lsidebar.component';
import { LSidebarService } from '../../services/lsidebar.service';
import { ProductListComponent } from '../products/product-list/product-list.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, LSidebarComponent, ProductListComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css',
})
export class ControlPanelComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  menues = menuesControlPanel.Items;

  panelSelected!: string;

  constructor(private _sidebarService: LSidebarService) { }

  ngOnInit(): void {
    this.selectPanel('#Products');
  }

  selectPanel(panel: string) {
    this._sidebarService.closeSidebar();
    this.panelSelected = panel;
  }

  openMobileMenu() {
    this._sidebarService.openSidebar();
  }
}
