import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutes } from './cart.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CartRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CartComponent]
})
export class CartModule { }
