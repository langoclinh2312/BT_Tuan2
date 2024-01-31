// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // Khai báo các thành phần, directive, pipe của bạn tại đây
  ],
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  exports: [
    // Xuất các thành phần, directive, pipe của bạn để chúng có thể được sử dụng trong các module khác
  ],
})
export class SharedModule {}
