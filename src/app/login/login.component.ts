import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservices/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router ){}

loginUser(val:any){
  // console.log(val);

  this.userService.loginUser(val).subscribe(
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
