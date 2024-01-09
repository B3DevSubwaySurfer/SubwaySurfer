import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationPreviewComponent } from './station-preview.component';

describe('StationPreviewComponent', () => {
  let component: StationPreviewComponent;
  let fixture: ComponentFixture<StationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
