import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root',
  
})
export class AuthUserService {

  constructor(private router: Router, private http: HttpClient) { }

  isAutenticated(): boolean{
    return !!localStorage.getItem('authToken');
  }  

  isUserId() : boolean{
    return !!localStorage.getItem('userId')
  }

  login(authToken: string, userId:string) {
    localStorage.setItem('authToken', authToken); // Guarda el token al iniciar sesión
    localStorage.setItem('userId', userId); // Guarda el token al iniciar sesión

  }

  logout() {
    console.log('Método logout llamado');

    localStorage.removeItem('authToken'); 
    localStorage.removeItem('userId'); 
    this.router.navigate(['/login']); 
  }
  
  getId(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.userId || null; // Asegúrate de que el token contenga el campo userId
    }
    return null;
  }

  
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }
  

}
