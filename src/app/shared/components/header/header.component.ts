import { Component, effect, HostListener } from '@angular/core';
import { HeaderService } from '../../../services/header-service.service';
import { IMenuVM, MenuVM } from '../../../interfaces/Menu.Interfaces';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { LSidebarService } from '../../../services/lsidebar.service';
import { LSidebarComponent } from '../lsidebar/lsidebar.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../../services/modal.service';
import { InputTextComponent } from '../Inputs/input-text/input-text.component';
import { DividerComponent } from '../divider/divider.component';
import { CartDropdownComponent } from '../Dropdowns/cart-dropdown/cart-dropdown.component';
import { UserDropdownComponent } from '../Dropdowns/user-dropdown/user-dropdown.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from '../modal/search-modal/search-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    BlockUIModule,
    LSidebarComponent,
    ModalComponent,
    CartDropdownComponent,
    UserDropdownComponent,
    RouterModule,
    SearchModalComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @BlockUI() blockUI!: NgBlockUI;
  menues!: IMenuVM[];

  isMobile = false;

  isOpenMenuMobile = false;
  isOpenDropdownUser = false;
  isOpenDropdownCart = false;

  // tiene que estar escuchando el servicio de auth para actualizar si esta logueado o no
  isLoggin = false;
  role!: string;

  constructor(
    private _headerService: HeaderService,
    private _sidebarService: LSidebarService,
    private _modalService: ModalService,
    private _authService: AuthService
  ) {
    this._authService.isLogged$.subscribe((isLogged) => {
      this.isLoggin = isLogged;
      if (isLogged) {
        this.role = this._authService.Role;
      }
    });
  }

  ngOnInit(): void {
    this.blockUI.start('Cargando...');
    this.menues = this._headerService.getMenuHeaderLocal();
    this.isMobile = window.innerWidth < 992;
    this.blockUI.stop();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 992;
  }

  openMobileMenu() {
    this._sidebarService.openSidebar();
  }

  openModal() {
    this._modalService.toggleModal();
  }

  toggleDropdownUser() {
    this.isOpenDropdownCart = false;
    this.isOpenDropdownUser = !this.isOpenDropdownUser;
  }

  toggleDropdownCart() {
    this.isOpenDropdownUser = false;
    this.isOpenDropdownCart = !this.isOpenDropdownCart;
  }
}
