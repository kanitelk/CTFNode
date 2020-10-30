import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvesListComponent } from './solves-list.component';

describe('SolvesListComponent', () => {
  let component: SolvesListComponent;
  let fixture: ComponentFixture<SolvesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolvesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
