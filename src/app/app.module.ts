import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FakeApiService } from './fake-api.service';
import { appRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    appRoutingModule
  ],
  providers: [
    FakeApiService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
