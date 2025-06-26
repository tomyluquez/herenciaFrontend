import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { IDiscountCoupon } from '../../Interface/DiscountCoupon.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../Services/alert.service';
import { ConfigService } from '../../../Config/Services/config.service';
import { ResponseMessages } from '../../Interface/ResponseMessages.Interface';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupon-discount-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule, FormErrorComponent],
  templateUrl: './coupon-discount-editor.component.html',
  styleUrl: './coupon-discount-editor.component.css'
})
export class CouponDiscountEditorComponent implements OnChanges {
  @BlockUI('coupon-form') blockUI!: NgBlockUI
  @Input() coupon!: IDiscountCoupon | null;
  @Output() newCoupon = new EventEmitter<IDiscountCoupon>();

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
    if (!changes['coupon'].firstChange) {
      this.coupon = changes['coupon'].currentValue;
      this.createForm();
    }
  }

  createForm() {
    this.form = new FormGroup({
      Name: new FormControl(this.coupon ? this.coupon.Name : null),
      Discount: new FormControl(this.coupon ? this.coupon.Discount : 0, Validators.required),
      IsActive: new FormControl(this.coupon ? this.coupon.IsActive : true, Validators.required),
    })
  }

  uploadCoupon() {
    if (this.form.invalid) return;

    this.blockUI.start();
    const newCoupon = this.getCoupon();
    this._configService.saveCoupon(newCoupon).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.coupon = newCoupon;
        this.newCoupon.emit(newCoupon);
      }
      this.blockUI.stop();
    })
  }

  getCoupon(): IDiscountCoupon {
    const newCoupon = {
      Id: this.coupon ? this.coupon.Id : 0,
      Name: this.form.controls['Name'].value,
      Discount: this.form.controls['Discount'].value,
      IsActive: this.form.controls['IsActive'].value,
      DateCreated: this.coupon ? this.coupon.DateCreated : new Date().toUTCString()
    }
    return newCoupon;
  }
}
