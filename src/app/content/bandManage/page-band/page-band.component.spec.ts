import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBandComponent } from './page-band.component';

describe('PageBandComponent', () => {
  let component: PageBandComponent;
  let fixture: ComponentFixture<PageBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
