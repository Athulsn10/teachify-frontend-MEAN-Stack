import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class AppSubjectComponent {
  @Input() subjects: any[] = [];

  getRandomColor() {
    // List of predefined colors
    const colors = ['#ffe1cc', '#d4f6ed', '#e3dbfa', '#dff3fe', '#fbe2f4', '#eceff4'];
    // Choose a random color from the list
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
