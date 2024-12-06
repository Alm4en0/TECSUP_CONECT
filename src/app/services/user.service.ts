import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Cambia según tu backend
  private userSubject = new BehaviorSubject<any>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  logout(): void {
    this.userSubject.next(null);
  }
}
