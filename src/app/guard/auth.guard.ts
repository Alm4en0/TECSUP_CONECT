import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service'; // Asegúrate de tener el servicio

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthUserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
    return true; // Si está autenticado, permitir el acceso
  }
}
