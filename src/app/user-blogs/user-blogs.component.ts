import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardBlogComponent } from '../components/card-blog/card-blog.component';

@Component({
  selector: 'app-user-blogs',
  standalone: true,
  imports: [CommonModule, CardBlogComponent],
  templateUrl: './user-blogs.component.html',
  styleUrl: './user-blogs.component.css'
})
export class UserBlogsComponent {
  @Input() blogs: any[] = [];
}
