import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPostCardComponent } from './community-post-card.component';

describe('CommunityPostCardComponent', () => {
  let component: CommunityPostCardComponent;
  let fixture: ComponentFixture<CommunityPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
