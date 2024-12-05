import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardBlogComponent } from '../components/card-blog/card-blog.component';

@Component({
  selector: 'app-user-blogs',
  standalone: true,
  imports: [CommonModule, CardBlogComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent {
  @Input() blogs: any[] = [];
}
