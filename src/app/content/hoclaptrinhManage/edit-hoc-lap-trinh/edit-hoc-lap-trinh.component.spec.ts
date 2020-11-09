import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHocLapTrinhComponent } from './edit-hoc-lap-trinh.component';

describe('EditHocLapTrinhComponent', () => {
  let component: EditHocLapTrinhComponent;
  let fixture: ComponentFixture<EditHocLapTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHocLapTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHocLapTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
