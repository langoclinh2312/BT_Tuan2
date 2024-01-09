// utils/auth-utils.ts
export class AuthUtils {
    static isAuthenticated(): boolean {
      // Kiểm tra xem người dùng có đăng nhập hay không
      // (Bạn có thể sử dụng AuthService hoặc kiểm tra local storage, cookie, hoặc thông tin người dùng từ API)
      // Đây chỉ là một ví dụ đơn giản, bạn cần thay đổi nó tùy thuộc vào cách bạn quản lý thông tin đăng nhập.
      const authToken = localStorage.getItem('authToken');
      return !!authToken;
    }
  
    static isAdmin(): boolean {
      // Kiểm tra xem người dùng có quyền admin hay không
      // (Tương tự như isAuthenticated, bạn có thể sử dụng AuthService hoặc kiểm tra thông tin người dùng từ API)
      // Đây chỉ là một ví dụ đơn giản, bạn cần thay đổi nó tùy thuộc vào cách bạn quản lý thông tin đăng nhập và vai trò người dùng.
      const userRoles = localStorage.getItem('authRoles');
      return userRoles ? JSON.parse(userRoles).includes('admin') : false;
    }
  }
  