import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent  {

  subjects: any[] = [];
  semester: number = 1; 
  isloading = false;
  localStorageData = localStorage.getItem('currentUser');
  userToken = ''
  showLogin = false;
  errorMessage = ''; 
  userName = 'User' ;
  constructor(private apiService: ApiService, private router: Router) { }

  fetchSubjects(semester: number): void {
    if(this.localStorageData){
      this.userName = JSON.parse(this.localStorageData).name;
      this.userToken = JSON.parse(this.localStorageData).token;
    }
    this.isloading = true
    this.semester = semester;
    this.apiService.getSubBySemester(semester,this.userToken).subscribe(
      (response: any) => {
        this.subjects = response.data;
        this.isloading = false;
      },
      error => {
        if (error.status === 401){
          this.isloading = false;
          this.errorMessage = 'Your Session Has Expired, Please Login Again'
          this.showLogin = true
        }
      }
    );
  }
  navigateToLogin(){
    this.router.navigate(['user/login']) ;
  }
}
