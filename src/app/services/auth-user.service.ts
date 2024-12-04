import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private router: Router) { }

  isAutenticated(): boolean{

    return !!localStorage.getItem('token');
  }  

  login(token: string) {
    localStorage.setItem('token', token); // Guarda el token al iniciar sesión
  }

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

}
