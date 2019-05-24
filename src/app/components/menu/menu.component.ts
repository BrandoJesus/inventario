import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Observable } from 'rxjs';
import { Menu } from '../../models/menu';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menu: Observable<Menu[]>;
  isLogged: boolean = false;

  constructor(private dataApiService: DataApiService, private afAuth: AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.menu = this.dataApiService.getOptMenu();
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

  logout() {
    this.afAuth.auth.signOut();
    console.log('logout');    
  }

}
