import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/api/posts/posts'

  constructor(private http: HttpClient) { }
  
  createPost(postData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    return this.http.post(this.apiUrl, postData, { headers });
  }
}
