import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../Modules/Other/Services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  isVisible = false;
  primaryText = '';
  secondaryText = '';
  type = '';

  constructor(private _alertServices: AlertService) {
    effect(() => {
      this.isVisible = this._alertServices.isVisible();
      this.primaryText = this._alertServices.primaryText();
      this.secondaryText = this._alertServices.secondaryText();
      this.type = this._alertServices.type();
    });
  }

  progressWidth = 100;
  private timer: any;

  showAlert() {
    this.isVisible = true;
    this.startProgressBar();
  }

  private startProgressBar() {
    this.progressWidth = 100;
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.progressWidth -= 1;
      if (this.progressWidth <= 0) {
        clearInterval(this.timer);
        this.isVisible = false;
      }
    }, 50); // Ajusta este valor para cambiar la velocidad
  }

  dismissAlert() {
    clearInterval(this.timer);
    this.isVisible = false;
  }
}
