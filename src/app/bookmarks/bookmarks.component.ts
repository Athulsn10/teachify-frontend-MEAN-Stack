import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservices/user-service.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  userId!: string; // Definite assignment assertion

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const localStorageData = localStorage.getItem('currentUser');
    
    if (!localStorageData) {
      // Redirect to login page if currentUser is not present
      this.router.navigate(['/login']);
      return;
    }

    const userData = JSON.parse(localStorageData);
    this.userId = userData._id;
    // console.log(this.userId);

    if (!this.userId) {
      // Redirect to login page if userId is not present
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getFavorites(this.userId).subscribe((favorites) => {
      console.log('User favorites:', favorites);
    });
  }

  addToFavorites(subjectId: string): void {
    if (!this.userId) {
      // Redirect to login page if userId is not present
      this.router.navigate(['/login']);
      return;
    }

    this.userService.addToFavorites(this.userId, subjectId).subscribe(() => {
      console.log('Subject added to favorites');
    });
  }
}
