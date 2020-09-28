import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageKaraokeComponent } from './page-karaoke.component';

describe('PageKaraokeComponent', () => {
  let component: PageKaraokeComponent;
  let fixture: ComponentFixture<PageKaraokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageKaraokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageKaraokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
