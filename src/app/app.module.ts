import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FakeApiService } from './fake-api.service';
import { BooksModule } from './books/books.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { CartModule } from './cart/cart.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterTestingModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    BooksModule,
    CartModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    FakeApiService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
