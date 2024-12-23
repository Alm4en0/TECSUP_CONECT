import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthUserService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAutenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const { correo, contrasena } = this.loginForm.value;

    this.http
      .post('http://localhost:3000/api/users/login', { correo, contrasena })
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.userId);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.mensaje || 'Error al iniciar sesión.';
        },
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
