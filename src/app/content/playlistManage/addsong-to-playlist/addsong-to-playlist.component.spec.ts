import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsongToPlaylistComponent } from './addsong-to-playlist.component';

describe('AddsongToPlaylistComponent', () => {
  let component: AddsongToPlaylistComponent;
  let fixture: ComponentFixture<AddsongToPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsongToPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsongToPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
