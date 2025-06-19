import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertManagementComponent } from './concert-management.component';

describe('ConcertManagementComponent', () => {
  let component: ConcertManagementComponent;
  let fixture: ComponentFixture<ConcertManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
