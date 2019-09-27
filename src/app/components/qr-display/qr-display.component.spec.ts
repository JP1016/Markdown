import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDisplayComponent } from './qr-display.component';

describe('QrDisplayComponent', () => {
  let component: QrDisplayComponent;
  let fixture: ComponentFixture<QrDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
