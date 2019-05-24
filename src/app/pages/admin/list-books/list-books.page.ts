import { Component, OnInit } from '@angular/core';
import { BookInterface } from './../../../models/book';
import { DataApiService } from './../../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.page.html',
  styleUrls: ['./list-books.page.scss'],
})
export class ListBooksPage implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService,
    private modalCtrl: ModalController) { }
  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  public rows: any = [];
  public columns: any = [];

  public selected = [];
  public book: BookInterface;

  ngOnInit() {
    this.inicializar();
    this.getListBooks();
    this.getCurrentUser();
  }

  inicializar() {
    this.columns = [
      { name: 'id' },
      { name: 'Titulo' },
      { prop: 'Autor' },
      { name: 'Descripcion' },
      { name: 'Idioma' },
      { name: 'Precio' },
    ];
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if(auth) {
        this.userUid = auth.uid;
        console.log('userUid ', this.userUid);
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
          // this.isAdmin = this.isAdmin.hasOwnProperty('admin');
        });
      }
    });
  }

  getListBooks() {
    this.dataApi.getAllBooks()
    .subscribe(books => {
      if(books.length > 0 ) {
        this.books = books;
        console.log('books ', books);
      }    
    });
  }

  onSelect({selected}) {
    if(selected.length) {
      selected = selected[0];
      this.book = selected;
      // console.log('selected ', this.selected);
      // this.ondetail(selected);
    }
  }

  onActivate(e) { }
  
  async onNewBook() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        userUid: this.userUid,
        nombre: 'Fernando',
        pais: 'Costa Rica'
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    // console.log( 'retorno : ', data );
    
  }

  onDeletebook(idBook: string): void {
    console.log('DELETE BOOK', idBook);
    const confirmacion = confirm('Are you sure?');
    if(confirmacion) this.dataApi.deleteBook(idBook);
  }

  // onPreUpdateBook(book: BookInterface) {
  async onPreUpdateBook(id: any) {
    // console.log('onPreUpdateBook ', this.books[id] );
    this.dataApi.selectedBook = Object.assign({}, this.books[id]);
    
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps:
       {
        userUid: this.userUid,
        nombre: 'Fernando',
        pais: 'Costa Rica'
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    // console.log( 'retorno : ', data );
    
    // console.log('book ', this.book);
    // console.log('selectedBook ', this.dataApi.selectedBook );

  }

}
