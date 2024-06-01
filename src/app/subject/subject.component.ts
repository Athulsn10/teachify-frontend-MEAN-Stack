import { Component, Input } from '@angular/core';
import { UserService } from '../userservices/user-service.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class AppSubjectComponent {
  @Input() subjects: any[] = [];

  constructor(private yourService: UserService) {} 

  getRandomColor() {
    const colors = ['#ffe1cc', '#d4f6ed', '#e3dbfa', '#dff3fe', '#fbe2f4', '#eceff4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addToFav(subject: any) {
    const user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const userId = user._id;
    this.yourService.addToFavorites(userId, subject).subscribe(
      (response) => {
        // console.log('Subject added to favorites:', response);
      },
      (error) => {
        // console.error('Error adding subject to favorites:', error);
      }
    );
  }
}
