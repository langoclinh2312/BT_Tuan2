// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.validateFields()) {
      return;
    }

    this.authService.authenticate(this.username, this.password).subscribe(
      (data) => {
        if(data.roles === 'admin') {
          this.router.navigate(['/admin']);
        }
        if(data.roles === 'user') {
          this.router.navigate(['/books']);
        }
        this.errorMessage = 'Đăng nhập thành công';
      },
      (error) => {
        // Xử lý khi xác thực thất bại
        this.errorMessage = 'Tên người dùng hoặc mật khẩu không chính xác. Vui lòng thử lại.';
      }
    );
  }

  private validateFields(): boolean {
    if (!this.username || !this.password) {
      this.errorMessage = 'Vui lòng nhập tên người dùng và mật khẩu.';
      return false;
    }
    return true;
  }
  logout(): void {
    // Xóa mã xác thực khỏi local storage
    this.authService.logout();
    this.errorMessage = 'Đăng xuất thành công';
    // Chuyển hướng người dùng đến trang đăng nhập
    this.router.navigate(['/login']);
  }
}
