import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemCartComponent } from './card-item-cart.component';

describe('CardItemCartComponent', () => {
  let component: CardItemCartComponent;
  let fixture: ComponentFixture<CardItemCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardItemCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardItemCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
