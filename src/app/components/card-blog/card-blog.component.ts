import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.css'],
})
export class CardBlogComponent implements OnInit {
  @Input() blogs: any[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalBlogs = 0;

  constructor(
    private blogService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const type = params['type'];
      this.loadBlogs(type);
    });
  }

  loadBlogs(type: string = '') {
    this.blogService.getPosts(type, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        this.blogs = response.blogs;
        this.totalBlogs = response.totalBlogs;
      },
      error: (err) => console.error(err),
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBlogs();
  }
}
