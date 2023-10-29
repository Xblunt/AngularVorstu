import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditorComponent } from './student-editor.component';

describe('StudentEditorComponent', () => {
  let component: StudentEditorComponent;
  let fixture: ComponentFixture<StudentEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEditorComponent]
    });
    fixture = TestBed.createComponent(StudentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
