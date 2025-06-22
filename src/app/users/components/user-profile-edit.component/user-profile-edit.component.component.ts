import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-profile-edit.component.component.html',
  styleUrl: './user-profile-edit.component.component.css'
})
export class UserProfileEditComponentComponent {
  userData: User;

  constructor(
    public dialogRef: MatDialogRef<UserProfileEditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.userData = { ...data.user };
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.userData);
  }
}
