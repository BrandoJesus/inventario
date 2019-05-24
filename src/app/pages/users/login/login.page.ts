import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, 
    private authService: AuthService) { }

  public email: string = '';
  public pass: string = '';

  ngOnInit() {
  }
  
  onLogin(): void {
    console.log(this.email);
    console.log(this.pass);
    
    this.authService.loginEmailUser(this.email, this.pass)
    .then((res) => {
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onLoginGoogle() {
    this.authService.loginGoogleUser()
    .then((res) => {
      console.log('onLoginGoogle ', res);
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onLoginFacebook() {
    this.authService.loginFacebookUser()
    .then((res) => {
      // console.log('onLoginFacebook ', res);
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onLogout() {
    this.authService.logoutUser();  
  }

  onloginRedirect() {
    this.router.navigate(['admin/list-books']);
  }
  
  messageError(err) {
    console.log('err ', err.message);
  }

}
