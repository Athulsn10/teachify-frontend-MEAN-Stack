import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservices/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router ){}
  registerUser(val: any){
    // console.log(val);
    this.userService.registerUser(val).subscribe(
      (response) => {
        console.log('User registration successful');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/user/dashboard']);
      },
      (error) => {
        console.error('Error during user registration:', error);
      }
    );
  }
}
