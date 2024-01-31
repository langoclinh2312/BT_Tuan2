// books.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Book } from './share/models/book';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(bookId: string): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map((books) => books.find((book) => book.id.toString() === bookId))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    newBook.id = uuidv4();
    return this.http.post<Book>(this.apiUrl, newBook);
  }
  updateBook(updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${updatedBook.id}`, updatedBook);
  }

  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }

  searchBooksByKeyword(keyword: string): Observable<Book[]> {
    const url = `${this.apiUrl}?id=${keyword}`;
    return this.http.get<Book[]>(url);
  }

  filterBooksByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/filter?category=${category}`);
  }

  sortBooksBy(): Observable<Book[]> {
    // Create query parameters to sort by 'id' in ascending order and 'views' in descending order
    const params = new HttpParams().set('_sort', 'id,-views');

    // Send a GET request with the query parameters
    return this.http.get<Book[]>(this.apiUrl, { params });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('assets/categories.json');
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) {
      console.error('Resource not found:', error);
      return throwError('Resource not found');
    } else {
      console.error('An error occurred:', error);
      return throwError('An error occurred');
    }
  }
}


