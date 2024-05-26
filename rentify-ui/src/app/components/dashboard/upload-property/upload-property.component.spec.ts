import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPropertyComponent } from './upload-property.component';

describe('UploadPropertyComponent', () => {
  let component: UploadPropertyComponent;
  let fixture: ComponentFixture<UploadPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
