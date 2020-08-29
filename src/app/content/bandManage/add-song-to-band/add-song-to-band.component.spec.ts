import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongToBandComponent } from './add-song-to-band.component';

describe('AddSongToBandComponent', () => {
  let component: AddSongToBandComponent;
  let fixture: ComponentFixture<AddSongToBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSongToBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongToBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
