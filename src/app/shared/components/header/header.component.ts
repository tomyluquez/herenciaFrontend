import { Component, HostListener } from '@angular/core';
import { HeaderServiceService } from '../../../services/header-service.service';
import { IMenuVM, MenuVM } from '../../../interfaces/Menu.Interfaces';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BlockUIModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @BlockUI() blockUI!: NgBlockUI;
  menues!: IMenuVM[];

  isMobile = false;

  isOpenMenuMobile = false;

  constructor(private _header: HeaderServiceService) {}

  ngOnInit(): void {
    this.blockUI.start('Cargando...');
    this.menues = this._header.getMenuHeaderLocal();
    if (!this.menues) {
      this._header.getMenuHeaderDB().subscribe((data: MenuVM) => {
        if (data.HasErrors) {
          return;
        }
        if (data.HasWarnings) {
          return;
        }
        if (data.HasSuccess) {
        }
        this.menues = data.Items;
        localStorage.setItem('menu', JSON.stringify(this.menues));
        this.blockUI.stop();
      });
    }
    this.isMobile = window.innerWidth < 992;
    this.blockUI.stop();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 992;
  }

  toggleMenuMobile() {
    this.isOpenMenuMobile = !this.isOpenMenuMobile;
  }
}
