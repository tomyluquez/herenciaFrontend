import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { routesModel } from '../../../../models/Routes.model';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dropdown.component.html',
  styleUrl: '../dropdown.css',
})
export class UserDropdownComponent {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) isLoggin = false;
  @Input() role?: string;

  routesModels = routesModel;

  constructor(private _router: Router, private _authService: AuthService) {}

  logOut() {
    // ver porque no cierra session
    this.isOpen = false;
    this._authService.logout();
  }

  goTo(route: string) {
    this.isOpen = false;
    this._router.navigate([route]);
  }
}
