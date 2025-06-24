import { Component } from '@angular/core';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { AlertService } from '../../../Other/Services/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading = false;
  isSubmitted = false;
  seePasswords = false;

  formRegister!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.formRegister = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    });
  }

  register() {
    this.isSubmitted = true;
    const email = this.formRegister.get('email')?.value;
    const password = this.formRegister.get('password')?.value;
    const confirmPassword = this.formRegister.get('confirmPassword')?.value;
    const userName = this.formRegister.get('userName')?.value;
    const phone = this.formRegister.get('phone')?.value;

    if (password !== confirmPassword) {
      this.formRegister.controls['confirmPassword'].setErrors({
        notMatch: true,
      });
    }

    if (this.formRegister.valid) {
      this.isLoading = true;

      this._authService
        .register({
          email,
          password,
          userName,
          phone
        })
        .subscribe((res: ResponseMessages) => {
          this._alertService.showAlerts(res);
          if (res.HasErrors || res.HasWarnings) {
            this.formRegister.reset();
            this.isLoading = false;
            this.isSubmitted = false;
            return;
          }

          setTimeout(() => {
            this._router.navigate(['/Login']);
          }, 10);
        });
    }
  }

  // Alternar visibilidad de contraseñas
  togglePasswordVisibility() {
    this.seePasswords = !this.seePasswords;
  }

}
