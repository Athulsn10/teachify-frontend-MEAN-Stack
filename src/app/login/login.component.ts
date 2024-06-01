import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservices/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  showToast = false;
  toastMessage = ''; 

  constructor(private userService: UserService, private router: Router) {}

  loginUser(val: any) {
    this.isLoading = true;
    const { email, password } = val
    if (!email || !password) {
      this.showToast = true;
      this.toastMessage = 'Please fill all the fields';
      this.isLoading = false;
      return
    }
    this.userService.loginUser(val).subscribe(
      (response) => {
        // console.log('User login successful');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/user/dashboard']);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.toastMessage = error.error.message;
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        } else {
          // console.error('Error during user login:', error);
        }
      }
    );
  }
}
