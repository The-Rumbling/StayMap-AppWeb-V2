import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneImgComponent } from './dropzone-img.component';

describe('DropzoneImgComponent', () => {
  let component: DropzoneImgComponent;
  let fixture: ComponentFixture<DropzoneImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropzoneImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropzoneImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
