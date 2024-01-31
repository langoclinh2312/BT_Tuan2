import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Observable } from 'rxjs';
import { Book } from '../share/models/book';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  [x: string]: any;
  searchKeyword: string = '';
  books: Book[] | undefined;
  sortedBooks: Book[] | undefined;
  categories: string[] = [];
  selectedCategory: string | undefined;
  selectedSortCriteria: string = 'title';

  newBookForm: FormGroup;
  updateBookForm: FormGroup ;
  isUpdateModalOpen: boolean = false;
  isAddNewModalOpen: boolean = false;
  
  constructor(
    private booksService: BooksService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
  ) {
    this.newBookForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      author: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: [''],
      category: [[]],
      year: [0],
      rating: [[]],
      image: [''],
    });
    
    this.updateBookForm = this.formBuilder.group({
      id:['', Validators.required],
      title: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      author: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: [''],
      category: [[]],
      year: [0],
      rating: [[]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
   
  }
  openAddBookForm() {
    this.isAddNewModalOpen = true;
  }

  closeAddBookForm() {
    this.isAddNewModalOpen = false;
    this.newBookForm.reset();
  }

  getBooks(): void {
    this.booksService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.sortedBooks = [...books]; // Initialize sortedBooks with the original data
      },
      (error: any) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  getCategories(): void {
    // Fetch categories from the server
    this.booksService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  viewDetails(book: Book): void {
    // Navigate to the book details page using the book's ID
    this.router.navigate(['/books', book.id]);
  }

  addToCart(book: Book): void {
    // Implement the logic to add the book to the shopping cart
    this.cartService.addToCart(book);
  }

  sortBooks(): void {
    this.booksService.sortBooksBy().subscribe(
      (sortedBooks: Book[]) => {
        console.log(sortedBooks);
        this.sortedBooks = sortedBooks;
      },
      (error: any) => {
        console.error('Error sorting books:', error);
      }
    );
  }
  
  
  addBook(): void {
    if (this.newBookForm.valid) {
      this.booksService.addBook(this.newBookForm.value).subscribe(
        (addedBook: Book) => {
          // Optionally, you can do something with the added book
          console.log('Book added:', addedBook);

          // Clear the form after successful addition
          this.newBookForm.reset();
        },
        (error: any) => {
          console.error('Error adding book:', error);
        },
        () => {
          this.getBooks();
        }
      );
    } else {
      // Form is not valid, handle validation errors or show a message
      console.error('Form is not valid.');
    }
  }
 
  
  // Method to delete a book
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksService.deleteBook(bookId).subscribe(
        () => {
          // Remove the deleted book from the local list
          this.books = this.books?.filter(book => book.id.toString() !== bookId);
          this.sortedBooks = [...this.books!];
        },
        (error: any) => {
          console.error('Error deleting book:', error);
        },
        () => {
          this.getBooks();
        }
      );
    }
  }
  updateBook(): void {
    if (this.updateBookForm.valid) {
      console.log(this.updateBookForm)
      const updatedBook = { ...this.updateBookForm.value };
      this.booksService.updateBook(updatedBook).subscribe(
        (result) => {
          console.log('Book updated:', result);
          // Close the modal after updating
          this.closeUpdateModal();
          // Optionally, you can refresh the book list or perform other actions
          this.getBooks();
        },
        (error) => {
          console.error('Error updating book:', error);
        },
        () => {
          this.getBooks();
        }
      );
    }
  }

  openUpdateModal(): void {
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal(): void {
    this.isUpdateModalOpen = false;
  }
  

  filterBooksByCategory(): void {
    if (this.selectedCategory) {
      this.booksService.filterBooksByCategory(this.selectedCategory).subscribe(
        (filteredBooks: Book[]) => {
          this.sortedBooks = filteredBooks;
        },
        (error: any) => {
          console.error('Error filtering books by category:', error);
        }
      );
    } else {
      this.sortedBooks = [...this.books!]; // Reset to show all books when no category is selected
    }
  }

  searchBooks(): void {
    if (this.searchKeyword.trim() !== '') {
      this.booksService.searchBooksByKeyword(this.searchKeyword).subscribe(
        (searchedBooks: Book[]) => {
          this.sortedBooks = searchedBooks;
        },
        (error: any) => {
          console.error('Error searching books by keyword:', error);
        }
      );
    } else {
      this.sortedBooks = [...this.books!]; // Reset to show all books when no keyword is entered
    }
  }
}
