import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListFormUpdateComponent } from './price-list-form-update.component';

describe('PriceListFormUpdateComponent', () => {
  let component: PriceListFormUpdateComponent;
  let fixture: ComponentFixture<PriceListFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceListFormUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceListFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
