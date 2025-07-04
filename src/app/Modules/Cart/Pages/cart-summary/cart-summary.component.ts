import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICartItemsVM } from '../../Interfaces/Cart.interface';
import { DiscountCouponComponent } from '../discount-coupon/discount-coupon.component';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { createOrderHelper } from '../../../Order/Helpers/create-order.helper';
import { DiscountCoupon } from '../../../Other/Models/Discount-coupon-model';
import { AuthService } from '../../../Auth/Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { CheckoutInfoVM } from '../../Models/checkoutInfoVM';
import { NgSelectModule } from '@ng-select/ng-select';
import { IPaymentsMethodsVM, IShippingMethodsVM } from '../../Interfaces/Checkout.interface';
import { ShippingCostEnum } from '../../../Other/Enums/Shipping-cost.enum';
import { OrderService } from '../../../Order/Services/order.service';
import { SaveOrderResponse } from '../../../Order/Models/SaveOrderResponse';
import { AlertService } from '../../../Other/Services/alert.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ModalService } from '../../../Other/Services/modal.service';
import { ProcessedOrderComponent } from '../../../Order/Pages/processed-order/processed-order.component';
import { EmailJSService } from '../../../Other/Services/emailJS.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [DiscountCouponComponent, CommonModule, ReactiveFormsModule, NgSelectModule, ModalComponent, ProcessedOrderComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent implements OnInit, OnChanges {
  @BlockUI() blockUI!: NgBlockUI;
  @Input() cartItems!: ICartItemsVM[];
  @Input() cartId!: number;
  checkOutInfo!: CheckoutInfoVM

  isLoading = true
  hasAddedCoupon = false
  isSubmitted = false

  couponDiscountPercentage = 0
  paymentDiscountPercentage = 0

  orderNumber = 0
  freeDelivery!: number;

  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private alertService: AlertService,
    private _modalService: ModalService,
    private _emailJSService: EmailJSService
  ) { }

  ngOnInit() {
    this.blockUI.start();
    this.cartService.getCheckoutInfo().subscribe((res: CheckoutInfoVM) => {
      this.blockUI.stop();
      if (res.HasErrors) return;
      this.isLoading = false
      this.checkOutInfo = res;
      this.freeDelivery = res.MinTotalToFreeShipping
      this.initForm();
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['firstChange']) {
      this.initForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      subtotal: [0],
      shippingCost: [0],
      shippingMethodId: [null, Validators.required],
      discountCoupon: [0],
      discountCouponPercentage: [0],
      discountCouponId: [0],
      discountPayment: [0],
      discountPaymentPercentage: [0],
      paymentMethodId: [null, Validators.required],
      total: [0],
      items: [this.cartItems],
      customerName: this.authService.getCustomerName() || '',
    });
    this.fillSubtotals();

  }

  fillSubtotals() {
    if (this.cartItems && this.cartItems.length > 0) {
      let subtotal = 0;
      for (let item of this.cartItems) {
        subtotal += item.Price * item.Quantity;
      }
      const shippingCost = this.getCurrentShippingCost(subtotal);
      const total = subtotal + shippingCost;

      this.form.patchValue({
        subtotal,
        shippingCost,
        total
      });
    } else {
      this.form.patchValue({
        subtotal: 0,
        discount: 0,
        discountPercentage: 0,
        total: 0
      });
    }
  }

  getCurrentShippingCost(subtotal: number): number {
    if (subtotal >= ShippingCostEnum.FREE_COST) return 0;
    const shippingForm = this.form?.get('shippingMethodId')?.value
    const shippingMethod = shippingForm ? this.checkOutInfo.ShippingMethods.find(s => s.Id == shippingForm) : null;

    if (!shippingMethod) return 0;
    return shippingMethod.Price;
  }
  applyDiscuntCoupon(discountCoupon: DiscountCoupon) {
    if (!discountCoupon.Discount || !discountCoupon.DiscountCouponId) return;
    const couponDiscountPercentage = discountCoupon.Discount;

    const subtotal = this.form.get('subtotal')?.value || 0;
    const shipping = this.form.get('shippingCost')?.value || 0;
    const discountPayment = this.form.get('discountPayment')?.value || 0;

    const baseTotal = subtotal + shipping;

    const discount = subtotal * (couponDiscountPercentage / 100);
    const total = baseTotal - discount - discountPayment;

    this.form.patchValue({
      discountCouponId: discountCoupon.DiscountCouponId,
      discountCouponPercentage: couponDiscountPercentage,
      discountCoupon: discount,
      total
    });
    this.hasAddedCoupon = true;
  }

  applyExtraPaymentDiscount(paymentMethod: IPaymentsMethodsVM): void {
    const paymentDiscountPercentage = Number(paymentMethod?.Disccount) || 0;

    const subtotal = this.form.get('subtotal')?.value || 0;
    const shipping = this.form.get('shippingCost')?.value || 0;
    const discountCoupon = this.form.get('discountCoupon')?.value || 0;

    const baseTotal = subtotal + shipping;

    const discount = subtotal * (paymentDiscountPercentage / 100);
    const total = baseTotal - discount - discountCoupon;

    this.form.patchValue({
      paymentMethodId: paymentMethod ? paymentMethod.Id : null,
      discountPaymentPercentage: paymentDiscountPercentage,
      discountPayment: discount,
      total
    });
  }

  applyChargeToShipping(shippingMethod: IShippingMethodsVM): void {
    const subtotal = this.form.get('subtotal')?.value
    if (shippingMethod && subtotal < this.freeDelivery) {
      const price = shippingMethod.Price;
      this.form.patchValue({
        shippingMethodId: shippingMethod.Id,
        shippingCost: price,
        total: this.form.get('subtotal')?.value + price
      });
    }
  }

  removeDiscount() {
    const subtotal = this.form.get('subtotal')?.value || 0;
    const shipping = this.form.get('shippingCost')?.value || 0;
    const discountPayment = this.form.get('discountPayment')?.value || 0;

    this.form.patchValue({
      discountCouponId: 0,
      discountCoupon: 0,
      discountCouponPercentage: 0,
      total: (subtotal + shipping) - discountPayment
    });
    this.hasAddedCoupon = false;
  }

  proceedToPayment() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.blockUI.start();
      const orderSummary = this.form.value;
      const newOrder = createOrderHelper(orderSummary, this.cartId);
      this.orderService.saveOrder(newOrder).subscribe(async (res: SaveOrderResponse) => {
        this.isSubmitted = false;
        this.alertService.showAlerts(res);
        if (res.HasErrors || res.HasWarnings) {
          return;
        }
        this.cartService.updateCartItems();
        this.orderNumber = res.OrderNumber
        const email = await this._emailJSService.sendEmailNewOrder(res.CustomerName, res.CustomerEmail, res.OrderNumber);
        if (!email) {
          this.alertService.openAlert({
            primaryText: 'Error al enviar el correo',
            secondaryText: 'El correo no pudo ser enviado, por favor contactanos a nuestro whatsapp',
            type: 'error'
          })
        }
        this.blockUI.stop();
        this.openModal()
      })
    }
  }

  getShippingCostText(): string {
    const shippingMethodId = this.form.get('shippingMethodId')?.value
    if (!shippingMethodId) return '';
    const subtotal = this.form.get('subtotal')?.value;
    if (subtotal >= this.freeDelivery) return 'Envio Gratis!';
    const shippingMethod = this.form.get('shippingMethodId')?.value
    const shippingMethodValue = shippingMethod ? this.checkOutInfo.ShippingMethods.find(s => s.Id == shippingMethod)?.Value || '' : '';
    return shippingMethodValue === 'countryDelivery' ? 'A convenir' : 'Envio Gratis!'
  }

  openModal() {
    this._modalService.toggleModal();
  }
}
