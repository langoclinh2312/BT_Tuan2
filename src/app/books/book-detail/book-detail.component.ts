// book-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: any; // Replace 'any' with the actual type of your book data

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if (bookId) {
        this.booksService.getBookById(bookId).subscribe(
          (result) => {
            this.book = result;
          },
          (error) => {
            console.error('Error loading book details:', error);
          }
        );
      }
    });
  }

  addToCart(book: any) {
    // Implement your add to cart logic here
    this.cartService.addToCart(book);
  }

  goBack() {
    this.router.navigate(['/books']); // Adjust the route as needed
  }
}
