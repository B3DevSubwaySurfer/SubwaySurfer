import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InkLevelGameComponent } from './ink-level-game.component';

describe('InkLevelGameComponent', () => {
  let component: InkLevelGameComponent;
  let fixture: ComponentFixture<InkLevelGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InkLevelGameComponent]
    });
    fixture = TestBed.createComponent(InkLevelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
