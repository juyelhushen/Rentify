import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCardComponent } from './house-card.component';

describe('HouseCardComponent', () => {
  let component: HouseCardComponent;
  let fixture: ComponentFixture<HouseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
