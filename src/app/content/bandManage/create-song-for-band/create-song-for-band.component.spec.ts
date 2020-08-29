import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSongForBandComponent } from './create-song-for-band.component';

describe('CreateSongForBandComponent', () => {
  let component: CreateSongForBandComponent;
  let fixture: ComponentFixture<CreateSongForBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSongForBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSongForBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
