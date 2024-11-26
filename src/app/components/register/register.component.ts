import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    tipoUsuario: 'profesor',  // Valor por defecto
    carrera: '',
    ciclo: '' // Solo se usa si es estudiante
  };

  carreras: string[] = ['Ingeniería de Software', 'Diseño Gráfico', 'Redes y Comunicaciones'];
  ciclos: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  constructor() {}

  ngOnInit(): void {}

  onRegister(): void {
    console.log('Registrando usuario:', this.user);
  }
}
