import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHocLapTrinhComponent } from './page-hoc-lap-trinh.component';

describe('PageHocLapTrinhComponent', () => {
  let component: PageHocLapTrinhComponent;
  let fixture: ComponentFixture<PageHocLapTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHocLapTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHocLapTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
