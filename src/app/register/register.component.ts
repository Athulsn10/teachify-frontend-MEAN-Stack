import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservices/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) { }

  isLoading = false;
  showToast = false;
  toastMessage = '';

  registerUser(val: any) {
    this.isLoading = true;
    const { name, email, password } = val
    if (!name || !email || !password) {
      this.showToast = true;
      this.toastMessage = 'Please fill all the fields';
      this.isLoading = false;
      return
    }
    this.userService.registerUser(val).subscribe(
      (response) => {
        // console.log('User registration successful');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/user/dashboard']);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 400) {
          // console.log(error);
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
