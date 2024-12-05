import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Cambia según tu backend
  private userSubject = new BehaviorSubject<any>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token recuperado:', token); // Verifica que el token no sea null o vacío

    if (!token) {
      return new Observable((observer) => observer.next(null));
    }

    return this.http
      .get(`${this.apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }, // Enviar el token con "Bearer"
      })
      .pipe(
        tap((user) => {
          this.userSubject.next(user); // Almacena los datos del usuario
        })
      );
  }

  // Obtener los datos del usuario
  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/me');
  }

  // Obtener el ID del usuario autenticado
  getUserId(): string | null {
    const user = this.userSubject.value;
    return user ? user._id : null; // Asumiendo que el ID del usuario está en la propiedad '_id'
  }

  // Iniciar sesión manualmente (con credenciales normales, no Google)
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Guarda el token
        this.userSubject.next(response.user); // Almacena los datos del usuario
      })
    );
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Remueve el token
    this.userSubject.next(null); // Limpia los datos del usuario
  }
}
