import { Component } from '@angular/core';
import { ICompanyInfoVM } from '../../../interfaces/Config.interface';
import { ConfigService } from '../../../services/config.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../divider/divider.component';
import { HeaderService } from '../../../services/header-service.service';
import { IMenuVM } from '../../../interfaces/Menu.Interfaces';
import { InputTextComponent } from './../Inputs/input-text/input-text.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DividerComponent, InputTextComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  companyInfo!: ICompanyInfoVM[];
  menues!: IMenuVM[];

  constructor(
    private _configService: ConfigService,
    private _headerService: HeaderService
  ) {
    this._configService.getCompanyInfo().subscribe((res: ICompanyInfoVM[]) => {
      this.companyInfo = res;
    });
    this.menues = this._headerService.getMenuHeaderLocal();
  }
}
