import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publish-button',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './publish-button.component.html',
  styleUrl: './publish-button.component.css'
})
export class PublishButtonComponent {
  isModalOpen = false; // Control de estado del modal

  // Método para abrir y cerrar el modal
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  // Simula la funcionalidad de agregar multimedia
  simulateAddMedia() {
    alert('Funcionalidad de agregar multimedia en desarrollo.');
  }
}
