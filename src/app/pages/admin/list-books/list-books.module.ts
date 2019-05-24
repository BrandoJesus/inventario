import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListBooksPage } from './list-books.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalPage } from '../../modal/modal.page';
import { ModalPageModule } from '../../modal/modal.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: ListBooksPage
  }
];

@NgModule({
  entryComponents: [
    ModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ModalPageModule,
    ComponentsModule,
    NgxDatatableModule
  ],
  declarations: [ListBooksPage]
})
export class ListBooksPageModule {}
