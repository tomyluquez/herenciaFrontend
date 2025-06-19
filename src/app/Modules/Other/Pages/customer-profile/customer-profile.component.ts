import { Component } from '@angular/core';
import menuesCustomerProfile from '../../../../data/menusCustomerProfile.json';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LSidebarService } from '../../Services/lsidebar.service';
import { CommonModule } from '@angular/common';
import { LSidebarComponent } from '../../../../shared/components/lsidebar/lsidebar.component';
import { CustomerInfoComponent } from '../CustomerProfile/customer-info/customer-info.component';
import { HistoryOrdersComponent } from '../CustomerProfile/history-orders/history-orders.component';
import { IUserProfile } from '../../../User/Interface/User-pofile.interface';
import { UserService } from '../../../User/Services/User.service';
import { UserProfile } from '../../../User/Models/User-profile';
import { AuthService } from '../../../Auth/Services/auth.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, LSidebarComponent, CustomerInfoComponent, HistoryOrdersComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {
  @BlockUI() blockUI!: NgBlockUI;

  menues = menuesCustomerProfile.Items;

  panelSelected!: string;

  customer!: IUserProfile | null
  customerName!: string | null
  constructor(private _sidebarService: LSidebarService, private userService: UserService, private authService: AuthService) {
    this.customerName = this.authService.getCustomerName()
  }

  ngOnInit(): void {
    this.blockUI.start();
    if (this.customerName) {

      this.userService.getUserProfileByUserName(this.customerName).subscribe((res: UserProfile) => {
        this.blockUI.stop();
        if (res.HasErrors || res.HasWarnings) {
          return
        }
        this.customer = res.Item
        const panel = '#Profile';
        this.selectPanel(panel);
      })
    }
    this.blockUI.stop();
    this.customer = null;
  }

  selectPanel(panel: string) {
    localStorage.setItem('lastPanel', panel);
    this.panelSelected = panel;
  }

  openMobileMenu() {
    this._sidebarService.openSidebar();
  }
}
