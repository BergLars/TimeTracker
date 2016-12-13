/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryformComponent } from './queryform.component';

describe('QueryformComponent', () => {
  let component: QueryformComponent;
  let fixture: ComponentFixture<QueryformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
