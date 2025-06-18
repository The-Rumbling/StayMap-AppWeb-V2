import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private serverUrl: string = environment.cloudinaryApiUrl;
  private cloudName: string = environment.cloudinaryCloudName;
  private uploadEndpoint: string = environment.cloudinaryImageUploadEndpointPath;
  private uploadPreset: string = environment.cloudinaryUploadPreset;

  constructor(private http: HttpClient) {}

  private resourcePath(): string {
    return `${this.serverUrl}${this.cloudName}${this.uploadEndpoint}`;
  }

  private upload(data: any): Observable<any> {
    return this.http.post(this.resourcePath(), data);
  }

  public uploadImage(files: File[]): Observable<string> {
    if (files.length === 0) return of('');

    const file_data: File = files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', this.uploadPreset);
    data.append('cloud_name', this.cloudName);

    return this.upload(data).pipe(
      map(result => {
        return result.secure_url;
      })
    );
  }
}
