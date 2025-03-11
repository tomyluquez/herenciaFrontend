import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeFormComponent } from './size-form.component';

describe('SizeFormComponent', () => {
  let component: SizeFormComponent;
  let fixture: ComponentFixture<SizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
