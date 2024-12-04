import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
