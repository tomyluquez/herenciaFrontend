import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGeneralComponent } from './form-general.component';

describe('FormGeneralComponent', () => {
  let component: FormGeneralComponent;
  let fixture: ComponentFixture<FormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
