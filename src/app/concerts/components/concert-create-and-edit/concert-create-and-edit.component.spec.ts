import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertCreateAndEditComponent } from './concert-create-and-edit.component';

describe('ConcertCreateAndEditComponent', () => {
  let component: ConcertCreateAndEditComponent;
  let fixture: ComponentFixture<ConcertCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
