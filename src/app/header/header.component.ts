import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }
  
  navigateToDashboard() {
    this.router.navigate(['/user/dashboard']);
  }
  navigateToLogin(){
    this.router.navigate(['user/login']) ;
  }
  navigateToRegister(){
    this.router.navigate(['user/register'])
  }
  userData: any; 
  ngOnInit(): void {
    const localStorageData = localStorage.getItem('currentUser');
    this.userData = localStorageData ? JSON.parse(localStorageData) : null;
  }
  
}
