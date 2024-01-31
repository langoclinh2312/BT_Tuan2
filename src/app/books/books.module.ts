// books.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.routing';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CartService } from '../cart/cart.service';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BookDetailComponent,
    BookListComponent,
  ],
  providers: [
    { provide: 'UUID', useValue: uuidv4 }, // Use the 'UUID' token for injection
    CartService
  ],
})
export class BooksModule { }
