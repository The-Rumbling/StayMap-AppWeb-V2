import {Component, inject, Input, OnInit} from '@angular/core';
import {Post} from '../../model/post.entity';
import {User} from '../../../users/model/user.entity';
import {UserService} from '../../../users/services/user.service';
import {MatCard, MatCardAvatar} from '@angular/material/card';

@Component({
  selector: 'app-community-post-card',
  imports: [
    MatCard,
    MatCardAvatar
  ],
  templateUrl: './community-post-card.component.html',
  styleUrl: './community-post-card.component.css'
})
export class CommunityPostCardComponent implements OnInit {
  @Input() post!: Post;
  user: User = new User({});
  userService= inject(UserService);

  ngOnInit(): void {
    this.userService.getById(this.post.userId).subscribe(user => this.user = user);
  }

  public getPostedAtText(post: Post): string {
    const date = new Date(post.postedAt);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return `${seconds}s`;
    } else if (minutes < 60) {
      return `${minutes}min`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
      return date.toLocaleDateString('es-ES', options)+".";
    }
  }
}
