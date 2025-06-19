import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateAndEditComponent } from './post-create-and-edit.component';

describe('PostCreateAndEditComponent', () => {
  let component: PostCreateAndEditComponent;
  let fixture: ComponentFixture<PostCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
