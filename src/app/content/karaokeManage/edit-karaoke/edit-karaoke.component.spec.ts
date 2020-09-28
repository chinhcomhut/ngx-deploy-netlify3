import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKaraokeComponent } from './edit-karaoke.component';

describe('EditKaraokeComponent', () => {
  let component: EditKaraokeComponent;
  let fixture: ComponentFixture<EditKaraokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKaraokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKaraokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
