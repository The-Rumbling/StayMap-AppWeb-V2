export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  type: string;

  communitiesJoined: number[];
  upcomingConcerts: number[]; // NUEVO
  postsDone: number[];
  location:{
    lat:number;
    lng:number;
  }

  constructor(user:{id?:number, name?:string, email?:string, profileImage?:string, type?:string,upcomingConcerts?: number[], location?:{lat:number, lng:number}, password?:string, communitiesJoined?:number[], postsDone?:number[]}) {
    this.id = user.id || 0;
    this.name = user.name || "";
    this.email = user.email || "";
    this.profileImage = user.profileImage || "";
    this.type = user.type || "";

    this.upcomingConcerts = user.upcomingConcerts || []; // NUEVO
    this.location = user.location || {lat:0, lng:0 };
    this.password=user.password || "";
    this.communitiesJoined = user.communitiesJoined || [];
    this.postsDone = user.postsDone || [];
  }
}
