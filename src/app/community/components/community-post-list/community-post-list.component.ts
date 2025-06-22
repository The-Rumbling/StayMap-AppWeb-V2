import {Component, Input} from '@angular/core';
import {Post} from '../../model/post.entity';
import {CommunityPostCardComponent} from '../community-post-card/community-post-card.component';

@Component({
  selector: 'app-community-post-list',
  imports: [
    CommunityPostCardComponent
  ],
  templateUrl: './community-post-list.component.html',
  styleUrl: './community-post-list.component.css'
})
export class CommunityPostListComponent{
  @Input() posts: Post[] = [];
}
