import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCardsHomeComponent } from './container-cards-home.component';

describe('ContainerCardsHomeComponent', () => {
  let component: ContainerCardsHomeComponent;
  let fixture: ComponentFixture<ContainerCardsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerCardsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerCardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
