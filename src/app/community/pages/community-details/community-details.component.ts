import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Community} from '../../model/community.entity';
import {CommunityService} from '../../services/community.service';
import {MatToolbarRow} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {CommunityPostListComponent} from '../../components/community-post-list/community-post-list.component';
import {PostService} from '../../services/post.service';
import {Post} from '../../model/post.entity';
import {UserService} from '../../../users/services/user.service';
import {NgClass} from '@angular/common';
import {FormControl} from '@angular/forms';
import {UploadImageService} from '../../../shared/services/upload-image.service';
import {PostCreateAndEditComponent} from '../../components/post-create-and-edit/post-create-and-edit.component';

@Component({
  selector: 'app-community-details',
  imports: [
    MatToolbarRow,
    MatButton,
    CommunityPostListComponent,
    NgClass,
    PostCreateAndEditComponent,
  ],
  templateUrl: './community-details.component.html',
  styleUrl: './community-details.component.css'
})
export class CommunityDetailsComponent implements OnInit {
  private communityService = inject(CommunityService);
  private postService = inject(PostService);
  private userService = inject(UserService);
  private uploadImageService = inject(UploadImageService);

  protected community = new Community({});
  protected posts: Post[] = [];
  protected alreadyJoined: boolean = false;
  protected hoveringJoinBtn: boolean = false;
  protected isPostsBtnActive: boolean = true;
  protected newPost: Post = new Post({});
  protected isEditMode: boolean = false;
  protected isPostFormVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const communityIdStr = params.get('id');
      const communityId = communityIdStr ? +communityIdStr : null;
      if (communityId) {
        this.communityService.getById(communityId).subscribe(community => {
          this.userService.currentUser$.subscribe(user => {
            if(user && community.members.includes(user.id)) {
              this.alreadyJoined = true;
            }
          });
          this.community = community
          this.postService.getByCommunityId(this.community.id).subscribe(posts => this.posts = posts.reverse());
        });
      }
    });
  }

  protected onGoBackClicked(): void {
    this.router.navigate(['/communities']);
  }

  protected onJoinClicked(): void {
    if(this.alreadyJoined){
      //LEAVE A COMMUNITY
      this.leaveCommunity();
    } else {
      //JOIN A COMMUNITY
      this.joinCommunity();
    }
  }

  private joinCommunity(): void {
    this.userService.currentUser$.subscribe(userLogged => {
      if (userLogged && !this.community.members.includes(userLogged.id)) {
        this.communityService.update(this.community.id, {...this.community, members: [...this.community.members, userLogged.id]}).subscribe(
          community => this.community = community
        );
        this.userService.getById(userLogged.id).subscribe(user => {
          if (user) {
            this.userService.update(user.id, {...user, communitiesJoined: [...user.communitiesJoined, this.community.id]}).subscribe();
            this.alreadyJoined = true;
          }
        });
      }
      else {
        console.log('No user logged in.');
        this.router.navigate(['/login']);
      }
    });
  }

  private leaveCommunity(): void {
    this.userService.currentUser$.subscribe(userLogged => {
      if(userLogged) {
        this.userService.getById(userLogged.id).subscribe(user => {
          //Deleting userId from members array in Community Object
          const newMembers = this.community.members.filter(userId => userId !== user.id)
          this.communityService.update(this.community.id, {...this.community, members: newMembers }).subscribe(community => this.community = community);
          //Deleting communityId from communitiesJoined array in User Object
          const newCommunitiesJoined = user.communitiesJoined.filter(communityId => communityId !== this.community.id)
          this.userService.update(user.id, {...user, communitiesJoined: newCommunitiesJoined}).subscribe();
          //Updating alreadyJoin value since User have left the Community
          this.alreadyJoined = false;
        });
      }
    });
  }

  private createPost() {
    this.isPostFormVisible = false;
    this.userService.currentUser$.subscribe(userLogged => {
      if (userLogged) {
        this.userService.getById(userLogged.id).subscribe(user => {
          //Creating the new Post and adding it on Post endpoint
          this.newPost = {...this.newPost, id: new Date().getTime(), userId: user.id, communityId: this.community.id, postedAt: new Date().toISOString()};
          this.postService.create({...this.newPost}).subscribe(post => {
            //Resetting imageUrlAux Value for later createPost requests
            this.communityService.update(this.community.id, {...this.community, posts: [...this.community.posts, post.id]}).subscribe(community => this.community = community);
            this.userService.update(user.id, {...user, postsDone: [...user.postsDone, post.id]}).subscribe();
            //Updating posts array
            this.postService.getByCommunityId(this.community.id).subscribe(post => this.posts = post.reverse());
          });
        });
      }
    });
  }

  //POST FORM METHODS
  protected onCancelClicked(): void {
    this.isPostFormVisible = false;
  }

  protected onPostAddRequested(): void {
    this.createPost();
  }

  protected onPostUpdateRequested() {}
}
