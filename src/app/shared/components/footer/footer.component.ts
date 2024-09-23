import { Component } from '@angular/core';
import { ICompanyInfoVM } from '../../../interfaces/Config.interface';
import { ConfigService } from '../../../services/config.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DividerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  companyInfo!: ICompanyInfoVM[];

  constructor(private _configService: ConfigService) {
    this._configService.getCompanyInfo().subscribe((res: ICompanyInfoVM[]) => {
      this.companyInfo = res;
    });
  }
}
