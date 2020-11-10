import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHocLapTrinhComponent } from './detail-hoc-lap-trinh.component';

describe('DetailHocLapTrinhComponent', () => {
  let component: DetailHocLapTrinhComponent;
  let fixture: ComponentFixture<DetailHocLapTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHocLapTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHocLapTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
