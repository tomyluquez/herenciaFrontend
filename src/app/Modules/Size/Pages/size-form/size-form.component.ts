import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { ISizeListVM } from '../../Interface/Size.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SizesService } from '../../Services/sizes.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-size-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule, FormErrorComponent],
  templateUrl: './size-form.component.html',
  styleUrl: './size-form.component.css'
})
export class SizeFormComponent {
  @BlockUI('size-form') blockUI!: NgBlockUI
  @Input() size!: ISizeListVM | null;
  @Output() newSize = new EventEmitter<ISizeListVM | null>();

  form!: FormGroup
  loading = true;

  constructor(private _sizeSerivice: SizesService, private _alertService: AlertService) {
  }

  ngOnInit() {
    this.blockUI.start('Cargando...');
    this.createForm();
    this.blockUI.stop();
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['size'].firstChange) {
      this.size = changes['size'].currentValue;
      this.createForm();
    }
  }

  createForm() {
    this.form = new FormGroup({
      Name: new FormControl(this.size ? this.size.Name : null, Validators.required)
    })
  }

  uploadSize() {
    if (this.form.invalid) return;

    this.blockUI.start('Cargando...');
    const newSize = this.getSize();
    this._sizeSerivice.saveSize(newSize).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.size = newSize;
      }
      this.newSize.emit(this.size);
      this.blockUI.stop();
    })
  }

  getSize(): ISizeListVM {
    const newSize = {
      Id: this.size ? this.size.Id : 0,
      Name: this.form.controls['Name'].value,
    }
    return newSize;
  }

}
