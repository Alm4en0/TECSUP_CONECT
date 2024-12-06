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
  styleUrl: './card-blog.component.css',
})
export class CardBlogComponent implements OnInit {
  blogs: any[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalBlogs = 0;
  isLoading = true;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs(type: string = '') {
    this.isLoading = true;
    this.blogService.getBlogs(type, this.pageIndex, this.pageSize).subscribe(
      (response) => {
        this.blogs = response.blogs;
        this.totalBlogs = response.totalBlogs;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los blogs:', error);
        this.isLoading = false;
      }
    );
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBlogs();
  }
}
