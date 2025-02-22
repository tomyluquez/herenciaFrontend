import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from '../../shared/components/Inputs/input-text/input-text.component';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserTokenVM } from '../../models/User/User.Token.model';
import { CartService } from '../../services/cart.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DividerComponent,
    PrimaryButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  isLoading = false;
  isSubmitted = false;

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
      this.blockUI.start('Cargando...');
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
            return;
          }

          this._authService.setToken(res.Token);
          this._authService.setRole(String(res.Role));
          this._authService.setLoggedIn();
          this._cartService.updateCartItems();
          this._router.navigate(['/Home']);
          this.blockUI.stop();
        });
    }
  }
}
