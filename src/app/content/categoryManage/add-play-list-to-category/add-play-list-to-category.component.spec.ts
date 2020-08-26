import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayListToCategoryComponent } from './add-play-list-to-category.component';

describe('AddPlayListToCategoryComponent', () => {
  let component: AddPlayListToCategoryComponent;
  let fixture: ComponentFixture<AddPlayListToCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayListToCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayListToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
