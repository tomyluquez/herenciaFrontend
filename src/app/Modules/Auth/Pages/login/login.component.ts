import { Component, OnInit } from '@angular/core';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertService } from '../../../Other/Services/alert.service';
import { CartService } from '../../../Cart/Services/cart.service';
import { UserTokenVM } from '../../../User/Models/User.Token.model';
import { UserRoleEnum } from '../../../User/Enums/user-role-enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  isLoading = false;
  isSubmitted = false;
  showPassword = false;

  formLogin!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService,
    private _router: Router,
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.isLoading = true;
      this.blockUI.start();
      const email = this.formLogin.get('email')?.value;
      const password = this.formLogin.get('password')?.value;

      this._authService
        .login({
          email: email,
          password: password,
        })
        .subscribe((res: UserTokenVM) => {
          this._alertService.showAlerts(res);
          if (res.HasErrors || res.HasWarnings) {
            this.formLogin.reset();
            this.isLoading = false;
            this.isSubmitted = false;
            this.blockUI.stop();

            return;
          }

          this._authService.setToken(res.Token);
          this._authService.setRole(String(res.Role));
          this._authService.setCustomerName(String(res.CustomerName));
          this._authService.setLoggedIn();
          this._cartService.updateCartItems();
          if (res.Role === UserRoleEnum.Admin) {
            this._router.navigate(['/ControlPanel']);
          } else {
            this._router.navigate(['/Home']);
          }
          this.blockUI.stop();
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
