import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountCouponService } from '../../../Other/Services/discount-coupon.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { DiscountCoupon } from '../../../Other/Models/Discount-coupon-model';

@Component({
  selector: 'app-discount-coupon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discount-coupon.component.html',
  styleUrl: './discount-coupon.component.css'
})
export class DiscountCouponComponent {
  couponName!: string;
  loading = false;
  @Input() hasAddedCoupon = false;

  @Output() couponEmit = new EventEmitter<string>();
  @Output() discountEmit = new EventEmitter<DiscountCoupon>();

  constructor(private _discountCouponService: DiscountCouponService, private _alertService: AlertService) { }

  async addCoupon() {
    if (!this.couponName) return;
    this.loading = true;
    await this._discountCouponService.findDiscountCoupon(this.couponName).subscribe((res: DiscountCoupon) => {
      this._alertService.showAlerts(res);

      if (res.Discount && !res.HasErrors || !res.HasWarnings) {
        this.discountEmit.emit(res)
      }
      this.couponName = "";
      this.loading = false;
    })
  }
}
