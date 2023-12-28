// semester.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent {

  subjects: any[] = [];
  semester: number = 1; // Default semester

  constructor(private apiService: ApiService) { }

  fetchSubjects(semester: number): void {
    this.semester = semester;
    this.apiService.getSubBySemester(semester).subscribe(
      (response: any) => {
        this.subjects = response.data;
      },
      error => {
        console.error('Error fetching subjects:', error);
      }
    );
  }
}
