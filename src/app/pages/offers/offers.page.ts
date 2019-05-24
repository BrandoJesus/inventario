import { Component, OnInit } from '@angular/core';
import { BookInterface } from './../../models/book';
import { DataApiService } from './../../services/data-api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public books: BookInterface[] = [];
  public book = '';

  ngOnInit() {
    this.dataApi.getAllBooks().subscribe(books => {
      books.forEach(el => {
        if(el.oferta == '1') this.books.push(el);
      });
      console.log('books ', this.books); 
    })
  }

}
