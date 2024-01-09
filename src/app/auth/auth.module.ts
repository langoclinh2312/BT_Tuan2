// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FakeApiService } from '../fake-api.service';
import { FormsModule } from '@angular/forms';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authRoutes)
  ],
  providers: [
    FakeApiService  
  ],
  exports: [RouterModule]
})
export class AuthModule { }
