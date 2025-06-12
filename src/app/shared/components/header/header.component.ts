import { Component, effect, HostListener } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { LSidebarService } from '../../../Modules/Other/Services/lsidebar.service';
import { LSidebarComponent } from '../lsidebar/lsidebar.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../../Modules/Other/Services/modal.service';
import { CartDropdownComponent } from '../Dropdowns/cart-dropdown/cart-dropdown.component';
import { UserDropdownComponent } from '../Dropdowns/user-dropdown/user-dropdown.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Modules/Auth/Services/auth.service';
import { SearchModalComponent } from '../modal/search-modal/search-modal.component';
import { IMenuVM, MenuVM } from '../../../Modules/Menu/Interface/Menu.Interfaces';
import { MenuService } from '../../../Modules/Menu/Services/menu-service.service';

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
  role!: number;

  quantityItems = 0;

  constructor(
    private _menuService: MenuService,
    private _sidebarService: LSidebarService,
    private _modalService: ModalService,
    private _authService: AuthService
  ) {
    effect(() => {
      this.isLoggin = this._authService.getLoggedIn();
      if (this.isLoggin) {
        this.role = this._authService.getRole();
      }
    })

  }

  ngOnInit(): void {
    this._modalService.closeModal();
    this.blockUI.start('Cargando...');
    this.isMobile = window.innerWidth < 992;
    this._menuService.getMenuHeaderDB().subscribe((res: MenuVM) => {
      this.menues = res.Items;
      this.blockUI.stop();
    });
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

  setQuantityItems(quantity: number) {
    this.quantityItems = quantity;
  }
}
