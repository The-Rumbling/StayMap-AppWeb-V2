import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditComponentComponent } from './user-profile-edit.component.component';

describe('UserProfileEditComponentComponent', () => {
  let component: UserProfileEditComponentComponent;
  let fixture: ComponentFixture<UserProfileEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileEditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
