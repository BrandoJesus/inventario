import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { UserInterface } from './../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthService) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  public providerId: string = 'null';

  ngOnInit() {
    this.authService.isAuth().subscribe( user =>{
      if(user) {
        console.log('this.user ', this.user);
        
        this.user.name  = user.displayName;
        this.user.email  = user.email;
        this.user.photoUrl  = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('USER ', this.user);
      }
    })
  }

}
