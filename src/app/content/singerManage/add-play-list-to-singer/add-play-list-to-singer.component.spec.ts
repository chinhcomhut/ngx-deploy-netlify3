import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayListToSingerComponent } from './add-play-list-to-singer.component';

describe('AddPlayListToSingerComponent', () => {
  let component: AddPlayListToSingerComponent;
  let fixture: ComponentFixture<AddPlayListToSingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayListToSingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayListToSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
