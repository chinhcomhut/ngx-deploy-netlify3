import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSingerComponent } from './page-singer.component';

describe('SingerComponent', () => {
  let component: PageSingerComponent;
  let fixture: ComponentFixture<PageSingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
