import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDiscountEditorComponent } from './coupon-discount-editor.component';

describe('CouponDiscountEditorComponent', () => {
  let component: CouponDiscountEditorComponent;
  let fixture: ComponentFixture<CouponDiscountEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponDiscountEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponDiscountEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
