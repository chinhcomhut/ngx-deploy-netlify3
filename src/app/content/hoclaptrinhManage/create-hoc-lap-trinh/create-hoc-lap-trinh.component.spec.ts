import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHocLapTrinhComponent } from './create-hoc-lap-trinh.component';

describe('CreateHocLapTrinhComponent', () => {
  let component: CreateHocLapTrinhComponent;
  let fixture: ComponentFixture<CreateHocLapTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHocLapTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHocLapTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
