export class Community {
  id: number;
  name:string;
  posts: number[];
  image: string;
  description: string;
  members: number[];

  constructor(community:{id?: number, name?: string, posts?:number[], image?: string, description?: string, members?:number[]}) {
    this.id = community.id || 0;
    this.name = community.name|| '';
    this.posts=community.posts || [];
    this.image = community.image || '';
    this.description = community.description || '';
    this.members = community.members || [];
  }
}
