import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrderStatusComponent } from './form-order-status.component';

describe('FormOrderStatusComponent', () => {
  let component: FormOrderStatusComponent;
  let fixture: ComponentFixture<FormOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOrderStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
