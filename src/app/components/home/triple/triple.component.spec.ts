import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleComponent } from './triple.component';

describe('TripleComponent', () => {
  let component: TripleComponent;
  let fixture: ComponentFixture<TripleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripleComponent]
    });
    fixture = TestBed.createComponent(TripleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
