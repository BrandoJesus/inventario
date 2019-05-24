import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
import { NgForm, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() nombre;
  @Input() pais;

  constructor(public dataApi: DataApiService, private modalCtrl: ModalController) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('formBook') formBook: any;
  @Input() userUid: string;

  ngOnInit() {
    console.log('userUid ', this.userUid);    
    // console.log('dataApi ', this.dataApi.selectedBook);    
  }

  onClosed() {
    this.formBook.resetForm();
    this.modalCtrl.dismiss();
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      nombre: 'Raul',
      pais: 'Holanda'
    });
  }

  onSaveBook(bookForm: NgForm): void {
    if(bookForm.value.id == null){
      // new
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
      
    } else {
      // update
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.modalCtrl.dismiss();
    // this.btnClose.nativeElement.click();
  }
}
