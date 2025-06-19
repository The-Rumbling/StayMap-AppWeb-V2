import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPostListComponent } from './community-post-list.component';

describe('CommunityPostListComponent', () => {
  let component: CommunityPostListComponent;
  let fixture: ComponentFixture<CommunityPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPostListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
