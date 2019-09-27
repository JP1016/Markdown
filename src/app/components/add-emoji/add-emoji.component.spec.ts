import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmojiComponent } from './add-emoji.component';

describe('AddEmojiComponent', () => {
  let component: AddEmojiComponent;
  let fixture: ComponentFixture<AddEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
