import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  Optional,
  Inject
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BaseFormComponent } from '../../../shared/components/base-form.component';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Community } from '../../model/community.entity';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-community-create-and-edit',
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatDialogModule
  ],
  templateUrl: './community-create-and-edit.component.html',
  styleUrl: './community-create-and-edit.component.css'
})
export class CommunityCreateAndEditComponent extends BaseFormComponent {
  @Input() community!: Community;
  @Input() editMode: boolean = false;
  @Output() add = new EventEmitter<Community>();
  @Output() update = new EventEmitter<Community>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('communityForm', { static: false }) protected communityForm!: NgForm;

  constructor(
    @Optional() private dialogRef?: MatDialogRef<CommunityCreateAndEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data?: { community: Community, editMode: boolean }
  ) {
    super();

    if (data) {
      this.community = { ...data.community };
      this.editMode = data.editMode;
    } else {
      this.community = new Community({});
    }
  }

  showForm = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  private resetEditState() {
    this.community = new Community({});
    this.editMode = false;
    this.communityForm.reset();
  }

  private isValid = () => this.communityForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  onSubmit() {
    if (!this.isValid()) return;

    // que el id se agregue como number
    if (typeof this.community.id === 'string') {
      this.community.id = parseInt(this.community.id, 10);
    }

    if (this.editMode) {
      this.update.emit(this.community);
    } else {
      this.add.emit(this.community);
    }

    if (this.dialogRef) this.dialogRef.close(this.community);
  }

  onCancel() {
    this.cancel.emit();
    if (this.dialogRef) this.dialogRef.close();
  }
}
