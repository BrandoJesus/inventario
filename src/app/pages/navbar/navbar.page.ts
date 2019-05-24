import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  constructor(private authService: AuthService, 
    private afAuth: AngularFireAuth ) { }

  public app_name: string = 'BookStore';
  public isLogged: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if(auth) {
        // console.log('user logged');
        this.isLogged = true;
      } 
      else {
        // console.log('NOT user logged');
        this.isLogged = false;
      } 
      
    });
  }

  onLogout() {
    this.afAuth.auth.signOut();
    console.log('logout');    
  }

}
