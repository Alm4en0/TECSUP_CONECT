import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
=======
import { ActivatedRoute, RouterLink } from '@angular/router';
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-blog',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule],
=======
  imports: [CommonModule, RouterLink],
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
  templateUrl: './card-blog.component.html',
  styleUrl: './card-blog.component.css'
})
export class CardBlogComponent implements OnInit{
  @Input() blogs: any[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalBlogs = 0;

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Escucha cambios en los parámetros de la URL
    this.route.params.subscribe(params => {
      const type = params['type']; // Obtiene el tipo desde la URL
      this.loadBlogs(type);
    });
  }
  loadBlogs(type: string = '') {
    const response = this.blogService.getBlogs(type, this.pageIndex, this.pageSize);
    this.blogs = response.blogs;
    this.totalBlogs = response.totalBlogs;
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBlogs(); // Recargar los blogs al cambiar de página
  }

  
}
