import { Component } from '@angular/core';
import { ConfigService } from '../../../Modules/Config/Services/config.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../divider/divider.component';
import { RouterModule } from '@angular/router';
import { ICompanyInfoVM } from '../../../Modules/Config/Interfaces/Config.interface';
import { IMenuVM } from '../../../Modules/Menu/Interface/Menu.Interfaces';
import { MenuService } from '../../../Modules/Menu/Services/menu-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DividerComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  companyInfo!: ICompanyInfoVM[];
  menues!: IMenuVM[];
  currentYear = new Date().getFullYear();

  constructor(
    private _configService: ConfigService,
    private _menuService: MenuService
  ) {
    this._configService.getCompanyInfo().subscribe((res: ICompanyInfoVM[]) => {
      this.companyInfo = res;
    });
    this.menues = this._menuService.getMenuHeaderLocal();
  }
}
