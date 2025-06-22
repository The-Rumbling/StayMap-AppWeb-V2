import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {Post} from '../model/post.entity';
import {catchError, retry} from 'rxjs';

const postsResourceEndPoint = environment.postsEndpointPath || '';


@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post>{
  constructor() {
    super();
    this.resourceEndpoint = postsResourceEndPoint;
  }

  public getByCommunityId(communityId: number) {
    return this.http.get<Array<Post>>(`${this.resourcePath()}?communityId=${communityId}`, this.httpOptions).pipe( retry(2), catchError(this.handleError));
  }
}
