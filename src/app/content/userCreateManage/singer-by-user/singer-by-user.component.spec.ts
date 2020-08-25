import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerByUserComponent } from './singer-by-user.component';

describe('SingerByUserComponent', () => {
  let component: SingerByUserComponent;
  let fixture: ComponentFixture<SingerByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingerByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
