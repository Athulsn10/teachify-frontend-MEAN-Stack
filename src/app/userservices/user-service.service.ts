import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // SERVER_URL = "http://localhost:3000/api"
  SERVER_URL = "https://teachify-3fxy.onrender.com/api"

  constructor(private http: HttpClient) { }
  registerUser(userDetails: any){
    return this.http.post(`${this.SERVER_URL}/user/register`, userDetails);
  }
  loginUser(userDetails:any){
    return this.http.post(`${this.SERVER_URL}/user/login`, userDetails)
  }

  addToFavorites(userId: string, subject: any): Observable<any> {
    const url = `${this.SERVER_URL}/data/favorites/add`; 
    const user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const token = user?.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      userId,
      subject
    };
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }
  
  getFavorites(userId: string): Observable<any> {
    const url = `${this.SERVER_URL}/data/favorites/all?userId=${userId}`;
    const user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const token = user?.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }

  removeFromFavorites(userId: string, subjectId: string): Observable<any> {
    const url = `${this.SERVER_URL}/data/favorites/remove?userId=${userId}&subjectId=${subjectId}`;
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = user?.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      userId,
      subjectId
    };
    return this.http.delete(url, { headers });
  }

}
