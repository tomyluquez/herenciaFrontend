import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import menuesControlPanel from '../../../../data/menuesControlPanel.json';
import { LSidebarComponent } from '../../../../shared/components/lsidebar/lsidebar.component';
import { LSidebarService } from '../../Services/lsidebar.service';
import { StockListComponent } from '../../../Variant/Pages/stock-list/stock-list.component';
import { ProductListComponent } from './../../../Product/Pages/product-list/product-list.component';
import { OrderListComponent } from '../../../Order/Pages/order-list/order-list.component';
import { CategoryListComponent } from '../../../Category/Pages/category-list/category-list.component';
import { SizeListComponent } from '../../../Size/Pages/size-list/size-list.component';
import { PriceListListComponent } from '../../../PriceList/Pages/price-list-list/price-list-list.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule,
    LSidebarComponent,
    ProductListComponent,
    StockListComponent,
    OrderListComponent,
    CategoryListComponent,
    SizeListComponent,
    PriceListListComponent
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css',
})
export class ControlPanelComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  menues = menuesControlPanel.Items;

  panelSelected!: string;

  constructor(private _sidebarService: LSidebarService) { }

  ngOnInit(): void {
    const lastPanel = localStorage.getItem('lastPanel');
    const panel = lastPanel ? lastPanel : '#Products'
    this.selectPanel(panel);
  }

  selectPanel(panel: string) {
    localStorage.setItem('lastPanel', panel);
    this._sidebarService.closeSidebar();
    this.panelSelected = panel;
  }

  openMobileMenu() {
    this._sidebarService.openSidebar();
  }
}
