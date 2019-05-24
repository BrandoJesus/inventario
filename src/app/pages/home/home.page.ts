import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../../services/data-api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService, 
    private afAuth: AngularFireAuth) { }
  public books = [];
  public book = '';
  
  public app_name: string = 'BookStore';
  public isLogged: boolean = false;

  ngOnInit() {
    this.dataApi.getAllBooks().subscribe(books => {
      this.books = books;
      console.log('books ', books); 
    });
    // this.getCurrentUser();
  }
  
  // getCurrentUser() {
  //   this.authService.isAuth().subscribe(auth => {
  //     if(auth) {
  //       console.log('user logged');
  //       this.isLogged = true;
  //     } 
  //     else {
  //       console.log('NOT user logged');
  //       this.isLogged = false;
  //     } 
      
  //   });
  // }

  onLogout() {
    this.afAuth.auth.signOut();
    console.log('logout');    
  }

}
