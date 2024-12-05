import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../services/auth-user.service';

@Component({
  selector: 'app-publish-button',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.css']
})
export class PublishButtonComponent {
  isModalOpen = false; // Control de estado del modal
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private authUserService: AuthUserService) {
    // Inicializa el formulario
    this.postForm = this.fb.group({
      titulo: [''],
      contenido: [''],
      tipo: ['informacion'], // Valor predeterminado
      file: [null], // Archivo adjunto
      autor: [this.authUserService.getId()] // Obtiene el userId desde el servicio
    });
 }

  

  // Método para abrir y cerrar el modal
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  // Método para manejar el cambio de archivo
  onFileChange(event: any) {
    const file = event.target.files[0]; // Modificado para obtener el archivo

    if (file) {
      // Validar tamaño (ejemplo: 5 MB máximo)
      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert('El archivo excede el tamaño máximo permitido de 5 MB.');
        return;
      }

      // Validar tipo de archivo (ejemplo: imágenes y PDFs)
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('El tipo de archivo no es válido. Solo se permiten imágenes y PDFs.');
        return;
      }

      // Actualizar el formulario
      this.postForm.patchValue({ file: file });
    }
  }

  
  // Método para enviar el formulario
  submitPost() {
    const formData = new FormData();
    formData.append('titulo', this.postForm.get('titulo')?.value);
    formData.append('contenido', this.postForm.get('contenido')?.value);
    formData.append('tipo', this.postForm.get('tipo')?.value);
    formData.append('autor', this.authUserService.getId()!); // Asegúrate de que userId esté disponible




    const file = this.postForm.get('file')?.value;
    if (file) {
      formData.append('file', file); // Asegúrate de usar 'file' como nombre
    }

    // Llamada al servicio para enviar el formulario
    this.postService.createPost(formData).subscribe({
      next: (response) => {
        alert('Post creado exitosamente.');
        this.toggleModal(); // Cierra el modal
        this.postForm.reset(); // Limpia el formulario
      },
      error: (err) => {
        console.error(err);
        alert('Ocurrió un error al crear el post.');
      },
    });
  }
}
