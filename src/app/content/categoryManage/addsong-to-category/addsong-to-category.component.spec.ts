import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsongToCategoryComponent } from './addsong-to-category.component';

describe('AddsongToCategoryComponent', () => {
  let component: AddsongToCategoryComponent;
  let fixture: ComponentFixture<AddsongToCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsongToCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsongToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
