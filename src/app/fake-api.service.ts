// fake-api.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  private users: { username: string; password: string }[] = [];

  constructor() {
    // Thêm một vài người dùng giả lập vào dữ liệu
    this.users.push({ username: 'user1', password: 'pass1' });
    this.users.push({ username: 'user2', password: 'pass2' });
  }

  // API giả lập đăng nhập
  authenticate(username: string, password: string): Observable<any> {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      // Nếu tìm thấy người dùng, trả về thông tin xác thực giả lập
      return of({ token: 'exampleToken', roles: ['user'] });
    } else {
      // Nếu không tìm thấy, sử dụng throwError để tạo một observable lỗi
      return throwError('Invalid credentials');
    }
  }
}
