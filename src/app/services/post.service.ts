import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUserService } from './auth-user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:3000/api/posts/'; // Cambia la URL según tu backend

  constructor(private http: HttpClient, private authService: AuthUserService) {}

  createPost(postData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, postData, { headers });
  }

  // Obtener posts con paginación
  getPosts(
    type: string = '',
    pageIndex: number = 0,
    pageSize: number = 5
  ): Observable<any> {
    const params = {
      type,
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
    };
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Obtener detalles de un post por su ID
  getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`);
  }

  // Actualizar un post
  updatePost(postId: number, postData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${postId}`, postData);
  }

  // Eliminar un post
  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${postId}`);
  }

  // Agregar una respuesta a un post
  addResponse(postId: number, responseData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${postId}/responses`, responseData);
  }

  // Obtener respuestas de un post
  getResponses(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}/responses`);
  }
}
