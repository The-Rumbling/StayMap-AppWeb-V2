import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../users/services/user.service';
import {User} from '../../../users/model/user.entity';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected userRegistered=false;
  protected userService=inject(UserService);
  protected userData: User=new User({});
  isFan:boolean=false;

  constructor(private router: Router){}

  private getType(){
    return this.isFan ? 'Fan' : 'Artist';
  }

  protected onRegister() {
    if (!this.userData.id) {
      this.userData.id = Date.now();
    }
    if(!this.userData.profileImage){
      this.userData.profileImage="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=";
    }
    this.userData.location= { "lat": -12.076837528231636, "lng": -77.09347965592731 }
    console.log(this.userData);
    this.userService.create(this.userData).subscribe();
    this.userRegistered=true;
  }
}
