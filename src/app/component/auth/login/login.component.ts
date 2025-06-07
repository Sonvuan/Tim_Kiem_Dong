import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // để styleUrls là mảng
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = ''; 

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // submit() {
  //   const userData = {
  //     email: this.email,
  //     password: this.password,
  //   };

  //   this.authService.login(userData).subscribe({
  //     next: (response) => {
  //       if (response && response.token) {
  //         localStorage.setItem('user', JSON.stringify(response));
  //         Swal.fire({
  //             toast: true,
  //             position: 'top-end',
  //             icon: 'success',
  //             title: 'Đăng nhập thành công!',
  //             showConfirmButton: false,
  //             timer: 3000,
  //             timerProgressBar: true
  //           });
  //         this.router.navigate(['/admin/list']);
  //       } else {
  //         Swal.fire('Lỗi', 'Đăng nhập không thành công', 'error');
  //       }
  //     },
  //     error: (err) => {
  //       if (err.status === 401) {
  //         Swal.fire('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng', 'error');
  //       } else if (err.status === 403) {
  //         Swal.fire('Lỗi Token', 'Không Có token ', 'error');
  //       }
  //     }
  //   });

  //   // không trả về token, chỉ trả về user
  //   // this.authService.login(userData).subscribe({
  //   //   next: () => {
  //   //     Swal.fire({
  //   //       toast: true,
  //   //       position: 'top-end',
  //   //       icon: 'success',
  //   //       title: 'Đăng nhập thành công!',
  //   //       showConfirmButton: false,
  //   //       timer: 3000,
  //   //       timerProgressBar: true
  //   //     });
  //   //     this.router.navigate(['/admin/list']);
  //   //   },
  //   //   error: (err) => {
  //   //     if (err.status === 401) {
  //   //       Swal.fire('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng', 'error');
  //   //     } else if (err.status === 403) {
  //   //       Swal.fire('Lỗi Token', 'Không Có token ', 'error');
  //   //     }
  //   //   }
  //   // });

  // }
  submit() {
  const userData = {
    email: this.email,
    password: this.password,
    role:this.role,
  };

  this.authService.login(userData).subscribe({
    next: (response) => {
      console.log('Login response:', response); 
      if (response && response.token) {
        localStorage.setItem('user', JSON.stringify(response));

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });

        // ⚠️ Phân quyền theo role
        if (response.role === 'ROLE_ADMIN'||response.role === 'ROLE_STAFF') {
          this.router.navigate(['/admin/list']);
        } else if (response.role === 'ROLE_USER') {
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Lỗi', 'Tài Khoản chưa có trong hệ thống', 'error');
        }

      } else {
        Swal.fire('Lỗi', 'Đăng nhập không thành công', 'error');
      }
    },
    error: (err) => {
      if (err.status === 401) {
        Swal.fire('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng', 'error');
      } else if (err.status === 403) {
        Swal.fire('Lỗi Token', 'Không Có token ', 'error');
      }
    }
  });
}


}
