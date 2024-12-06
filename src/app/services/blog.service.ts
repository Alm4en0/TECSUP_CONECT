import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getBlogs(
    type: string,
    pageIndex: number,
    pageSize: number
  ): Observable<{ blogs: any[]; totalBlogs: number }> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ blogs: any[]; totalBlogs: number }>(
      `${this.apiUrl}?type=${type}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
      { headers }
    );
  }

  getBlogById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
