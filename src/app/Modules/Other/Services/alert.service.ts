import { Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigurationAlert } from '../Interface/Others.interface';
import { ResponseMessages } from '../Interface/ResponseMessages.Interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  isVisible = signal(false);
  primaryText = signal('');
  secondaryText = signal('');
  type = signal('');
  duration?: number;

  constructor() { }

  openAlert(configuration: ConfigurationAlert) {
    this.isVisible.set(true);
    this.primaryText.set(configuration.primaryText);
    this.type.set(configuration.type);
    this.duration = configuration.duration || 5000;
    this.secondaryText.set(configuration.secondaryText || '');

    setTimeout(() => {
      this.closeAlert();
    }, this.duration);
  }

  closeAlert() {
    this.isVisible.set(false);
    this.primaryText.set('');
    this.secondaryText.set('');
  }

  showAlerts(res: ResponseMessages) {
    if (res.HasErrors) {
      res.ErrorMessages.forEach((error) => {
        this.openAlert({
          primaryText: 'Error',
          secondaryText: error,
          type: 'error',
        });
      });
    }
    if (res.HasWarnings) {
      res.WarningMessages.forEach((warning) => {
        this.openAlert({
          primaryText: 'Alerta',
          secondaryText: warning,
          type: 'warning',
        });
      });
    }
    if (res.HasSuccess) {
      res.SuccessMessages.forEach((success) => {
        this.openAlert({
          primaryText: 'Ok',
          secondaryText: success,
          type: 'success',
        });
      });
    }
  }
}
