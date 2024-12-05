import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: any = null;
  responses: any[] = [];
  showResponseForm: boolean = false;
  newResponseText: string = '';
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    // Carga los detalles del post desde la API
    this.postService.getPostById(postId).subscribe((data) => {
      this.post = data;
      this.responses = data.responses; // Incluye las respuestas relacionadas desde la API
    });
  }

  toggleResponseForm() {
    this.showResponseForm = !this.showResponseForm;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  submitResponse() {
    if (!this.newResponseText) {
      alert('Por favor escribe una respuesta');
      return;
    }

    const responseData = {
      text: this.newResponseText,
      image: this.selectedFile ? URL.createObjectURL(this.selectedFile) : null,
      user: {
        name: 'Usuario Actual',
        profileImage: 'assets/foto-default.png',
      },
    };

    this.responses.push(responseData); // Añade localmente por ahora
    this.newResponseText = '';
    this.selectedFile = null;
    this.showResponseForm = false;
  }
}
