import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsongToSingerComponent } from './addsong-to-singer.component';

describe('AddsongToSingerComponent', () => {
  let component: AddsongToSingerComponent;
  let fixture: ComponentFixture<AddsongToSingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsongToSingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsongToSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
