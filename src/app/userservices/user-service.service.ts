import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER_URL = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }
  registerUser(userDetails: any){
    return this.http.post(`${this.SERVER_URL}/user/register`, userDetails);
  }
  loginUser(userDetails:any){
    return this.http.post(`${this.SERVER_URL}/user/login`, userDetails)
  }
  addToFavorites(userId: string, subjectName: string): Observable<any> {
    const url = `${this.SERVER_URL}/data/favorites/add`;
    const payload = { userId, subjectName }; 
    return this.http.post(url, payload);
  }
  
  getFavorites(userId: string): Observable<any> {
    const url = `${this.SERVER_URL}/data/favorites?userId=${userId}`;
    return this.http.get(url);
  }

}
