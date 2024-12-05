// register.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CarrerasService } from '../../services/carreras.service';
import { AuthUserService } from '../../services/auth-user.service'; // Asegúrate de importar el servicio adecuado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  carreras: any[] = [];
  ciclos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private carrerasService: CarrerasService,
    private authService: AuthUserService // Usamos el servicio AuthService
  ) {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
      carreraId: ['', Validators.required],
      ciclo: ['', [Validators.pattern('^[1-9]+[0-9]*$')]],
    });

    this.registerForm.get('rol')?.valueChanges.subscribe((rol) => {
      const cicloControl = this.registerForm.get('ciclo');
      if (rol === 'estudiante') {
        cicloControl?.setValidators([Validators.required]);
      } else {
        cicloControl?.clearValidators();
        cicloControl?.setValue(''); // Limpiar el valor de ciclo si es profesor
      }
      cicloControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.carrerasService.getCarreras().subscribe({
      next: (data) => {
        this.carreras = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar las carreras.';
      },
    });

    // Si seleccionan una carrera, actualizamos los ciclos
    this.registerForm.get('carreraId')?.valueChanges.subscribe((carreraId) => {
      const selectedCarrera = this.carreras.find(
        (carrera) => carrera._id === carreraId
      );
      if (selectedCarrera) {
        this.ciclos = Array.from(
          { length: selectedCarrera.numeroCiclos },
          (_, i) => (i + 1).toString()
        );
      } else {
        this.ciclos = [];
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    if (this.registerForm.get('rol')?.value === 'profesor') {
      this.registerForm.get('ciclo')?.setValue(null);
    }

    this.loading = true;
    this.errorMessage = null;

    // Llamamos al servicio AuthService para registrar al usuario
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Usuario registrado exitosamente.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;

        if (
          err.status === 400 &&
          err.error?.mensaje.includes('ya está registrado')
        ) {
          this.errorMessage = 'El correo ya está registrado.';
        } else {
          this.errorMessage =
            'Ocurrió un error al registrarse. Verifica usar el dominio @tecsup.edu.pe';
        }
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  limpiarCampos() {
    this.registerForm.reset();
  }
}
