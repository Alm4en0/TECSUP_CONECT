import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { SearchbarComponent } from "../components/searchbar/searchbar.component";

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SearchbarComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  blog: any;
  responses: any[] = [];
  showResponseForm: boolean = false;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));

    // Carga los detalles del blog usando el servicio
    this.blog = this.blogService.getBlogById(blogId);


    // Simulamos respuestas asociadas al blog, crear nuevo servicio de coments para este apartado.
    this.responses = [
      { user: { name: 'Emily Clark', profile: 'https://via.placeholder.com/50' }, response: 'Excelente contenido!' },
      { user: { name: 'Michael Scott', profile: 'https://via.placeholder.com/50' }, response: 'Gracias por compartir esta información.' },
    ];
  }

  toggleResponseForm() {
    this.showResponseForm = !this.showResponseForm;
  }

  submitResponse1(responseText: string, imageUrl?: string) {
    this.responses.push({
      user: { name: 'Tu Nombre', profile: 'https://via.placeholder.com/50' },
      response: responseText,
      image: imageUrl || null,
    });
    this.showResponseForm = false;
  }
  submitResponse() {
    alert('Respuesta enviada');
  }
}
