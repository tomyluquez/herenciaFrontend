import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCouponComponent } from './discount-coupon.component';

describe('DiscountCouponComponent', () => {
  let component: DiscountCouponComponent;
  let fixture: ComponentFixture<DiscountCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountCouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
