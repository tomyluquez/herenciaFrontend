import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Category/Services/category.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { IConfig } from '../../Interfaces/Config-list.interface';
import { ConfigService } from '../../Services/config.service';

@Component({
  selector: 'app-config-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule, FormErrorComponent],
  templateUrl: './config-form.component.html',
  styleUrl: './config-form.component.css'
})
export class ConfigFormComponent {
  @BlockUI('config-form') blockUI!: NgBlockUI
  @Input() config!: IConfig | null;
  @Output() newConfig = new EventEmitter<IConfig>();

  form!: FormGroup
  loading = true;

  constructor(private _configService: ConfigService, private _alertService: AlertService) {
  }

  ngOnInit() {
    this.blockUI.start();
    this.createForm();
    this.blockUI.stop();
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['config'].firstChange) {
      this.config = changes['config'].currentValue;
      this.createForm();
    }
  }

  createForm() {
    this.form = new FormGroup({
      Name: new FormControl(this.config ? this.config.Name : null),
      Value: new FormControl(this.config ? this.config.Value : null, Validators.required)
    })
  }

  uploadConfig() {
    if (this.form.invalid) return;

    this.blockUI.start();
    const newConfig = this.getCategory();
    this._configService.saveConfig(newConfig).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.config = newConfig;
        this.newConfig.emit(newConfig);
      }
      this.blockUI.stop();
    })
  }

  getCategory(): IConfig {
    const newConfig = {
      Id: this.config ? this.config.Id : 0,
      Name: this.form.controls['Name'].value,
      Value: this.form.controls['Value'].value
    }
    return newConfig;
  }
}
