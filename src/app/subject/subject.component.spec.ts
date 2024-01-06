import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubjectComponent } from './subject.component';

describe('SubjectComponent', () => {
  let component: AppSubjectComponent;
  let fixture: ComponentFixture<AppSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSubjectComponent]
    });
    fixture = TestBed.createComponent(AppSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
