import { Component } from '@angular/core';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { CardBlogComponent } from '../components/card-blog/card-blog.component';
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { PostDetailsComponent } from '../post-details/post-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchbarComponent,
    SidebarComponent,
    CardBlogComponent,
    RouterOutlet,
    UserProfileComponent,
    UserPostsComponent,
    PostDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
