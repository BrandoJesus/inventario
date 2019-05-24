import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  public app_name: string = 'BookStore';
  public isLogged: boolean = false;

  constructor(private authService: AuthService, 
    private afAuth: AngularFireAuth) { }

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
