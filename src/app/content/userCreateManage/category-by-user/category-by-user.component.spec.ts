import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryByUserComponent } from './category-by-user.component';

describe('CategoryByUserComponent', () => {
  let component: CategoryByUserComponent;
  let fixture: ComponentFixture<CategoryByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
