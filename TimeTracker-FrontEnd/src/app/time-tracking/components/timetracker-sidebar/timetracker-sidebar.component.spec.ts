import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetrackerSidebarComponent } from './timetracker-sidebar.component';

describe('TimetrackerSidebarComponent', () => {
  let component: TimetrackerSidebarComponent;
  let fixture: ComponentFixture<TimetrackerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetrackerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetrackerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
