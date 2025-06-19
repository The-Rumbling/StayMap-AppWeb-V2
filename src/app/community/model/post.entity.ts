export class Post {
  id: number;
  userId: number;
  communityId: number;
  content: string;
  postedAt: string ;
  imageUrl: string;

  constructor(post:{id?:number, userId?:number, communityId?:number, content?: string, postedAt?: string, imageUrl?: string}) {
    this.id=post.id || 0;
    this.userId = post.userId || 0;
    this.communityId = post.communityId || 0;
    this.content = post.content || '';
    this.postedAt = post.postedAt || '';
    this.imageUrl = post.imageUrl || '';
  }
}
