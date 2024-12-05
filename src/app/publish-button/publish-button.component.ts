import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/post.service';
import { CarrerasService } from '../services/carreras.service';
import { UserService } from '../services/user.service'; // Cambié el nombre del servicio aquí

@Component({
  selector: 'app-publish-button',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.css'],
})
export class PublishButtonComponent {
  isModalOpen = false;
  postForm: FormGroup;
  carreras: any[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private carrerasService: CarrerasService,
    private userService: UserService // Inyectamos el UserService
  ) {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      tipo: ['', Validators.required],
      carrera: ['', Validators.required],
      file: [null], // Para la subida de archivos
    });
    this.cargarCarreras();
  }

  cargarCarreras(): void {
    this.carrerasService.getCarreras().subscribe(
      (data) => {
        console.log('Carreras recibidas:', data);
        this.carreras = data; // Asignamos las carreras obtenidas
      },
      (error) => {
        console.error('Error al obtener las carreras', error);
      }
    );
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.postForm.patchValue({ file });
      console.log('Archivo seleccionado:', file);
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.postForm.value).forEach((key) => {
      if (this.postForm.value[key]) {
        formData.append(key, this.postForm.value[key]);
      }
    });

    // Obtener el ID del usuario autenticado
    const userId = this.userService.getUserId();
    if (userId) {
      formData.append('autor', userId); // Agregar el autor al FormData

      this.postService.createPost(formData).subscribe({
        next: () => {
          alert('Post creado exitosamente.');
          this.toggleModal(); // Cierra el modal
        },
        error: (err) => {
          console.error('Error al crear el post:', err);
          alert('Error al crear el post.');
        },
      });
    } else {
      alert('No estás autenticado.');
    }
  }
}
