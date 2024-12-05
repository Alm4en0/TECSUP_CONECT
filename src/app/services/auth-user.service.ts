import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private userSubject = new BehaviorSubject<any | null>(null); // Gestiona usuario y token
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap((response: any) => {
        console.log('Respuesta del login:', response);
        setTimeout(() => {
          console.log('AccessToken guardado:', response.accessToken);
          console.log('RefreshToken guardado:', response.refreshToken);

          // Guardar el token de acceso y el refresh token
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);

          // Actualizar el estado del usuario si es necesario
          this.userSubject.next(response.user);
        }, 0); // Ejecuta de inmediato, pero asegura que todo esté listo
      })
    );
  }

  logout(): void {
    // Eliminar tokens almacenados en localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    // Limpiar el BehaviorSubject del usuario
    this.userSubject.next(null);

    // Navegar a la página de login
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // O cualquier otra fuente
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refresh token.');
    }
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/refresh-token`, {
        token: refreshToken,
      })
      .pipe(
        tap((response) => {
          this.userSubject.next({ token: response.accessToken });
        }),
        map((response) => response.accessToken)
      );
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí puedes decodificar el token si es un JWT o hacer una solicitud al backend para obtener los datos del usuario
      return this.http.get('http://localhost:3000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      return of(null); // Si no hay token
    }
  }
}
