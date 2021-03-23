import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarViewComponent } from './side-bar-view.component';

describe('SideBarViewComponent', () => {
  let component: SideBarViewComponent;
  let fixture: ComponentFixture<SideBarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
