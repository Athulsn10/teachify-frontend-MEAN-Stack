import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservices/user-service.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  userId!: string;
  favorites: any[] = [];

  constructor(private userService: UserService, private router: Router) {}
  userData: any;
  
  ngOnInit(): void {
    const localStorageData = localStorage.getItem('currentUser');
    if (localStorageData) {
      this.userData = JSON.parse(localStorageData);
      this.userId = this.userData._id;
      this.userService.getFavorites(this.userId).subscribe(
        (favorites) => {
          // console.log('User favorites:', favorites);
          this.favorites = favorites; 
        },
        (error) => {
          console.error('Error fetching favorites:', error);
        }
      );
    } else {
      console.error('No user data found in localStorage');
    }
  }

  removeFromFav(subjectId: string) {
    this.userService.removeFromFavorites(this.userId, subjectId).subscribe(
      (response) => {
        // console.log('Subject removed from favorites:', response);
        this.favorites = this.favorites.filter(subject => subject._id !== subjectId);
      },
      (error) => {
        console.error('Error removing subject from favorites:', error);
      }
    );
  }
  logoutUser(){
    localStorage.clear();
    location.reload();
  }
  
  navigateToLogin(){
    this.router.navigate(['user/login']) ;
  }
  navigateToDashboard() {
    this.router.navigate(['/user/dashboard']);
  }
}
