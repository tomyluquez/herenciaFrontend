import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDiscountListComponent } from './coupon-discount-list.component';

describe('CouponDiscountListComponent', () => {
  let component: CouponDiscountListComponent;
  let fixture: ComponentFixture<CouponDiscountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponDiscountListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
