import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProblemeComponent } from './popup-probleme.component';

describe('PopupProblemeComponent', () => {
  let component: PopupProblemeComponent;
  let fixture: ComponentFixture<PopupProblemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupProblemeComponent]
    });
    fixture = TestBed.createComponent(PopupProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
