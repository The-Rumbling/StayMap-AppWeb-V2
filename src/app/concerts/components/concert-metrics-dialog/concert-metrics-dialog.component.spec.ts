import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertMetricsDialogComponent } from './concert-metrics-dialog.component';

describe('ConcertMetricsDialogComponent', () => {
  let component: ConcertMetricsDialogComponent;
  let fixture: ComponentFixture<ConcertMetricsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertMetricsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertMetricsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
