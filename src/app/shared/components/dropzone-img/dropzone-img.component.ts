import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDropzone} from '@ngx-dropzone/material';
import {FileInputDirective} from '@ngx-dropzone/cdk';
import {UploadImageService} from '../../services/upload-image.service';
import {map, Observable, of} from 'rxjs';

@Component({
  selector: 'app-dropzone-img',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatDropzone,
    FileInputDirective,
  ],
  templateUrl: './dropzone-img.component.html',
  styleUrl: './dropzone-img.component.css'
})
export class DropzoneImgComponent {
  protected filesCtrl = new FormControl<File[]>([]);
  private uploadImageService = inject(UploadImageService);

  public upload(): Observable<string> {
    if (!this.files.length)
      return of('');
    return this.uploadImageService.uploadImage(this.files);
  }

  get files() {
    const _files = this.filesCtrl.value;

    if (!_files) return [];
    return Array.isArray(_files) ? _files : [_files];
  }

  remove(file: File) {
    if (Array.isArray(this.filesCtrl.value)) {
      this.filesCtrl.setValue(this.filesCtrl.value.filter((i) => i !== file));
      return;
    }

    this.filesCtrl.setValue(null);
  }
}
