import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertPageDetailsComponent } from './concert-page-details.component';

describe('ConcertPageDetailsComponent', () => {
  let component: ConcertPageDetailsComponent;
  let fixture: ComponentFixture<ConcertPageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertPageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
