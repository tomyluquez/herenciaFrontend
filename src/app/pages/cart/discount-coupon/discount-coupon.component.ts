import { Component, EventEmitter, input, Output } from '@angular/core';
import { InputTextComponent } from '../../../shared/components/Inputs/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountCouponService } from '../../../services/discount-coupon.service';
import { AlertService } from '../../../services/alert.service';

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

  @Output() couponEmit = new EventEmitter<string>();
  @Output() discountEmit = new EventEmitter<number>();

  constructor(private _discountCouponService: DiscountCouponService, private _alertService: AlertService) { }

  async addCoupon() {
    if (!this.couponName) return;
    this.loading = true;
    await this._discountCouponService.findDiscountCoupon(this.couponName).subscribe((res) => {
      this._alertService.showAlerts(res);

      if (res.Discount && !res.HasErrors || !res.HasWarnings) {
        this.discountEmit.emit(res.Discount)
      }
      this.couponName = "";
      this.loading = false;
    })
  }
}
