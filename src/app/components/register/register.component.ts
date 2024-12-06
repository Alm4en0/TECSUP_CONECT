import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarrerasService } from '../../services/carreras.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  user: any;
  carreras: any[] = [];
  ciclos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private carrerasService: CarrerasService
  ) {
    // Crear el formulario
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', [Validators.required]],
      carreraId: ['', [Validators.required]],
      ciclo: ['', [Validators.pattern('^[1-9]+[0-9]*$')]],
    });

    // Cambiar validación del ciclo dependiendo del rol
    this.registerForm.get('rol')?.valueChanges.subscribe((rol) => {
      const cicloControl = this.registerForm.get('ciclo');
      if (rol === 'estudiante') {
        cicloControl?.setValidators([
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
        ]);
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
    // Validar si el formulario es inválido
    if (this.registerForm.invalid) return;

    // Si el rol es "profesor", asegurarse de no enviar el ciclo
    if (this.registerForm.get('rol')?.value === 'profesor') {
      this.registerForm.get('ciclo')?.setValue(0); // Eliminar el valor de ciclo si es profesor
    }

    this.loading = true;
    this.errorMessage = null;

    // Enviar los datos al servidor
    this.http
      .post('http://localhost:3000/api/users/register', this.registerForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Usuario registrado exitosamente.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error.mensaje || 'Error al registrarse.';
        },
      });

    // Limpiar los campos del formulario
    this.limpiarCampos();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  limpiarCampos() {
    this.registerForm.reset();
  }
}
