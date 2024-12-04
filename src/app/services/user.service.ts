import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Cambia según tu backend
  private userSubject = new BehaviorSubject<any>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Redirigir a Google para iniciar sesión
  loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/auth/google`;
  }

  // Verificar si el usuario está autenticado
  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/verify`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  // Obtener datos del usuario
  getUser(): Observable<any> {
    return this.user$;
  }

  // Cerrar sesión
  logout(): void {
    this.userSubject.next(null);
    // Opcionalmente puedes hacer una petición al backend para cerrar sesión.
  }
}
