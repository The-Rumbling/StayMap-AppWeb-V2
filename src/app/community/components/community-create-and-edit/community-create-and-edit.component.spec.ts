import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCreateAndEditComponent } from './community-create-and-edit.component';

describe('CommunityCreateAndEditComponent', () => {
  let component: CommunityCreateAndEditComponent;
  let fixture: ComponentFixture<CommunityCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
