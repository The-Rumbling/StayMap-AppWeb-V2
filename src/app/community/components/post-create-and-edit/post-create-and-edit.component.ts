import {Component, EventEmitter, Inject, Input, Optional, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {FormsModule, NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../../model/post.entity';
import {MatButton} from '@angular/material/button';
import {DropzoneImgComponent} from '../../../shared/components/dropzone-img/dropzone-img.component';

@Component({
  selector: 'app-post-create-and-edit',
  imports: [
    FormsModule,
    MatButton,
    DropzoneImgComponent
  ],
  templateUrl: './post-create-and-edit.component.html',
  styleUrl: './post-create-and-edit.component.css'
})
export class PostCreateAndEditComponent extends BaseFormComponent {
  @Input() post!: Post;
  @Input() editMode: boolean = false;
  @Output() add = new EventEmitter<Post>();
  @Output() update = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('postForm', { static: false }) protected postForm!: NgForm;
  @ViewChild(DropzoneImgComponent) protected dropzoneImgComponent!: DropzoneImgComponent;

  constructor(@Optional() private dialogRef?: MatDialogRef<PostCreateAndEditComponent>, @Optional() @Inject(MAT_DIALOG_DATA) private data?: { post: Post, editMode: boolean }){
    super();
    if (data) {
      this.post = { ...data.post };
      this.editMode = data.editMode;
    } else{
      this.post = new Post({});
    }
  }

  private isValid = () => this.postForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  onSubmit() {
    if (!this.isValid()) return;

    this.dropzoneImgComponent.upload().subscribe(imageUrl =>{
      this.post.imageUrl = imageUrl;
      if (this.editMode) {
        this.update.emit(this.post);
      } else {
        this.add.emit(this.post);
      }

      if (this.dialogRef) this.dialogRef.close(this.post);
    });
  }

  onCancel() {
    this.cancel.emit();
    if (this.dialogRef) this.dialogRef.close();
  }
}

